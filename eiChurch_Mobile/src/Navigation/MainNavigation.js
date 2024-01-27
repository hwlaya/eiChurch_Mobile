import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import HomeScreen from "../screens/HomeScreen";
import CurrentEvents from "../screens/CurrentEvents";
import ChurchNewsAndUpdates from "../screens/ChurchNewsAndUpdates";

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
  );
};

const Stack = createNativeStackNavigator();

export default function MainNavigation() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CurrentEvents" component={CurrentEvents} />
        <Stack.Screen name="ChurchNewsAndUpdates" component={ChurchNewsAndUpdates} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
