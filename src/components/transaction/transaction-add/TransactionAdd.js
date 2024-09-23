const TransactionAdd = ({ addTransaction }) => {
  return (
    <>
      <div className="left clear">
        <button onClick={addTransaction}>Add Transaction</button>
      </div>
    </>
  );
};

export default TransactionAdd;
