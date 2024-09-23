import { exportToCSV } from '../../../utils/csvExport';

const TransactionExport = ({ transactions }) => {
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
