import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";

import Home from "../screens/Home";
import Insights from "../screens/Insights";
import CreateExpense from "../screens/CreateExpense";
import CreateIncome from "../screens/CreateIncome";
import Transactions from "../screens/Transactions";
import EditTransaction from "../screens/EditTransaction";
import { RootStackParamList } from "./types";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

function BottomTabs() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#16a34a",   // green
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          height: 60 + insets.bottom,   // dynamic height
          paddingBottom: insets.bottom, // dynamic padding
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },        
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } 
          else if (route.name === "Expense") {
            iconName = focused ? "arrow-down-circle" : "arrow-down-circle-outline";
          } 
          else if (route.name === "Income") {
            iconName = focused ? "arrow-up-circle" : "arrow-up-circle-outline";
          } 
          else if (route.name === "Insights") {
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Expense" component={CreateExpense} />
      <Tab.Screen name="Income" component={CreateIncome} />
      <Tab.Screen name="Insights" component={Insights} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{ headerShown: true, title: "Expense Tracker" }}
      />
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="EditTransaction" component={EditTransaction} />
    </Stack.Navigator>
  );
}
