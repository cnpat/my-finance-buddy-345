import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { Transaction, Role, Filters } from "@/types/finance";
import { mockTransactions } from "@/data/mockData";

interface FinanceState {
  transactions: Transaction[];
  role: Role;
  filters: Filters;
  setRole: (role: Role) => void;
  setFilters: (filters: Partial<Filters>) => void;
  addTransaction: (tx: Omit<Transaction, "id">) => void;
  editTransaction: (id: string, tx: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  filteredTransactions: Transaction[];
  totalIncome: number;
  totalExpenses: number;
  totalBalance: number;
}

const FinanceContext = createContext<FinanceState | null>(null);

const STORAGE_KEY = "finance-dashboard-data";

function loadFromStorage(): Transaction[] | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

function saveToStorage(transactions: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

const defaultFilters: Filters = {
  search: "",
  type: "all",
  category: "all",
  sortField: "date",
  sortOrder: "desc",
};

export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(
    () => loadFromStorage() || mockTransactions
  );
  const [role, setRole] = useState<Role>("admin");
  const [filters, setFiltersState] = useState<Filters>(defaultFilters);

  useEffect(() => { saveToStorage(transactions); }, [transactions]);

  const setFilters = useCallback((partial: Partial<Filters>) => {
    setFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const addTransaction = useCallback((tx: Omit<Transaction, "id">) => {
    setTransactions(prev => [{ ...tx, id: crypto.randomUUID() }, ...prev]);
  }, []);

  const editTransaction = useCallback((id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  }, []);

  const filteredTransactions = React.useMemo(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    if (filters.type !== "all") {
      result = result.filter(t => t.type === filters.type);
    }
    if (filters.category !== "all") {
      result = result.filter(t => t.category === filters.category);
    }

    result.sort((a, b) => {
      const dir = filters.sortOrder === "asc" ? 1 : -1;
      if (filters.sortField === "date") return dir * (new Date(a.date).getTime() - new Date(b.date).getTime());
      if (filters.sortField === "amount") return dir * (a.amount - b.amount);
      return dir * a.category.localeCompare(b.category);
    });

    return result;
  }, [transactions, filters]);

  const totalIncome = React.useMemo(() => transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpenses = React.useMemo(() => transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalBalance = totalIncome - totalExpenses;

  return (
    <FinanceContext.Provider value={{
      transactions, role, filters, setRole, setFilters,
      addTransaction, editTransaction, deleteTransaction,
      filteredTransactions, totalIncome, totalExpenses, totalBalance,
    }}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const ctx = useContext(FinanceContext);
  if (!ctx) throw new Error("useFinance must be used within FinanceProvider");
  return ctx;
}
