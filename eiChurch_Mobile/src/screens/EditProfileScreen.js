import React, { useContext, useState } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Card } from "@ui-kitten/components";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";

const EditProfileScreen = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Header
        logoSource={require("../assets/images/church_icon.png")}
        title="eiChurch"
        subtitle="San Roque Parish Church"
      />
      <ImageBackground
        source={require("../assets/images/background.jpg")} // Specify the path to your background image
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Your EditProfileScreen content goes here */}
          <Card style={styles.card}>
            <Text variant="headlineSmall" style={styles.title}>
              Edit Profile
            </Text>
            <Text>Username: </Text>
            <TextInput
              style={{
                height: 35,
                width: "75%",
              }}
              outlineStyle={{ borderRadius: 10 }}
              value={user ? user.username : ""}
              // onChangeText={(value) => setFname(value)}
              mode="outlined"
            />
            <Text>Name:</Text>
            <TextInput
              style={{
                height: 35,
                width: "75%",
              }}
              outlineStyle={{ borderRadius: 20 }}
              value={user ? user.name : ""}
              // onChangeText={(value) => setFname(value)}
              mode="outlined"
            />
            <Text>Email:</Text>
            <TextInput
              style={{
                height: 35,
                width: "75%",
              }}
              outlineStyle={{ borderRadius: 20 }}
              value={user ? user.email : ""}
              // onChangeText={(value) => setFname(value)}
              mode="outlined"
            />
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Change Password:
            </Text>
            <Text>Current Password: </Text>
            <TextInput
              style={{
                height: 35,
                width: "75%",
              }}
              outlineStyle={{ borderRadius: 10 }}
              value={user ? user.password : ""}
              // onChangeText={(value) => setFname(value)}
              mode="outlined"
            />
            <Text>New Password: </Text>
            <TextInput
              style={{
                height: 35,
                width: "75%",
              }}
              outlineStyle={{ borderRadius: 10 }}
              value={user ? user.password : ""}
              // onChangeText={(value) => setFname(value)}
              mode="outlined"
            />
            <Text>Confirm Password: </Text>
            <TextInput
              style={{
                height: 35,
                width: "75%",
              }}
              outlineStyle={{ borderRadius: 10 }}
              value={user ? user.password : ""}
              // onChangeText={(value) => setFname(value)}
              mode="outlined"
            />
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Donations
            </Text>
            <Text category="p1">
              Total Donations: $1000 {"\n"}
              Last Donation: December 15, 2023 {"\n"}
              Recipient: Church of St. John {"\n"}
              Purpose: Tithes and Offerings
            </Text>
          </Card>
          <TouchableOpacity
            onPress={() => navigation.navigate("ProfileScreen")}
          >
            <Icon name="arrow-left" size={50} color={"#FFF"} />
          </TouchableOpacity>
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
  card: {
    marginBottom: 16,
    padding: 16,
  },
  title: {
    marginBottom: 8,
    fontFamily: "Montserrat-Medium",
  },
});

export default EditProfileScreen;
