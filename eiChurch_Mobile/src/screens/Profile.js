import React from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
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
              Name: Juan Dela Cruz {"\n"}
              Email: juan@example.com {"\n"}
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
