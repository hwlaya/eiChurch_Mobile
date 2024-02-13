import React, { useContext } from "react";
import { View, Button, Image, StyleSheet } from "react-native";
import { Text } from "@ui-kitten/components";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const { user } = useContext(UserContext); // Retrieve user from context
  const { setUser } = useContext(UserContext); // Retrieve setUser from context
  const navigation = useNavigation();

  const handleLogout = () => {
    logout();
  };

  const logout = () => {
    // Clear the user state upon logout
    setUser(null);
    // Navigate to the login screen after logout
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/SanRoque_Logo.png")}
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text category="h4">Profile</Text>
        <Text>Name: {user ? user.username : ""}</Text>
        <Text>Email: {user ? user.email : ""}</Text>
        {/* Add more user details as needed */}
      </View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  userInfo: {
    marginBottom: 20,
    alignItems: "center",
  },
});

export default ProfileScreen;
