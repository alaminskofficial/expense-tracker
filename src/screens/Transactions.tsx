import React from "react";
import { View, Text, FlatList } from "react-native";
import tailwind from "twrnc";
import ExpenseItemCard from "../components/ExpenseItemCard";
import EmptyList from "../components/EmptyList";
import { useExpenseStore } from "../store/useExpenseStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";

const Transactions: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const deleteExpense = useExpenseStore((state) => state.deleteExpense);

  const handleDelete = (id: string) => {
    deleteExpense(id);
    navigation.navigate("BottomTabs", { screen: "Home" });
  };

  const filterExpenses = useExpenseStore((state) => state.getFilteredExpenses);
  const expenses = filterExpenses();
  const getSummary = useExpenseStore((state) => state.getIncomeExpenseSummary);

  const summary = getSummary();

  const totalIncome = summary.income.toFixed(2);
  const totalExpense = summary.expense.toFixed(2);
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <View style={tailwind`flex-1 bg-gray-50`}>
      {/* Top Summary Card */}
      <View style={tailwind`px-5 pt-4`}>
        <View style={tailwind`bg-black rounded-3xl p-5`}>
          <Text style={tailwind`text-white text-lg font-bold mb-3`}>
            Transactions Summary
          </Text>

          <View style={tailwind`flex-row justify-between`}>
            {/* Income */}
            <View>
              <Text style={tailwind`text-gray-400 text-sm`}>Total Income</Text>
              <Text style={tailwind`text-green-400 text-xl font-bold`}>
                +₹ {totalIncome}
              </Text>
            </View>

            {/* Expense */}
            <View style={tailwind`items-end`}>
              <Text style={tailwind`text-gray-400 text-sm`}>Total Expense</Text>
              <Text style={tailwind`text-red-400 text-xl font-bold`}>
                -₹ {totalExpense}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Transaction List */}
      <FlatList
        data={sortedExpenses}
        renderItem={({ item }) => (
          <ExpenseItemCard
            item={item}
            onDelete={handleDelete}
            onPress={() =>
              navigation.navigate("EditTransaction", { expense: item })
            }
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tailwind`pb-20 pt-2`}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
};

export default Transactions;
