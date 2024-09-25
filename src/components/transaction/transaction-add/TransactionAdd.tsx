import React from "react";

// Define the props interface
interface TransactionAddProps {
  addTransaction: () => void;
}

const TransactionAdd = (props: TransactionAddProps) => {
  return (
    <>
      <div className="transaction-add left clear">
        <button onClick={props.addTransaction}>Add Transaction</button>
      </div>
    </>
  );
};

export default TransactionAdd;
