import { useFinance } from "@/store/FinanceContext";
import { formatCurrency, formatDate } from "@/utils/helpers";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/utils/helpers";
import { exportToCSV } from "@/utils/helpers";
import { Search, ArrowUpDown, Download, Trash2, Pencil } from "lucide-react";
import { Category, SortField } from "@/types/finance";

export function TransactionsTable() {
  const { filteredTransactions, filters, setFilters, role, deleteTransaction } = useFinance();

  const toggleSort = (field: SortField) => {
    if (filters.sortField === field) {
      setFilters({ sortOrder: filters.sortOrder === "asc" ? "desc" : "asc" });
    } else {
      setFilters({ sortField: field, sortOrder: "desc" });
    }
  };

  return (
    <div className="bg-card rounded-lg border animate-fade-in" style={{ animationDelay: "400ms" }}>
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-muted-foreground">Transactions</h3>
          <Button variant="outline" size="sm" onClick={() => exportToCSV(filteredTransactions)} className="h-8 text-xs gap-1.5">
            <Download className="w-3.5 h-3.5" /> CSV
          </Button>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={filters.search}
              onChange={e => setFilters({ search: e.target.value })}
              className="pl-8 h-9 text-sm"
            />
          </div>
          <Select value={filters.type} onValueChange={v => setFilters({ type: v as any })}>
            <SelectTrigger className="w-full sm:w-[120px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.category} onValueChange={v => setFilters({ category: v as Category | "all" })}>
            <SelectTrigger className="w-full sm:w-[140px] h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No transactions found. {role === "admin" ? "Add one to get started!" : ""}
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="text-left p-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("date")}>
                  <span className="flex items-center gap-1">Date <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-left p-3 font-medium">Description</th>
                <th className="text-left p-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("category")}>
                  <span className="flex items-center gap-1">Category <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                <th className="text-right p-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("amount")}>
                  <span className="flex items-center gap-1 justify-end">Amount <ArrowUpDown className="w-3 h-3" /></span>
                </th>
                {role === "admin" && <th className="p-3 w-20" />}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, i) => (
                <tr key={tx.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors animate-slide-in" style={{ animationDelay: `${i * 30}ms` }}>
                  <td className="p-3 text-muted-foreground whitespace-nowrap">{formatDate(tx.date)}</td>
                  <td className="p-3 font-medium">{tx.description}</td>
                  <td className="p-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs bg-secondary text-secondary-foreground">
                      {tx.category}
                    </span>
                  </td>
                  <td className={`p-3 text-right font-semibold whitespace-nowrap ${tx.type === "income" ? "text-income" : "text-expense"}`}>
                    {tx.type === "income" ? "+" : "-"}{formatCurrency(tx.amount)}
                  </td>
                  {role === "admin" && (
                    <td className="p-3">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-muted-foreground hover:text-expense" onClick={() => deleteTransaction(tx.id)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
