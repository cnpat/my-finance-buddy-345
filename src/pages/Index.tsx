import { FinanceProvider, useFinance } from "@/store/FinanceContext";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { BalanceChart } from "@/components/dashboard/BalanceChart";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TransactionsTable } from "@/components/dashboard/TransactionsTable";
import { InsightsCards } from "@/components/dashboard/InsightsCards";
import { RoleSwitcher } from "@/components/dashboard/RoleSwitcher";
import { AddTransactionModal } from "@/components/dashboard/AddTransactionModal";
import { BarChart3 } from "lucide-react";

function DashboardContent() {
  const { role } = useFinance();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BarChart3 className="w-6 h-6 text-primary" />
            <h1 className="text-lg font-display font-bold">FinDash</h1>
          </div>
          <div className="flex items-center gap-3">
            <RoleSwitcher />
            {role === "admin" && <AddTransactionModal />}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <SummaryCards />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <BalanceChart />
          </div>
          <SpendingChart />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-3">Insights</h2>
          <InsightsCards />
        </div>

        <TransactionsTable />
      </main>
    </div>
  );
}

export default function Index() {
  return (
    <FinanceProvider>
      <DashboardContent />
    </FinanceProvider>
  );
}
