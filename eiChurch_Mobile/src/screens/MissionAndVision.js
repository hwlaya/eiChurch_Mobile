import React from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Card } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const MissionAndVision = () => {
  const navigation = useNavigation();

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
          <Card style={styles.card}>
            <Text category="h4" style={styles.title}>
              Mission and Vision
            </Text>
            <Text category="p">
              <Text style={styles.boldText}>Our Mission:</Text> Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Text>
            <Text category="p">
              <Text style={styles.boldText}>Our Vision:</Text> Lorem ipsum dolor
              sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.
            </Text>
            {/* Add more details about the mission and vision */}
          </Card>
          <TouchableOpacity onPress={() => navigation.navigate("ChurchScreen")}>
            <Icon name="arrow-left" size={50} color={"#000"} />
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
  card: {
    marginBottom: 16,
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default MissionAndVision;
