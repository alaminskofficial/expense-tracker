import React from "react";
import { Text, View, StyleSheet, FlatList , TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import tailwind from "twrnc";
import EmptyList from "../components/EmptyList";
import CategorySummaryCard from "../components/CategorySummaryCard";
import { useExpenseStore } from "../store/useExpenseStore";

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BottomTabs"
>;

type Props = {
  navigation: HomeNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const expenses = useExpenseStore((state) => state.expenses);
  const getCategoryExpenses = useExpenseStore(
    (state) => state.getCategoryWiseExpense
  );
  const categoryExpenses = getCategoryExpenses();
  const getSummary = useExpenseStore((state) => state.getIncomeExpenseSummary);

  const summary = getSummary();

  const totalIncome = summary.income.toFixed(2);
  const totalExpense = summary.expense.toFixed(2);
  const balance = summary.balance.toFixed(2);
  const isPositive = summary.balance >= 0;

  return (
    <View style={tailwind`flex-1`}>
      <View style={tailwind`px-5 pt-3 pb-3`}>
        <Text style={tailwind`text-base text-gray-500 px-15`}>
          Start Tracking Your Expense Easily
        </Text>
      </View>

      <View style={tailwind`px-4`}>
        <View style={tailwind`bg-black rounded-3xl p-4`}>
          <View style={tailwind`items-center`}>
            {/* Balance */}
            <Text style={tailwind`text-gray-400 text-sm`}>Total Balance</Text>
            <Text
              style={tailwind.style(
                "text-3xl font-bold mt-1",
                isPositive ? "text-green-400" : "text-red-400"
              )}
            >
              ₹ {balance}
            </Text>
          </View>

          {/* Divider */}
          <View style={tailwind`flex-row justify-between mx-6 mt-2`}>
            {/* Income */}
            <View style={tailwind`flex-1`}>
              <Text style={tailwind`text-gray-400 text-xs`}>Income</Text>
              <Text style={tailwind`text-green-400 text-lg font-bold`}>
                +₹ {totalIncome}
              </Text>
            </View>

            {/* Expense */}
            <View style={tailwind`flex-1 items-end`}>
              <Text style={tailwind`text-gray-400 text-xs`}>Expense</Text>
              <Text style={tailwind`text-red-400 text-lg font-bold`}>
                -₹ {totalExpense}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Transactions")}
        style={tailwind`mx-4 mt-2 bg-white rounded-2xl p-4 flex-row items-center justify-between shadow`}
      >
        <View>
          <Text style={tailwind`text-base font-bold text-black`}>
            View Transactions
          </Text>
          <Text style={tailwind`text-xs text-gray-500`}>
            See all income & expenses
          </Text>
        </View>

        <Text style={tailwind`text-xl text-gray-400`}>›</Text>
      </TouchableOpacity>

      <FlatList
        data={categoryExpenses}
        renderItem={({ item }) => (
          <CategorySummaryCard category={item.category} total={item.total} />
        )}
        keyExtractor={(item) => item.category}
        contentContainerStyle={tailwind`pb-10`}
        ListEmptyComponent={<EmptyList />}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
