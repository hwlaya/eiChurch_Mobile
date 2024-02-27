import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomNavigation, BottomNavigationTab } from "@ui-kitten/components";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ChurchScreen from "../screens/ChurchScreen";
import ChurchHistory from "../screens/ChurchHistory";
import ChurchNewsAndUpdates from "../screens/ChurchNewsAndUpdates";
import CelebrationEvents from "../screens/CelebrationEvents";
import CurrentEvents from "../screens/CurrentEvents";
import MissionAndVision from "../screens/MissionAndVision";
import Prayers from "../screens/Prayers";
import Profile from "../screens/Profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Define stack navigators
const AuthStack = createNativeStackNavigator();
const HomeStackNav = createStackNavigator();
const ProfileStackNav = createStackNavigator();
const ChurchStackNav = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define custom bottom tab bar component
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

// Define HomeTabs component
const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <BottomTabBar {...props} />}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} />
      <Tab.Screen name="ChurchStack" component={ChurchStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const ChurchStack = () => {
  return (
    <ChurchStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ChurchStackNav.Screen name="ChurchScreen" component={ChurchScreen} />
      <ChurchStackNav.Screen name="HomeTabs" component={HomeTabs} />
      <ChurchStackNav.Screen name="ChurchHistory" component={ChurchHistory} />
      <ChurchStackNav.Screen
        name="MissionAndVision"
        component={MissionAndVision}
      />
    </ChurchStackNav.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <ProfileStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNav.Screen name="ProfileScreen" component={ProfileScreen} />
      <ProfileStackNav.Screen name="HomTabs" component={HomeTabs} />
      <ProfileStackNav.Screen name="Profile" component={Profile} />
    </ProfileStackNav.Navigator>
  );
};

// Define HomeStack component
const HomeStack = () => {
  return (
    <HomeStackNav.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNav.Screen name="HomeScreen" component={HomeScreen} />
      <HomeStackNav.Screen name="HomeTabs" component={HomeTabs} />
      <HomeStackNav.Screen
        name="CelebrationEvents"
        component={CelebrationEvents}
      />
      <HomeStackNav.Screen
        name="ChurchNewsAndUpdates"
        component={ChurchNewsAndUpdates}
      />
      <HomeStackNav.Screen name="Prayers" component={Prayers} />
      <HomeStackNav.Screen name="CurrentEvents" component={CurrentEvents} />
    </HomeStackNav.Navigator>
  );
};

// Define MainNavigation component
const MainNavigation = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
        <AuthStack.Screen name="Home" component={HomeTabs} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
