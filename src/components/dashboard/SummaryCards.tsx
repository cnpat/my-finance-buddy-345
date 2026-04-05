import { useFinance } from "@/store/FinanceContext";
import { formatCurrency } from "@/utils/helpers";
import { DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";

const cards = [
  { key: "balance" as const, label: "Total Balance", icon: Wallet, colorClass: "text-primary" },
  { key: "income" as const, label: "Total Income", icon: TrendingUp, colorClass: "text-income" },
  { key: "expenses" as const, label: "Total Expenses", icon: TrendingDown, colorClass: "text-expense" },
];

export function SummaryCards() {
  const { totalBalance, totalIncome, totalExpenses } = useFinance();
  const values = { balance: totalBalance, income: totalIncome, expenses: totalExpenses };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div
          key={card.key}
          className="bg-card rounded-lg border p-5 animate-fade-in"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-muted-foreground">{card.label}</p>
            <card.icon className={`w-5 h-5 ${card.colorClass}`} />
          </div>
          <p className={`text-2xl font-display font-bold ${card.colorClass}`}>
            {formatCurrency(values[card.key])}
          </p>
        </div>
      ))}
    </div>
  );
}
