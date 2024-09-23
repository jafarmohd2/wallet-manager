const TransactionTable = ({ transactions }) => {
  return (
    <div className="clear">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.content}</td>
              </tr>
            ))}
          {transactions.length === 0 && (
            <tr>
              <td colSpan={3}>No transaction</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
