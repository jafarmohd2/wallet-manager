import React from "react";
import "./TransactionFilter.css";

// Define the props interface
interface TransactionFilterProps {
  monthYear: string;
  setMonthYear: (value: string) => void;
}

const TransactionFilter = ({
  monthYear,
  setMonthYear,
}: TransactionFilterProps) => {
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
