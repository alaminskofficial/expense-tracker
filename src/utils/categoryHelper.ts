export type CategoryConfig = {
  icon: string;
  bg: string;
  text: string;
  type: "expense" | "income";
};

export const categoryConfig: Record<string, CategoryConfig> = {
  // Expense Categories
  food: {
    icon: "🍔",
    bg: "#FEF3C7",
    text: "#B45309",
    type: "expense",
  },
  transport: {
    icon: "🚗",
    bg: "#DBEAFE",
    text: "#1D4ED8",
    type: "expense",
  },
  shopping: {
    icon: "🛍️",
    bg: "#FCE7F3",
    text: "#BE185D",
    type: "expense",
  },
  medical: {
    icon: "💊",
    bg: "#FEE2E2",
    text: "#B91C1C",
    type: "expense",
  },
  fuel: {
    icon: "⛽",
    bg: "#E0F2FE",
    text: "#0369A1",
    type: "expense",
  },
  emi: {
    icon: "🏦",
    bg: "#EDE9FE",
    text: "#6D28D9",
    type: "expense",
  },
  rent: {
    icon: "🏠",
    bg: "#FFF7ED",
    text: "#C2410C",
    type: "expense",
  },
  utilities: {
    icon: "💡",
    bg: "#FFF7ED",
    text: "#C2410C",
    type: "expense",
  },
  entertainment: {
    icon: "🎬",
    bg: "#F0F9FF",
    text: "#075985",
    type: "expense",
  },

  // Income Categories
  salary: {
    icon: "💰",
    bg: "#DCFCE7",
    text: "#15803D",
    type: "income",
  },
  "carry over": {
    icon: "🔁",
    bg: "#ECFEFF",
    text: "#0E7490",
    type: "income",
  },
  "savings account": {
    icon: "🏛️",
    bg: "#EEF2FF",
    text: "#4338CA",
    type: "income",
  },
};

// Default fallback
const defaultCategory: CategoryConfig = {
  icon: "📦",
  bg: "#F3F4F6",
  text: "#374151",
  type: "expense",
};

export const getCategoryConfig = (category: string): CategoryConfig => {
  return categoryConfig[category.toLowerCase()] || defaultCategory;
};

export const expenseCategories = Object.keys(categoryConfig)
  .filter((key) => categoryConfig[key].type === "expense")
  .map((c) =>
    c
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ")
  );

export const incomeCategories = Object.keys(categoryConfig)
  .filter((key) => categoryConfig[key].type === "income")
  .map((c) =>
    c
      .split(" ")
      .map((w) => w[0].toUpperCase() + w.slice(1))
      .join(" ")
  );