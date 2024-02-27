import React, { useContext } from "react";
import {
  View,
  Button,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Text, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";

const ProfileScreen = () => {
  const { user } = useContext(UserContext); // Retrieve user from context
  const { setUser } = useContext(UserContext); // Retrieve setUser from context
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header
        logoSource={require("../assets/images/church_icon.png")}
        title="eiChurch"
        subtitle="San Roque Parish Church"
      />
      <ImageBackground
        source={require("../assets/images/background5.jpg")} // Specify the path to your background image
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.userInfo}>
            <View style={styles.imageProfile}>
              <Icon name="account" size={50} color={"#000"} />
            </View>
            <View style={{ justifyContent: "center", marginLeft: 10 }}>
              <Text variant="titleLarge" style={styles.userInfoText}>
                {user ? user.username : ""}
              </Text>
              <Text variant="titleLarge" style={styles.userInfoText2}>
                {user ? user.email : ""}
              </Text>
            </View>
          </View>
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("Profile")}
          >
            <Text variant="titleMedium" style={styles.title}>
              My Profile
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text variant="titleMedium" style={styles.title}>
              Reservations
            </Text>
          </Card>
          <Card style={styles.card}>
            <Text variant="titleMedium" style={styles.title}>
              Donations
            </Text>
          </Card>
          <Button title="Logout" onPress={handleLogout} />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  backgroundImage: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  userInfo: {
    marginBottom: 20,
    justifyContent: "space-between",
    marginRight: "40%",
    alignItems: "center",
    flexDirection: "row",
  },
  imageProfile: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: 80,
    borderRadius: 500,
  },
  userInfoText: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 22,
  },
  userInfoText2: {
    fontFamily: "Montserrat-LightItalic",
    fontSize: 18,
  },
  title: {
    marginBottom: 8,
    fontFamily: "Montserrat-Medium",
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
});

export default ProfileScreen;
