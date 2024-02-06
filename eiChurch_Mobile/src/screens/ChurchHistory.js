import React from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Text, Card } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";

const ChurchHistory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background5.jpg")} // Specify the path to your background image
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              History of the Church
            </Text>
            <Text category="p1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Accomplishments
            </Text>
            <Text category="p1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Members of the Church (Founder & Current)
            </Text>
            <Text category="p1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Mission and Vision
            </Text>
            <Text category="p1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
          </Card>

          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Statement of Inclusivity
            </Text>
            <Text category="p1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
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

export default ChurchHistory;
