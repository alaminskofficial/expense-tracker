import React from "react";
import { View, Text } from "react-native";
import tailwind from "twrnc";
import { getCategoryConfig } from "../utils/categoryHelper";

type Props = {
  category: string;
  total: number;
};

const CategorySummaryCard: React.FC<Props> = ({ category, total }) => {
  const config = getCategoryConfig(category);
  const isExpense = total < 0;

  return (
    <View style={tailwind`mx-4 my-1`}>
      <View
        style={tailwind`bg-white p-3 rounded-2xl shadow flex-row justify-between items-center`}
      >
        {/* Left */}
        <View style={tailwind`flex-row items-center`}>
          <View
            style={[
              tailwind`w-10 h-10 rounded-full items-center justify-center mr-3`,
              { backgroundColor: config.bg },
            ]}
          >
            <Text>{config.icon}</Text>
          </View>

          <Text style={tailwind`text-base font-semibold`}>{category}</Text>
        </View>

        {/* Amount */}
        <Text
          style={tailwind.style(
            "text-lg font-bold",
            isExpense ? "text-red-500" : "text-green-500"
          )}
        >
          {isExpense ? "-" : "+"}₹{Math.abs(total)}
        </Text>
      </View>
    </View>
  );
};

export default CategorySummaryCard;
