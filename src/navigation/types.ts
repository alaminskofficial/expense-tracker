import { NavigatorScreenParams } from "@react-navigation/native";
import { Expense } from "../types/expense";
export type BottomTabParamList = {
  Home: undefined;
  Expense: undefined;
  Income: undefined;
  Insights: undefined;
};

export type RootStackParamList = {
  BottomTabs: NavigatorScreenParams<BottomTabParamList>;
  Transactions: undefined;
  EditTransaction: { expense: Expense };
};
