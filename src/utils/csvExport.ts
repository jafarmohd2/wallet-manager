import { Transaction } from "interfaces";

export const exportToCSV = (transactions: Transaction[]) => {
  const csvRows = [
    ["Date", "Amount", "Content"],
    ...transactions.map((t) => [t.date, t.amount, t.content]),
  ];

  const csvString = csvRows.map((row) => row.join(",")).join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.setAttribute("href", url);
  a.setAttribute("download", "transactions.csv");
  a.click();
  URL.revokeObjectURL(url);
};
