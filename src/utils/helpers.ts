import { Transaction } from "@/types/finance";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function exportToCSV(transactions: Transaction[]) {
  const headers = ["Date", "Description", "Amount", "Category", "Type"];
  const rows = transactions.map(t => [t.date, t.description, t.amount.toString(), t.category, t.type]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  a.click();
  URL.revokeObjectURL(url);
}

export const CATEGORIES = [
  "Salary", "Freelance", "Investment", "Food", "Transport",
  "Shopping", "Entertainment", "Bills", "Healthcare", "Education", "Other",
] as const;

export const CHART_COLORS = [
  "hsl(220, 90%, 56%)", "hsl(160, 84%, 39%)", "hsl(262, 83%, 58%)",
  "hsl(35, 92%, 50%)", "hsl(340, 75%, 55%)", "hsl(190, 90%, 50%)",
  "hsl(45, 93%, 47%)", "hsl(280, 68%, 60%)", "hsl(12, 76%, 61%)",
  "hsl(173, 58%, 39%)", "hsl(200, 18%, 46%)",
];
