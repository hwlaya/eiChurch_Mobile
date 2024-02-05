import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ChurchHistory from "../screens/ChurchHistory";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import Profile from "../screens/Profile";

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
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Church" component={ChurchHistory} />
        <Screen name="Profile" component={Profile} />
      </Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
