import { useMemo } from "react";
import { useFinance } from "@/store/FinanceContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function BalanceChart() {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const byMonth: Record<string, { income: number; expense: number }> = {};

    sorted.forEach(t => {
      const month = t.date.slice(0, 7);
      if (!byMonth[month]) byMonth[month] = { income: 0, expense: 0 };
      if (t.type === "income") byMonth[month].income += t.amount;
      else byMonth[month].expense += t.amount;
    });

    let running = 0;
    return Object.entries(byMonth).map(([month, v]) => {
      running += v.income - v.expense;
      const label = new Date(month + "-01").toLocaleDateString("en-US", { month: "short", year: "2-digit" });
      return { month: label, balance: Math.round(running * 100) / 100, income: v.income, expense: v.expense };
    });
  }, [transactions]);

  return (
    <div className="bg-card rounded-lg border p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
      <h3 className="text-sm font-semibold text-muted-foreground mb-4">Balance Trend</h3>
      {data.length === 0 ? (
        <div className="h-[250px] flex items-center justify-center text-muted-foreground text-sm">No data yet</div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
            <Tooltip
              contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", fontSize: "13px" }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Line type="monotone" dataKey="balance" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
            <Line type="monotone" dataKey="income" stroke="hsl(var(--income))" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
            <Line type="monotone" dataKey="expense" stroke="hsl(var(--expense))" strokeWidth={1.5} strokeDasharray="5 5" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
