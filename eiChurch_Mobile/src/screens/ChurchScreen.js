import React from "react";
import { StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Card } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const ChurchScreen = () => {
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
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("ChurchHistory")}
          >
            <Text variant="headlineSmall" style={styles.title}>
              History of the Church
            </Text>
            <Text variant="titleMedium" style={styles.subTitle}>
              WE WANT TO SERVE THE WORLD AROUND US
            </Text>
            <Text variant="titleSmall" style={styles.caption}>
              San Roque Parish of the Roman Catholic Diocese of Cubao was
              established on September 2, 1997. It is located in Bagumbayan,
              Libis, City of Quezon. The Parish Fiesta is celebrated every 16th
              day of August.
            </Text>
          </Card>
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("MissionAndVision")}
          >
            <Text variant="headlineSmall" style={styles.title}>
              Mission and Vision
            </Text>
            <Text variant="titleSmall" style={styles.caption}>
              Discover the heart of our congregation through our mission and
              vision.
            </Text>
          </Card>
          <Card
            style={styles.card}
            onPress={() => navigation.navigate("Accomplishments")}
          >
            <Text variant="headlineSmall" style={styles.title}>
              Accomplishments
            </Text>
            <Text variant="titleSmall" style={styles.caption}>
              Explore the remarkable achievements of our community, a testament
              to our shared dedication, resilience, and commitment to our values
            </Text>
          </Card>

          <Card
            style={styles.card}
            onPress={() => navigation.navigate("MembersOfTheChurch")}
          >
            <Text variant="headlineSmall" style={styles.title}>
              Members Of The Church
            </Text>
            <Text variant="titleSmall" style={styles.caption}>
              Meet the vibrant members of our church community, each
              contributing their unique gifts, perspectives, and experiences
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
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
    paddingVertical: 5,
  },
  subTitle: {
    fontFamily: "Montserrat-Medium",
    color: "black",
    textAlign: "left",
  },
  caption: {
    fontFamily: "Montserrat-Light",
    marginBottom: 8,
  },
});

export default ChurchScreen;
