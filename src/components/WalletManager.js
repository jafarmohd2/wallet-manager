import { useState, useEffect, useCallback } from 'react';
import TransactionForm from './transaction/transaction-form/TransactionForm';
import TransactionTable from './transaction/transaction-table/TransactionTable';
import TransactionFilter from './transaction/transaction-filter/TransactionFilter';
import TransactionTotals from './transaction/transaction-totals/TransactionTotals';
import TransactionExport from './transaction/transaction-export/TransactionExport';
import TransactionAdd from './transaction/transaction-add/TransactionAdd';

const WalletManager = () => {
  const [monthYear, setMonthYear] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transactions, setTransactions] = useState([
    { date: '2024/09/01', amount: 1500, content: 'Deposit' },
    { date: '2024/09/10', amount: -1200, content: 'Withdrawal' },
  ]);
  const [filteredTransactions, setFilteredTransactions] =
    useState(transactions);
  const [totals, setTotals] = useState({ totalIncome: 0, totalExpenditure: 0 });

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    const [year, month] = monthYear.split('-').slice(0, 2);
    filterTransactions(year, month);
  };

  const filterTransactions = useCallback(
    (year = '', month = '') => {
      const filtered = transactions
        .filter((transaction) => {
          const [tYear, tMonth] = transaction.date.split('/').slice(0, 2);
          return (
            (year ? tYear === year : true) && (month ? tMonth === month : true)
          );
        })
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setFilteredTransactions(filtered);
      calculateTotals(filtered);
    },
    [transactions]
  );

  const calculateTotals = (filtered) => {
    const income = filtered.reduce(
      (sum, t) => (t.amount > 0 ? sum + t.amount : sum),
      0
    );
    const expenditure = filtered.reduce(
      (sum, t) => (t.amount < 0 ? sum + t.amount : sum),
      0
    );
    setTotals({ totalIncome: income, totalExpenditure: expenditure });
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    const [year, month] = monthYear.split('-').slice(0, 2);
    filterTransactions(year, month);
  }, [filterTransactions, monthYear]);

  return (
    <>
      <TransactionFilter monthYear={monthYear} setMonthYear={setMonthYear} />
      <TransactionAdd addTransaction={handleDialogOpen} />
      <TransactionExport transactions={filteredTransactions} />
      <TransactionTable transactions={filteredTransactions} />
      <TransactionTotals
        totalIncome={totals.totalIncome}
        totalExpenditure={totals.totalExpenditure}
      />
      <TransactionForm
        addTransaction={addTransaction}
        open={dialogOpen}
        onClose={handleDialogClose}
      />
    </>
  );
};

export default WalletManager;
