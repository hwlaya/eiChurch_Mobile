import { Calendar, Divider } from "@ui-kitten/components";
import React from "react";
import { View, ScrollView, StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";

const CelebrationEvents = () => {
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
          <Text variant="headlineSmall" style={styles.textStyle}>
            Celebration and Events
          </Text>
          <Text variant="titleSmall" style={styles.subTextStyle}>
            Join us in commemorating the joyous moments and meaningful occasions
            that mark our shared journey of faith and fellowship.
          </Text>
          {/* Calendar */}
          <View>
            <Calendar />
          </View>

          {/* Announcements */}
          <View style={{ flex: 1, width: "100%" }}>
            <Divider
              style={{
                backgroundColor: "black",
                marginVertical: 8,
                width: "100%",
              }}
            />
            {/* Example 1: Date with Event */}
            <View>
              <Text style={styles.date}>January 15, 2024</Text>
              <Text style={styles.eventName}>Church Service</Text>
              <Text style={styles.eventTime}>10:00 AM</Text>
            </View>
            <Divider
              style={{
                backgroundColor: "black",
                marginVertical: 8,
                width: "100%",
              }}
            />
            {/* Example 2: Date with Event */}
            <View>
              <Text style={styles.date}>February 1, 2024</Text>
              <Text style={styles.eventName}>Community Outreach</Text>
              <Text style={styles.eventTime}>2:00 PM</Text>
            </View>
            <Divider
              style={{
                backgroundColor: "black",
                marginVertical: 8,
                width: "100%",
              }}
            />
            {/* Example 3: Date with Event */}
            <View>
              <Text style={styles.date}>March 10, 2024</Text>
              <Text style={styles.eventName}>Bible Study</Text>
              <Text style={styles.eventTime}>7:00 PM</Text>
            </View>

            {/* Divider */}
            <Divider
              style={{
                backgroundColor: "black",
                marginVertical: 8,
                width: "100%",
              }}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
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
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  textStyle: {
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
  },
  subTextStyle: {
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
    color: "black",
    textAlign: "left",
  },
  date: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  eventName: {
    fontSize: 14,
    marginBottom: 4,
  },
  eventTime: {
    fontSize: 12,
    color: "gray",
  },
});

export default CelebrationEvents;
