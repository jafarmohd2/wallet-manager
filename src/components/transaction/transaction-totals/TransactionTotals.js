const TransactionTotals = ({ totalIncome, totalExpenditure }) => {
  return (
    <div className="transaction-totals">
      <table>
        <tbody>
          <tr>
            <th>Total Income</th>
            <th>{totalIncome}</th>
          </tr>
          <tr>
            <th>Total Expenditure</th>
            <th>{totalExpenditure}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTotals;
