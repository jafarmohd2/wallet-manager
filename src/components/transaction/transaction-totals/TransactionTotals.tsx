import React from "react";
import { TransactionSummary } from "interfaces";

const TransactionTotals = ({
  totalIncome,
  totalExpenditure,
}: TransactionSummary) => {
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
