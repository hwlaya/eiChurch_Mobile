import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ChurchHistory from "../screens/ChurchHistory";
import ProfileScreen from "../screens/ProfileScreen";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { UserContext } from "../providers/UserProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } =
  createBottomTabNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } =
  createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="HomeScreen" component={HomeScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

const HomeStack = () => {
  return (
    <StackNavigator screenOptions={{ headerShown: false }}>
      <StackScreen name="HomeMain" component={HomeScreen} />
    </StackNavigator>
  );
};

export default MainNavigation;
