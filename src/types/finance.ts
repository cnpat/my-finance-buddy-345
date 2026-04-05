export type TransactionType = "income" | "expense";

export type Category =
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Food"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Bills"
  | "Healthcare"
  | "Education"
  | "Other";

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
}

export type Role = "admin" | "viewer";

export type SortField = "date" | "amount" | "category";
export type SortOrder = "asc" | "desc";

export interface Filters {
  search: string;
  type: TransactionType | "all";
  category: Category | "all";
  sortField: SortField;
  sortOrder: SortOrder;
}
