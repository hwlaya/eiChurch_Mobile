import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import HomeScreen from "../screens/HomeScreen";
import ChurchHistory from "../screens/ChurchHistory";
import ChurchNewsAndUpdates from "../screens/ChurchNewsAndUpdates";
import ProfileScreen from "../screens/ProfileScreen";
import { UserContext } from "../providers/UserProvider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();
const { Navigator: TabNavigator, Screen: TabScreen } =
  createBottomTabNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } =
  createStackNavigator();

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    appearance="noIndicator"
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Home" />
    <BottomNavigationTab title="Church" />
    <BottomNavigationTab title="Profile" />
  </BottomNavigation>
);

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="HomeScreen" component={BottomNavStack} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

const BottomNavStack = () => {
  return (
    <TabNavigator tabBar={(props) => <BottomTabBar {...props} />}>
      <TabScreen name="Home" component={HomeScreen} />
      <TabScreen name="Church" component={ChurchHistory} />
      <TabScreen name="Profile" component={ProfileScreen} />
    </TabNavigator>
  );
};

export default MainNavigation;
