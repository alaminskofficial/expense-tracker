import React from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import tailwind from "twrnc";
import EmptyList from "../components/EmptyList";
import ExpenseItemCard from "../components/ExpenseItemCard";
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
      <FlatList
        data={expenses}
        renderItem={({ item }) => <ExpenseItemCard item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={tailwind`pb-20`}
        ListEmptyComponent={<EmptyList />}
      />
      {/* <Button title="Profile" onPress={() => navigation.navigate("Profile")} /> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
