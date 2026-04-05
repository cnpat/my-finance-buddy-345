import { Transaction } from "@/types/finance";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-04-01", description: "Monthly Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "2", date: "2026-04-02", description: "Grocery Shopping", amount: 85.50, category: "Food", type: "expense" },
  { id: "3", date: "2026-04-03", description: "Uber Ride", amount: 24.00, category: "Transport", type: "expense" },
  { id: "4", date: "2026-04-04", description: "Freelance Project", amount: 1200, category: "Freelance", type: "income" },
  { id: "5", date: "2026-04-05", description: "Netflix Subscription", amount: 15.99, category: "Entertainment", type: "expense" },
  { id: "6", date: "2026-04-06", description: "Electric Bill", amount: 120, category: "Bills", type: "expense" },
  { id: "7", date: "2026-04-07", description: "New Sneakers", amount: 189.99, category: "Shopping", type: "expense" },
  { id: "8", date: "2026-04-08", description: "Investment Returns", amount: 340, category: "Investment", type: "income" },
  { id: "9", date: "2026-04-09", description: "Restaurant Dinner", amount: 62.00, category: "Food", type: "expense" },
  { id: "10", date: "2026-04-10", description: "Online Course", amount: 49.99, category: "Education", type: "expense" },
  { id: "11", date: "2026-03-01", description: "March Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "12", date: "2026-03-05", description: "Groceries", amount: 95.00, category: "Food", type: "expense" },
  { id: "13", date: "2026-03-10", description: "Gas Bill", amount: 80, category: "Bills", type: "expense" },
  { id: "14", date: "2026-03-15", description: "Gym Membership", amount: 45, category: "Healthcare", type: "expense" },
  { id: "15", date: "2026-03-20", description: "Freelance Gig", amount: 800, category: "Freelance", type: "income" },
  { id: "16", date: "2026-03-25", description: "Movie Tickets", amount: 30, category: "Entertainment", type: "expense" },
  { id: "17", date: "2026-02-01", description: "February Salary", amount: 5200, category: "Salary", type: "income" },
  { id: "18", date: "2026-02-10", description: "Valentine Dinner", amount: 150, category: "Food", type: "expense" },
  { id: "19", date: "2026-02-14", description: "Gift Shopping", amount: 200, category: "Shopping", type: "expense" },
  { id: "20", date: "2026-02-20", description: "Dividend Income", amount: 180, category: "Investment", type: "income" },
];
