import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ChurchHistory from "../screens/ChurchHistory";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import Profile from "../screens/Profile";
import Login from "../Auth/Login";
import Register from "../Auth/Register";

const { Navigator, Screen } = createBottomTabNavigator();

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
      <Navigator
        tabBar={(props) => <BottomTabBar {...props} />}
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Login" component={Login} />
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Church" component={ChurchHistory} />
        <Screen name="Profile" component={Profile} />
        <Screen name="Register" component={Register} />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
