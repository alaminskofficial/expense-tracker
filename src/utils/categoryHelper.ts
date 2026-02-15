export type CategoryConfig = {
  icon: string;
  bg: string;
  text: string;
  type: "expense" | "income";
};

export const categoryConfig: Record<string, CategoryConfig> = {
  // Expense Categories (Unique colors)
  food: {
    icon: "🍔",
    bg: "#FEF3C7",   // light yellow
    text: "#B45309", // orange brown
    type: "expense",
  },
  transport: {
    icon: "🚗",
    bg: "#EFF6FF",   // light blue
    text: "#1D4ED8", // blue
    type: "expense",
  },
  shopping: {
    icon: "🛍️",
    bg: "#FDF2F8",   // light pink
    text: "#BE185D", // deep pink
    type: "expense",
  },
  medical: {
    icon: "💊",
    bg: "#FEF2F2",   // soft red
    text: "#B91C1C", // dark red
    type: "expense",
  },
  fuel: {
    icon: "⛽",
    bg: "#E0F7FA",   // cyan
    text: "#006064", // teal
    type: "expense",
  },
  emi: {
    icon: "🏦",
    bg: "#F3E8FF",   // lavender
    text: "#6B21A8", // purple
    type: "expense",
  },
  rent: {
    icon: "🏠",
    bg: "#FFF1F3",   // soft rose
    text: "#9D174D", // berry
    type: "expense",
  },
  utilities: {
    icon: "💡",
    bg: "#F0F9FF",   // pale blue
    text: "#0284C7", // blue
    type: "expense",
  },
  entertainment: {
    icon: "🎬",
    bg: "#EFFAFB",   // pale cyan
    text: "#0E7490", // cyan-dark
    type: "expense",
  },

  // Income Categories (keep same)
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