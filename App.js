import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "./src/context/ThemeContext";
import BudgetScreen from "./src/screens/BudgetScreen";
import { lightTheme, darkTheme } from "./src/theme/colors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator
            initialRouteName="Budget"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Budget" component={BudgetScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
}
