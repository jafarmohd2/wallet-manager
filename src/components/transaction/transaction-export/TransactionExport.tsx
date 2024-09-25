import React from "react";
import { Transaction } from "interfaces";
import { exportToCSV } from "utils/csvExport";

// Define the props interface
interface TransactionExportProps {
  transactions: Transaction[];
}

const TransactionExport = ({ transactions }: TransactionExportProps) => {
  return (
    <>
      <div className="transaction-export right">
        <button
          onClick={() => exportToCSV(transactions)}
          disabled={transactions.length === 0}
        >
          Download CSV
        </button>
      </div>
    </>
  );
};

export default TransactionExport;
