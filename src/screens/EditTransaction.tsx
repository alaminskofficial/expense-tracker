import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import tailwind from "twrnc";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useExpenseStore } from "../store/useExpenseStore";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import {
  expenseCategories,
  incomeCategories,
} from "../utils/categoryHelper";

type Props = NativeStackScreenProps<RootStackParamList, "EditTransaction">;

const EditTransaction: React.FC<Props> = ({ route, navigation }) => {
  const { expense } = route.params;

  // Detect type
  const isIncome = expense.amount > 0;
  const categories = isIncome ? incomeCategories : expenseCategories;

  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(Math.abs(expense.amount).toString());
  const [category, setCategory] = useState(expense.category);
  const [date, setDate] = useState(new Date(expense.date));
  const [showPicker, setShowPicker] = useState(false);

  const updateExpense = useExpenseStore((s) => s.updateExpense);

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  const handleUpdate = () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    updateExpense({
      ...expense,
      title,
      amount: isIncome ? Number(amount) : -Number(amount),
      category,
      date: date.toISOString(),
    });

    navigation.navigate("BottomTabs", { screen: "Home" });
  };

  return (
    <View style={tailwind`flex-1 bg-white px-5 pt-6`}>
      {/* Header */}
      <Text style={tailwind`text-2xl font-bold mb-6 text-center`}>
        Edit {isIncome ? "Income" : "Expense"}
      </Text>

      {/* Title */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Title</Text>
      <TextInput
        placeholder="Enter title"
        placeholderTextColor="#9ca3af"
        value={title}
        onChangeText={setTitle}
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
      />

      {/* Amount */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Amount</Text>
      <TextInput
        placeholder="Enter amount"
        placeholderTextColor="#9ca3af"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
      />

      {/* Category */}
      <Text style={tailwind`text-sm text-gray-600 mb-2`}>Category</Text>
      <View style={tailwind`flex-row flex-wrap mb-6`}>
        {categories.map((cat) => {
          const isSelected = category === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              style={tailwind.style(
                "px-4 py-2 rounded-full mr-2 mb-2 border",
                isSelected
                  ? isIncome
                    ? "bg-green-600 border-green-600"
                    : "bg-black border-black"
                  : "border-gray-300"
              )}
            >
              <Text
                style={tailwind.style(
                  "text-sm",
                  isSelected ? "text-white" : "text-black"
                )}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Date */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Date</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
      >
        <Text>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      {/* Button */}
      <TouchableOpacity
        onPress={handleUpdate}
        style={tailwind.style(
          "py-4 rounded-xl items-center",
          isIncome ? "bg-green-600" : "bg-black"
        )}
      >
        <Text style={tailwind`text-white font-bold text-base`}>
          Update {isIncome ? "Income" : "Expense"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditTransaction;
