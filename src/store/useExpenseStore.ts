import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { Expense } from "../types/expense";

type ExpenseState = {
  expenses: Expense[];

  addExpense: (expense: Expense) => void;
  deleteExpense: (id: string) => void;
  clearAll: () => void;

  // 🔹 Selectors
  getDailyTotal: (date: Date) => number;
  getWeeklyTotal: () => number;
  getMonthlyTotal: () => number;
  getYearlyTotal: () => number;
  getIncomeExpenseSummary: () => {
    income: number;
    expense: number;
    balance: number;
  };
};

export const useExpenseStore = create<ExpenseState>()(
  persist(
    (set, get) => ({
      expenses: [],

      addExpense: (expense) =>
        set((state) => ({
          expenses: [expense, ...state.expenses],
        })),

      deleteExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      clearAll: () => set({ expenses: [] }),

      // =========================
      // Selectors
      // =========================

      getDailyTotal: (date) => {
        const selectedDate = date.toDateString();
        return get()
          .expenses
          .filter(
            (e) => new Date(e.date).toDateString() === selectedDate
          )
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getWeeklyTotal: () => {
        const now = new Date();
        const firstDayOfWeek = new Date(now);
        firstDayOfWeek.setDate(now.getDate() - now.getDay());

        return get()
          .expenses
          .filter((e) => new Date(e.date) >= firstDayOfWeek)
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getMonthlyTotal: () => {
        const now = new Date();
        const month = now.getMonth();
        const year = now.getFullYear();

        return get()
          .expenses
          .filter((e) => {
            const d = new Date(e.date);
            return d.getMonth() === month && d.getFullYear() === year;
          })
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getYearlyTotal: () => {
        const year = new Date().getFullYear();

        return get()
          .expenses
          .filter(
            (e) => new Date(e.date).getFullYear() === year
          )
          .reduce((sum, e) => sum + e.amount, 0);
      },

      getIncomeExpenseSummary: () => {
        const expenses = get().expenses;

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
    }),
    {
      name: "expense-storage",
      storage: createJSONStorage(() => AsyncStorage),

      // Save only when non-empty
      partialize: (state) =>
        state.expenses.length > 0 ? { expenses: state.expenses } : {},
    }
  )
);
