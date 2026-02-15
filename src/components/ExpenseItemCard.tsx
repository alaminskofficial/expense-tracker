import React from "react";
import { Text, View } from "react-native";
import tailwind from "twrnc";
import { Expense } from "../types/expense";
import { getCategoryConfig} from "../utils/categoryHelper";

type Props = {
  item: Expense;
};

const ExpenseItemCard: React.FC<Props> = ({ item }) => {
  const isExpense = item.amount < 0;
  const category = getCategoryConfig(item.category);

  return (
    <View style={tailwind`mx-5 my-1`}>
      <View style={tailwind`bg-white p-4 rounded-2xl shadow flex-row justify-between`}>
        {/* Left */}
        <View style={tailwind`flex-row flex-1 items-center`}>
          <View
            style={[
              tailwind`w-12 h-12 rounded-full items-center justify-center mr-3`,
              { backgroundColor: category.bg },
            ]}
          >
            <Text style={tailwind`text-lg`}>{category.icon}</Text>
          </View>

          <View>
            <Text style={tailwind`text-base font-bold`}>{item.title}</Text>

            <View
              style={[
                tailwind`px-2 py-0.5 rounded-full mt-1 self-start`,
                { backgroundColor: category.bg },
              ]}
            >
              <Text
                style={[
                  tailwind`text-xs font-semibold`,
                  { color: category.text },
                ]}
              >
                {item.category}
              </Text>
            </View>
          </View>
        </View>

        {/* Right */}
        <View style={tailwind`items-end`}>
          <Text
            style={tailwind.style(
              "text-base font-bold",
              isExpense ? "text-red-500" : "text-green-600"
            )}
          >
            {isExpense ? "-" : "+"}₹{Math.abs(item.amount)}
          </Text>

          <Text style={tailwind`text-xs text-gray-500 mt-1`}>
            {new Date(item.date).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ExpenseItemCard;
