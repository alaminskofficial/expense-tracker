import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Expense } from "../types/expense";

type TimeFilter = "monthly" | "yearly";

type ExpenseState = {
  expenses: Expense[];
  timeFilter: TimeFilter;

  addExpense: (expense: Expense) => void;
  updateExpense: (updatedExpense: Expense) => void;
  deleteExpense: (id: string) => void;
  clearAll: () => void;
  // Global Filter
  setTimeFilter: (filter: TimeFilter) => void;
  // Internal helper
  getFilteredExpenses: () => Expense[];

  // 🔹 Selectors
  getTotal: () => number;
  getIncomeExpenseSummary: () => {
    income: number;
    expense: number;
    balance: number;
  };
  getCategoryWiseExpense: () => {
    category: string;
    total: number;
  }[];
};

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],
      timeFilter: "monthly", // default

      addExpense: (expense) =>
        set((state) => ({
          expenses: [expense, ...state.expenses],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),
      updateExpense: (updatedExpense) =>
        set((state) => ({
          expenses: state.expenses.map((e) =>
            e.id === updatedExpense.id ? updatedExpense : e
          ),
        })),

      clearAll: () => set({ expenses: [] }),
      setTimeFilter: (filter) => set({ timeFilter: filter }),

      // =========================
      // Filter Logic (GLOBAL)
      // =========================
      getTotal: () => {
        return get()
          .getFilteredExpenses()
          .reduce((sum, e) => sum + e.amount, 0);
      },
      getFilteredExpenses: () => {
        const { expenses, timeFilter } = get();
        const now = new Date();

        if (timeFilter === "monthly") {
          const month = now.getMonth();
          const year = now.getFullYear();

          return expenses.filter((e) => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
          });
        }

        if (timeFilter === "yearly") {
          const year = now.getFullYear();
          return expenses.filter(
            (e) => new Date(e.date).getFullYear() === year
          );
        }

        return expenses;
      },

      // =========================
      // Selectors
      // =========================

      getIncomeExpenseSummary: () => {
        const expenses = get().getFilteredExpenses();

        const income = expenses
          .filter((e) => e.amount > 0)
          .reduce((sum, e) => sum + e.amount, 0);

        const expense = expenses
          .filter((e) => e.amount < 0)
          .reduce((sum, e) => sum + Math.abs(e.amount), 0);

        return {
          income,
          expense,
          balance: income - expense,
        };
      },
      getCategoryWiseExpense: () => {
        const expenses = get().getFilteredExpenses();

        const categoryMap: Record<string, number> = {};

        expenses.forEach((e) => {
          const category = e.category;

          if (!categoryMap[category]) {
            categoryMap[category] = 0;
          }

          // Add amount directly (+ for income, - for expense)
          categoryMap[category] += e.amount;
        });

        // Convert to array
        return Object.keys(categoryMap).map((category) => ({
          category,
          total: categoryMap[category], // can be + or -
        }));
      },
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => AsyncStorage),

      // Save only when expenses exist
      partialize: (state) => {
        if (!state.expenses || state.expenses.length === 0) {
          return {}; // nothing saved
        }
        return { expenses: state.expenses };
      },

      // Safety for future changes
      migrate: (persistedState: any, version) => {
        if (!persistedState) return { expenses: [] };
        return persistedState;
      },
    }
  )
);
