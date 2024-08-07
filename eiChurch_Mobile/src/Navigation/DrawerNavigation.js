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
import DonationIndex from "../screens/DonationIndex";
import DonationCreate from "../screens/DonationCreate";
import AccomplishmentView from "../screens/AccomplishmentView";
import ChurchNewsAndUpdatesView from "../screens/ChurchNewsAndUpdatesView";
import ExplorePage from "../screens/ExplorePage";
import ExploreGalleryPage from "../screens/ExploreGalleryPage";
import ExploreGalleryPageView from "../screens/ExploreGalleryPageView";
import ExploreRosary from "../screens/ExploreRosary";
import LiveStreamIndex from "../screens/LiveStreamIndex";
import Profile from "../screens/Profile";
import DonationWebView from "../screens/DonationWebView";
import ReservationWebView from "../screens/ReservationWebView";

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
      <DrawerItem title={`Announcements`} />
      <DrawerItem title={`Explore`} />
      <DrawerItem title={`Reservation`} />
      <DrawerItem title={`Donation`} />
      <DrawerItem title={`Live Stream`} />
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
        options={{ headerTitle: "Announcements", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="ExplorePage"
        component={ExplorePage}
        options={{ headerTitle: "Explore", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="ReservationIndex"
        component={ReservationIndex}
        options={{ headerTitle: "Reservation", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="DonationIndex"
        component={DonationIndex}
        options={{ headerTitle: "Donation", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="LiveStreamIndex"
        component={LiveStreamIndex}
        options={{ headerTitle: "Live Stream", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: "Profile", headerTitleAlign: "center" }}
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

      <DrawerStack.Screen name="Prayers" component={Prayers} />
      <DrawerStack.Screen
        name="ExploreGalleryPage"
        component={ExploreGalleryPage}
        options={{ headerTitle: "Gallery", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="ExploreGalleryPageView"
        component={ExploreGalleryPageView}
        options={{ headerTitle: "View Gallery", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="ExploreRosary"
        component={ExploreRosary}
        options={{ headerTitle: "Rosary", headerTitleAlign: "center" }}
      />

      <DrawerStack.Screen
        name="LiveStream"
        component={LiveStream}
        options={{ headerTitle: "Rosary", headerTitleAlign: "center" }}
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

      <DrawerStack.Screen
        name="DonationCreate"
        component={DonationCreate}
        options={{
          headerTitle: "Donate",
          headerTitleAlign: "center",
        }}
      />

      <DrawerStack.Screen
        name="AccomplishmentView"
        component={AccomplishmentView}
        options={{
          headerTitle: "View Accomplishment",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="ChurchNewsAndUpdatesView"
        component={ChurchNewsAndUpdatesView}
        options={{
          headerTitle: "View Announcement",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="DonationWebView"
        component={DonationWebView}
        options={{
          headerTitle: "Donation",
          headerTitleAlign: "center",
        }}
      />
      <DrawerStack.Screen
        name="ReservationWebView"
        component={ReservationWebView}
        options={{
          headerTitle: "Reservation",
          headerTitleAlign: "center",
        }}
      />
    </DrawerStack.Navigator>
  );
};

export default DrawerNavigation;
