import React from "react";
import { Text, View } from "react-native";
import tailwind from "twrnc";
import { Expense } from "../types/expense";

type Props = {
  item: Expense;
};

const ExpenseItemCard: React.FC<Props> = ({ item }) => {
  const isExpense = item.amount < 0;
  const categoryStyle = getCategoryStyle(item.category);

  return (
    <View style={tailwind`mx-5 my-2`}>
      <View
        style={tailwind`bg-white p-4 rounded-2xl shadow flex-row items-center justify-between`}
      >
        {/* Left Section */}
        <View style={tailwind`flex-row items-center flex-1`}>
          {/* Icon */}
          <View
            style={tailwind`w-12 h-12 rounded-full bg-gray-100 items-center justify-center mr-3`}
          >
            <Text style={tailwind`text-lg`}>
              {getCategoryIcon(item.category)}
            </Text>
          </View>

          <View>
            <Text style={tailwind`text-base font-bold text-black`}>
              {item.title}
            </Text>

            {/* Category Badge */}
            <View
              style={[
                tailwind`px-2 py-0.5 rounded-full mt-1 self-start`,
                { backgroundColor: categoryStyle.bg },
              ]}
            >
              <Text
                style={[
                  tailwind`text-xs font-semibold`,
                  { color: categoryStyle.text },
                ]}
              >
                {item.category}
              </Text>
            </View>
          </View>
        </View>

        {/* Right Section (Amount + Date) */}
        <View style={tailwind`items-end`}>
          <Text
            style={tailwind.style(
              "text-base font-bold",
              isExpense ? "text-red-500" : "text-green-600"
            )}
          >
            {isExpense ? "-" : "+"}₹{Math.abs(item.amount)}
          </Text>

          <Text style={tailwind`text-xs text-gray-500 mt-1`}>
            {item.date}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseItemCard;

// Helper: Category Icon (simple emoji for now)
const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "food":
      return "🍔";
    case "transport":
      return "🚗";
    case "shopping":
      return "🛍️";
    case "salary":
      return "💰";
    case "entertainment":
      return "🎬";
    default:
      return "📦";
  }
};

// Helper: Date format
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
};

const categoryColors: Record<
  string,
  { bg: string; text: string }
> = {
  food: { bg: "#FEF3C7", text: "#B45309" },
  transport: { bg: "#DBEAFE", text: "#1D4ED8" },
  shopping: { bg: "#FCE7F3", text: "#BE185D" },
  salary: { bg: "#DCFCE7", text: "#15803D" },
  entertainment: { bg: "#EDE9FE", text: "#6D28D9" },
  default: { bg: "#F3F4F6", text: "#374151" },
};

const getCategoryStyle = (category: string) => {
    return (
      categoryColors[category.toLowerCase()] || categoryColors.default
    );
  };
  
