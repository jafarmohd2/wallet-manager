import React, { useCallback, useEffect, useState } from "react";
import { Transaction, TransactionSummary } from "interfaces";
import TransactionFilter from "components/transaction/transaction-filter/TransactionFilter";
import TransactionAdd from "components/transaction/transaction-add/TransactionAdd";
import TransactionExport from "components/transaction/transaction-export/TransactionExport";
import TransactionTable from "components/transaction/transaction-table/TransactionTable";
import TransactionTotals from "components/transaction/transaction-totals/TransactionTotals";
import TransactionForm from "components/transaction/transaction-form/TransactionForm";

const WalletManager = () => {
  const [monthYear, setMonthYear] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { date: "2024/09/01", amount: 1500, content: "Deposit" },
    { date: "2024/09/10", amount: -1200, content: "Withdrawal" },
  ]);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const [totals, setTotals] = useState<TransactionSummary>({
    totalIncome: 0,
    totalExpenditure: 0,
  });

  /**
   * Adds a new transaction and updates the state.
   *
   * @param {Transaction} transaction - The transaction to add.
   *
   * This function appends the new transaction to the existing list, updates the
   * state, and then filters transactions based on the current year and month
   * derived from `monthYear`.
   */
  const addTransaction = (transaction: Transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    const [year, month] = monthYear.split("-").slice(0, 2);
    filterTransactions(year, month);
  };

  /**
   * Filters and sorts the transactions based on the specified year and month.
   *
   * @param {string} year - The year to filter transactions by (optional). If an empty string is provided, this filter is ignored.
   * @param {string} month - The month to filter transactions by (optional). If an empty string is provided, this filter is ignored.
   *
   * This function uses the useCallback hook to memoize the filtering logic,
   * ensuring that the function is only re-created if the `transactions` array changes.
   */
  const filterTransactions = useCallback(
    (year = "", month = "") => {
      const filtered = transactions
        .filter((transaction) => {
          const [tYear, tMonth] = transaction.date.split("/").slice(0, 2);
          return (
            (year ? tYear === year : true) && (month ? tMonth === month : true)
          );
        })
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

      setFilteredTransactions(filtered);
      calculateTotals(filtered);
    },
    [transactions],
  );

  /**
   * Calculates and updates the total income and expenditure from the provided transactions.
   *
   * @param {Transaction[]} transactions - The array of transactions to calculate totals from.
   *
   * This function uses the `reduce` method to compute the total income (positive amounts)
   * and total expenditure (negative amounts), then updates the state with these values.
   */
  const calculateTotals = (transactions: Transaction[]) => {
    const income = transactions.reduce(
      (sum, t) => (t.amount > 0 ? sum + t.amount : sum),
      0,
    );
    const expenditure = transactions.reduce(
      (sum, t) => (t.amount < 0 ? sum + t.amount : sum),
      0,
    );
    setTotals({ totalIncome: income, totalExpenditure: expenditure });
  };

  /**
   * Opens the Add Transaction dialog by setting the dialog state to true.
   */
  const handleDialogOpen = () => setDialogOpen(true);

  /**
   * Closes  the Add Transaction dialog by setting the dialog state to false.
   */
  const handleDialogClose = () => setDialogOpen(false);

  /**
   * Effect that triggers filtering of transactions whenever the
   * `monthYear` state changes
   */
  useEffect(() => {
    const [year, month] = monthYear.split("-").slice(0, 2);
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
