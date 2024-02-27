import React, { useContext } from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Card } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const { user } = useContext(UserContext);

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
          {/* Your profile content goes here */}
          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Member Information
            </Text>
            <Text category="p1">
              Username: {user ? user.username : ""} {"\n"}
              Name: {user ? user.name : ""} {"\n"}
              Email: {user ? user.email : ""} {"\n"}
              Phone: +1234567890 {"\n"}
              Address: 123 Main St, City, Country
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Baptism Information
            </Text>
            <Text category="p1">
              Date of Baptism: January 1, 2022 {"\n"}
              Place: Church of St. John {"\n"}
              Minister: Rev. Maria Gonzalez
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Church Activities
            </Text>
            <Text category="p1">
              - Choir Member {"\n"}- Sunday School Volunteer {"\n"}- Bible Study
              Group Participant
            </Text>
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
  },
});

export default Profile;
