import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import tailwind from "twrnc";
import { useExpenseStore } from "../store/useExpenseStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

type Props = NativeStackScreenProps<RootStackParamList, "EditTransaction">;

const EditTransaction: React.FC<Props> = ({ route, navigation }) => {
  const { expense } = route.params;

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(Math.abs(expense.amount).toString());
  const [category, setCategory] = useState(expense.category);

  const updateExpense = useExpenseStore((s) => s.updateExpense);

  const handleUpdate = () => {
    if (!title || !amount) {
      Alert.alert("Error", "Fill all fields");
      return;
    }

    updateExpense({
      ...expense,
      title,
      amount: expense.amount < 0 ? -Number(amount) : Number(amount),
      category,
    });

    //Alert.alert("Updated");
    navigation.navigate("BottomTabs", { screen: "Home" });
  };

  return (
    <View style={tailwind`flex-1 bg-white p-5`}>
      <Text style={tailwind`text-xl font-bold mb-4`}>
        Edit Transaction
      </Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        style={tailwind`border p-3 rounded mb-3`}
        placeholder="Title"
      />

      <TextInput
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={tailwind`border p-3 rounded mb-3`}
        placeholder="Amount"
      />

      <TouchableOpacity
        onPress={handleUpdate}
        style={tailwind`bg-black p-4 rounded-xl items-center`}
      >
        <Text style={tailwind`text-white font-bold`}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTransaction;
