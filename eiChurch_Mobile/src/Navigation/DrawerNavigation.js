import { createDrawerNavigator } from "@react-navigation/drawer";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { Drawer, DrawerItem, IndexPath } from "@ui-kitten/components";
import HomeScreen from "../screens/HomeScreen";
import ReservationScreen from "../screens/ReservationScreen";
import LiveStream from "../screens/LiveStream";
import Accomplishments from "../screens/Accomplishments";
import MembersOfTheChurch from "../screens/MembersOfTheChurch";
import ProfileScreen from "../screens/ProfileScreen";
import ChurchScreen from "../screens/ChurchScreen";
import ChurchHistory from "../screens/ChurchHistory";
import ChurchNewsAndUpdates from "../screens/ChurchNewsAndUpdates";
import CelebrationEvents from "../screens/CelebrationEvents";
import CurrentEvents from "../screens/CurrentEvents";
import MissionAndVision from "../screens/MissionAndVision";
import Prayers from "../screens/Prayers";
import EditProfileScreen from "../screens/EditProfileScreen";
import ReservationIndex from "../screens/ReservationIndex";
import ReservationView from "../screens/ReservationView";
const DrawerStack = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => {
  return (
    <Drawer
      selectedIndex={new IndexPath(state.index)}
      onSelect={(index) => {
        navigation.navigate(state.routeNames[index.row]);
        if (index != 7) {
          navigation.navigate(state.routeNames[index.row]);
        }
      }}
      style={{ marginTop: 50 }}
    >
      <DrawerItem title={`Home`} />
      <DrawerItem title={`About Us`} />
      <DrawerItem title={`Events`} />
      <DrawerItem title={`Explore`} />
      <DrawerItem title={`Reservation`} />
      <DrawerItem title={`Donate`} />
      <DrawerItem title={`Profile`} />
      {/* <DrawerItem title={`Church 7`} />
      <DrawerItem title={`Church 8`} />
      <DrawerItem title={`Church 9`} />
      <DrawerItem title={`Church 10`} />
      <DrawerItem title={`Church 11`} />
      <DrawerItem title={`Church 12`} /> */}
      <DrawerItem
        title={`Logout`}
        onPress={async () => {
          navigation.navigate("Login");
        }}
      />
    </Drawer>
  );
};

const DrawerNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <DrawerStack.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: "rgb(2 132 199)",
        },
        headerTitleStyle: {
          color: "#fff",
        },
      }}
    >
      {/* Home Screen */}
      <DrawerStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Home", headerTitleAlign: "center" }}
      />
      {/* Church: contains history, mission, accomplishment, members of the church */}
      <DrawerStack.Screen
        name="ChurchScreen"
        component={ChurchScreen}
        options={{ headerTitle: "About Us", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="ChurchNewsAndUpdates"
        component={ChurchNewsAndUpdates}
        options={{ headerTitle: "Current Events", headerTitleAlign: "center" }}
      />
      <DrawerStack.Screen name="Prayers" component={Prayers} />
      <DrawerStack.Screen
        name="ReservationIndex"
        component={ReservationIndex}
        options={{ headerTitle: "Reservation", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerTitle: "Edit Profile", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{ headerTitle: "Profile", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="ChurchHistory"
        component={ChurchHistory}
        options={{
          headerTitle: "History of Church",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="MissionAndVision"
        component={MissionAndVision}
        options={{
          headerTitle: "Mission and Vision",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="Accomplishments"
        component={Accomplishments}
        options={{
          headerTitle: "Accomplishments",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="MembersOfTheChurch"
        component={MembersOfTheChurch}
        options={{
          headerTitle: "Members of Church",
          headerTitleAlign: "center",
        }}
      />
      {/* contains the calendar event */}
      <DrawerStack.Screen
        name="CelebrationEvents"
        component={CelebrationEvents}
        options={{
          headerTitle: "Celebration of Events",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="ReservationScreen"
        component={ReservationScreen}
        options={{
          headerTitle: "Create Reservation",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="CurrentEvents"
        component={CurrentEvents}
        options={{
          headerTitle: "Current Events",
          headerTitleAlign: "center",
        }}
      />

      <DrawerStack.Screen
        name="ReservationView"
        component={ReservationView}
        options={{
          headerTitle: "View Reservation",
          headerTitleAlign: "center",
        }}
      />
    </DrawerStack.Navigator>
  );
};

export default DrawerNavigation;
