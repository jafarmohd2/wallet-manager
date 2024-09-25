export interface Transaction {
  date: string;
  amount: number;
  content: string;
}

export interface TransactionSummary {
  totalIncome: number;
  totalExpenditure: number;
}
