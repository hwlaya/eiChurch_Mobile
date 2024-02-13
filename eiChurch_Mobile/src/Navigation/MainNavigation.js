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

const { Navigator: TabNavigator, Screen: TabScreen } =
  createBottomTabNavigator();
const { Navigator: StackNavigator, Screen: StackScreen } =
  createStackNavigator();

const MainNavigation = () => {
  const { user } = React.useContext(UserContext);

  return (
    <NavigationContainer>
      {user ? (
        <TabNavigator>
          <TabScreen name="Home" component={HomeStack} />
          <TabScreen name="Church" component={ChurchHistory} />
          <TabScreen name="Profile" component={ProfileScreen} />
        </TabNavigator>
      ) : (
        <StackNavigator screenOptions={{ headerShown: false }}>
          <StackScreen name="Login" component={Login} />
          <StackScreen name="Register" component={Register} />
        </StackNavigator>
      )}
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
