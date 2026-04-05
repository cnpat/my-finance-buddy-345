import { useMemo } from "react";
import { useFinance } from "@/store/FinanceContext";
import { formatCurrency } from "@/utils/helpers";
import { TrendingUp, PiggyBank, AlertTriangle } from "lucide-react";

export function InsightsCards() {
  const { transactions, totalIncome, totalExpenses } = useFinance();

  const insights = useMemo(() => {
    const expensesByCategory: Record<string, number> = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });

    const highestCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison
    const byMonth: Record<string, { income: number; expense: number }> = {};
    transactions.forEach(t => {
      const m = t.date.slice(0, 7);
      if (!byMonth[m]) byMonth[m] = { income: 0, expense: 0 };
      if (t.type === "income") byMonth[m].income += t.amount;
      else byMonth[m].expense += t.amount;
    });
    const months = Object.keys(byMonth).sort();
    const currentMonth = months[months.length - 1];
    const prevMonth = months[months.length - 2];
    let expenseChange = 0;
    if (currentMonth && prevMonth) {
      const curr = byMonth[currentMonth].expense;
      const prev = byMonth[prevMonth].expense;
      expenseChange = prev > 0 ? ((curr - prev) / prev) * 100 : 0;
    }

    return {
      highestCategory: highestCategory ? { name: highestCategory[0], amount: highestCategory[1] } : null,
      totalSavings: totalIncome - totalExpenses,
      expenseChange: Math.round(expenseChange),
    };
  }, [transactions, totalIncome, totalExpenses]);

  const cards = [
    {
      title: "Highest Spending",
      value: insights.highestCategory ? insights.highestCategory.name : "N/A",
      sub: insights.highestCategory ? formatCurrency(insights.highestCategory.amount) : "",
      icon: AlertTriangle,
      colorClass: "text-chart-4",
    },
    {
      title: "Monthly Trend",
      value: `${insights.expenseChange > 0 ? "+" : ""}${insights.expenseChange}%`,
      sub: "vs. last month expenses",
      icon: TrendingUp,
      colorClass: insights.expenseChange > 0 ? "text-expense" : "text-income",
    },
    {
      title: "Total Savings",
      value: formatCurrency(insights.totalSavings),
      sub: "Income − Expenses",
      icon: PiggyBank,
      colorClass: insights.totalSavings >= 0 ? "text-income" : "text-expense",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div key={card.title} className="bg-card rounded-lg border p-5 animate-fade-in" style={{ animationDelay: `${500 + i * 100}ms` }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
            <card.icon className={`w-5 h-5 ${card.colorClass}`} />
          </div>
          <p className={`text-xl font-display font-bold ${card.colorClass}`}>{card.value}</p>
          {card.sub && <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>}
        </div>
      ))}
    </div>
  );
}
