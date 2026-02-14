import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import Insights from "../screens/Insights";
import CreateExpense from "../screens/CreateExpense";
import CreateIncome from "../screens/CreateIncome";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Expense" component={CreateExpense} />
      <Tab.Screen name="Income" component={CreateIncome} />
      <Tab.Screen name="Insights" component={Insights} />
      
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  //stack screens
  return (
    <Stack.Navigator>
      <Stack.Screen name="BottomTabs" component={BottomTabs} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
    //inside stack screens, we have tab screens
  );
}
