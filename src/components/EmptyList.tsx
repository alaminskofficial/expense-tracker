import React from "react";
import { Text, View, StyleSheet } from "react-native";
import tailwind from "twrnc";

const EmptyList: React.FC = ({ title, message }: any) => {
  return (
    <View style={tailwind`flex-1 justify-center items-center p-8 mt-10`}>
      <Text style={tailwind`text-6xl mb-4`}>📭</Text> 

      <Text style={tailwind`text-xl font-bold text-gray-800 mb-2`}>{title || "No Expense yet"}</Text>
      <Text style={tailwind`text-base text-gray-500 text-center`}> {message || "Add a new expense to see it in your list"}</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
