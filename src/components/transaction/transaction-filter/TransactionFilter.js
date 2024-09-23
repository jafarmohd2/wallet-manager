import './TransactionFilter.css';

const TransactionFilter = ({ monthYear, setMonthYear }) => {
  return (
    <>
      <div className="transaction-filter right">
        <label>Filter By Month & Year</label>
        <input
          type="month"
          placeholder="Month Year"
          value={monthYear}
          onChange={(e) => setMonthYear(e.target.value)}
        />
      </div>
    </>
  );
};

export default TransactionFilter;
