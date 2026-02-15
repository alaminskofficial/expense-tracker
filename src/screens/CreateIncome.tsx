import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import tailwind from "twrnc";
import { Expense } from "../types/expense";
import { incomeCategories } from "../utils/categoryHelper";
import { useExpenseStore } from "../store/useExpenseStore";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { useNavigation } from "@react-navigation/native";

const CreateIncome: React.FC = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");

  // Date states
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const addIncome = useExpenseStore((state) => state.addExpense);
  type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProp>();

  const handleDateChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleAddIncome = () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please enter title and amount");
      return;
    }

    const newIncome: Expense = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      amount: Number(amount),
      category,
      date: date.toISOString(), // store ISO format
    };

    //console.log("New Income:", newIncome);
    addIncome(newIncome);
    navigation.navigate("BottomTabs", { screen: "Home" });
    //Alert.alert("Success", "Income Added");

    setTitle("");
    setAmount("");
    setCategory("Salary");
    setDate(new Date());
  };

  return (
    <View style={tailwind`flex-1 bg-white px-5 pt-6`}>
      <Text style={tailwind`text-2xl font-bold mb-6`}>Add Income</Text>

      {/* Title */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Source</Text>
      <TextInput
        placeholder="Enter income source"
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
        {incomeCategories.map((cat) => {
          const isSelected = category === cat;
          return (
            <TouchableOpacity
              key={cat}
              onPress={() => setCategory(cat)}
              style={tailwind.style(
                "px-4 py-2 rounded-full mr-2 mb-2 border",
                isSelected ? "bg-green-600 border-green-600" : "border-gray-300"
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

      {/* Date Picker Field */}
      <Text style={tailwind`text-sm text-gray-600 mb-1`}>Date</Text>

      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={tailwind`border border-gray-300 rounded-xl px-4 py-3 mb-4`}
      >
        <Text style={tailwind`text-base`}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}

      {/* Button */}
      <TouchableOpacity
        onPress={handleAddIncome}
        style={tailwind`bg-green-600 py-4 rounded-xl items-center`}
      >
        <Text style={tailwind`text-white font-bold text-base`}>Add Income</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateIncome;
