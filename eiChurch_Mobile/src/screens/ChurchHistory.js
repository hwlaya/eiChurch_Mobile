import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { Card, Divider } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";

const ChurchHistory = () => {
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
          <Image
            source={require("../assets/images/historyofthechurch.jpg")}
            style={styles.thumbnail}
          />
          <Text variant="headlineSmall" style={styles.textStyle}>
            History of the Church
          </Text>
          <Card style={styles.card}>
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>
                WE WANT TO SERVE THE WORLD AROUND US
              </Text>
              <Divider style={styles.divider} />
              <Text variant="titleLarge" style={styles.newsCaption}>
                San Roque Parish of the Roman Catholic Diocese of Cubao was
                established on September 2, 1997. It is located in Bagumbayan,
                Libis, City of Quezon. The Parish Fiesta is celebrated every
                16th day of August.
              </Text>
            </View>
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
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  card: {
    marginVertical: 7,
    borderRadius: 10,
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    marginBottom: 3,
  },
  textStyle: {
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
    paddingVertical: 10,
  },
  subTextStyle: {
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
    color: "black",
    textAlign: "left",
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
    marginBottom: 8,
  },
  newsCaption: {
    fontFamily: "Montserrat-Italic",
    fontSize: 14,
  },
  listItem: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
  },
  divider: {
    marginVertical: 2,
    backgroundColor: "#949494",
  },
});

export default ChurchHistory;
