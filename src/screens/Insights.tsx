import React from "react";
import { View, Text } from "react-native";
import tailwind from "twrnc";
import { useExpenseStore } from "../store/useExpenseStore";

const Insights: React.FC = () => {
  const getMonthlyTotal = useExpenseStore((s) => s.getMonthlyTotal);
  const getYearlyTotal = useExpenseStore((s) => s.getYearlyTotal);
  const getIncomeExpenseSummary = useExpenseStore(
    (s) => s.getIncomeExpenseSummary
  );

  const monthly = getMonthlyTotal();
  const yearly = getYearlyTotal();
  const { income, expense, balance } = getIncomeExpenseSummary();

  return (
    <View style={tailwind`flex-1 bg-white p-5`}>
      <Text style={tailwind`text-2xl font-bold mb-6`}>Insights</Text>

      <Text style={tailwind`text-lg`}>Monthly Total: ₹{monthly}</Text>

      <Text style={tailwind`text-lg mt-2`}>Yearly Total: ₹{yearly}</Text>

      <Text style={tailwind`text-lg mt-6 text-green-600`}>
        Income: ₹{income}
      </Text>

      <Text style={tailwind`text-lg text-red-500`}>Expense: ₹{expense}</Text>

      <Text style={tailwind`text-xl font-bold mt-3`}>Balance: ₹{balance}</Text>
    </View>
  );
};

export default Insights;
