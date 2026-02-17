import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import tailwind from "twrnc";
import { useExpenseStore } from "../store/useExpenseStore";
import { getCategoryConfig } from "../utils/categoryHelper";

const screenWidth = Dimensions.get("window").width;

const Insights: React.FC = () => {
  const timeFilter = useExpenseStore((s) => s.timeFilter);
  const expenses = useExpenseStore((s) => s.expenses); // get raw expenses

  // Memoize category data calculation
  const categoryData = React.useMemo(() => {
    const getCategoryData = useExpenseStore.getState().getCategoryWiseExpense;
    return getCategoryData();
  }, [expenses, timeFilter]); // recalc only if expenses or filter change

  // Memoize summary
  const summary = React.useMemo(() => {
    const getSummary = useExpenseStore.getState().getIncomeExpenseSummary;
    return getSummary();
  }, [expenses, timeFilter]);

  // Split income and expense
  // Split data
  const incomeData = categoryData
    .filter((c) => c.total > 0)
    .map((c, index) => ({
      name: c.category,
      population: c.total,
      color: getCategoryConfig(c.category).text,
      legendFontColor: "#333",
      legendFontSize: 12,
    }));

  const expenseData = categoryData
    .filter((c) => c.total < 0)
    .map((c, index) => ({
      name: c.category,
      population: Math.abs(c.total),
      color: getCategoryConfig(c.category).text,
      legendFontColor: "#333",
      legendFontSize: 12,
    }));

  return (
    <ScrollView style={tailwind`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tailwind`px-5 pt-6 pb-4 item-center`}>
        <Text style={tailwind`text-2xl font-bold text-center`}>Insights</Text>
        <Text style={tailwind`text-gray-500 mt-1 text-center`}>
          Showing {timeFilter} data
        </Text>
      </View>

      {/* Summary Card */}
      <View style={tailwind`bg-white mx-4 rounded-2xl p-5 shadow mb-4`}>
        <Text style={tailwind`text-lg font-semibold mb-4`}> I/E Summary</Text>

        <View style={tailwind`flex-row justify-between`}>
          <View>
            <Text style={tailwind`text-gray-500 text-sm`}>Income</Text>
            <Text style={tailwind`text-green-600 text-xl font-bold`}>
              ₹ {summary.income.toFixed(2)}
            </Text>
          </View>

          <View>
            <Text style={tailwind`text-gray-500 text-sm`}>Expense</Text>
            <Text style={tailwind`text-red-500 text-xl font-bold`}>
              ₹ {summary.expense.toFixed(2)}
            </Text>
          </View>

          <View>
            <Text style={tailwind`text-gray-500 text-sm`}>Balance</Text>
            <Text
              style={tailwind.style(
                "text-xl font-bold",
                summary.balance >= 0 ? "text-green-600" : "text-red-500"
              )}
            >
              ₹ {summary.balance.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Income Pie Card */}
      {incomeData.length > 0 && (
        <View style={tailwind`bg-white mx-4 rounded-2xl p-4 shadow mb-4`}>
          <Text style={tailwind`text-lg font-semibold mb-2`}>
            Income by Category
          </Text>

          <PieChart
            data={incomeData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              color: () => "#000",
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
          />
        </View>
      )}

      {/* Expense Pie Card */}
      {expenseData.length > 0 && (
        <View style={tailwind`bg-white mx-4 rounded-2xl p-4 shadow mb-6`}>
          <Text style={tailwind`text-lg font-semibold mb-2`}>
            Expense by Category
          </Text>

          <PieChart
            data={expenseData}
            width={screenWidth - 60}
            height={220}
            chartConfig={{
              color: () => "#000",
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="10"
          />
        </View>
      )}

      {incomeData.length === 0 && expenseData.length === 0 && (
        <Text style={tailwind`text-center text-gray-500 mt-10`}>
          No data for selected period
        </Text>
      )}
    </ScrollView>
  );
};

export default Insights;
