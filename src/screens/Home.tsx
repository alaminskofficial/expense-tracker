import React from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import tailwind from "twrnc";
import EmptyList from "../components/EmptyList";
import ExpenseItemCard from "../components/ExpenseItemCard";
import { Expense } from "../types/expense";

type HomeNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "BottomTabs"
>;

type Props = {
  navigation: HomeNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  const expenses: Expense[] = [
    {
      id: "1",
      title: "Groceries",
      category: "Food",
      amount: -250,
      date: "2026-02-14",
    },
    {
      id: "2",
      title: "Petrol",
      category: "Transport",
      amount: -100,
      date: "2026-02-13",
    },
    {
      id: "3",
      title: "Shopping",
      category: "Shopping",
      amount: -1250,
      date: "2026-02-14",
    },
    {
      id: "4",
      title: "Salary",
      category: "Salary",
      amount: 5000,
      date: "2026-02-10",
    },
  ];
  
  const totalExpense = Math.abs(expenses.reduce((total, expense) => total + (expense.amount < 0 ? expense.amount : 0), 0));
  
  return (
    <View>
      <View style={tailwind`px-5 pt-5 pb-3`}>
        <Text style={tailwind`text-4xl font-bold text-black`}>
          Hello Guys 👋{" "}
        </Text>
        <Text style={tailwind`text-base text-gray-500 mt-1`}>
          Start Tracking Your Expense Easily
        </Text>
      </View>
      <View
        style={tailwind`bg-black rounded-3xl p-6 my-5 mx-5 items-center shadow-lg`}
      >
        <Text style={tailwind`text-white text-lg font-bold mb-2`}>
          Total Expense
        </Text>
        <Text style={tailwind`text-white text-3xl font-bold`}>${totalExpense}</Text>
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
