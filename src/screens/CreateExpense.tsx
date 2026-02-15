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
import { Expense } from "../types/expense";
import DateTimePicker from "@react-native-community/datetimepicker";
import { expenseCategories } from "../utils/categoryHelper";
import { useExpenseStore } from "../store/useExpenseStore";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

const categories = expenseCategories;

const CreateExpense: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const addExpense = useExpenseStore((state) => state.addExpense);
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleAddExpense = () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please enter title and amount");
      return;
    }

    const newExpense: Expense = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      amount: Number(-amount),
      category,
      date: date.toISOString(),
    };

    //console.log("New Expense:", newExpense);
    addExpense(newExpense);
    // Navigate
    navigation.navigate("BottomTabs", { screen: "Home" });
    //Alert.alert("Success", "Expense Added");

    // Reset form
    setTitle("");
    setAmount("");
    setCategory("Food");
  };

  return (
    <View style={tailwind`flex-1 bg-white px-5 pt-6`}>
      <Text style={tailwind`text-2xl font-bold mb-6`}>Add Expense</Text>

      {/* Title */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Title</Text>
      <TextInput
        placeholder="What was it for?"
        placeholderTextColor="#9ca3af" // explicit gray
        value={title}
        onChangeText={setTitle}
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
      />

      {/* Amount */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Amount</Text>
      <TextInput
        placeholder="Enter amount"
        placeholderTextColor="#9ca3af" // explicit gray
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
                isSelected ? "bg-black border-black" : "border-gray-300"
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
      {/* Date Field */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Date</Text>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
      >
        <Text style={tailwind`text-base`}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChangeDate}
          maximumDate={new Date()} // prevent future date
        />
      )}

      {/* Button */}
      <TouchableOpacity
        onPress={handleAddExpense}
        style={tailwind`bg-black py-4 rounded-xl items-center`}
      >
        <Text style={tailwind`text-white font-bold text-base`}>
          Add Expense
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateExpense;
