import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";
import { Card, Divider } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import api from "../../config/api";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const ChurchNewsAndUpdates = () => {
  const navigation = useNavigation();

  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    // Make API call
    api
      .get(`announcement/all`)
      .then((response) => {
        setAnnouncements(response.data.announcements);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

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
          <View>
            <Text variant="headlineSmall" style={styles.textStyle}>
              Church News and Updates
            </Text>
            {/* Post 1 */}
            {announcements.map((announcement, index) => (
              <Card
                key={index}
                style={styles.card}
                onPress={() => console.log("Navigate to Post 1")}
              >
                <Image
                  source={{
                    uri: `https://sanroqueparish.com/DataSonicCapstone-main/public/images/announcements/${announcement.announcement_image}`,
                  }}
                  style={styles.thumbnail}
                />
                <View style={styles.newsContent}>
                  <Text style={styles.newsTitle}>
                    {announcement.announcement_title}
                  </Text>
                  <Divider style={styles.divider} />

                  <Text style={styles.newsCaption}>
                    {announcement.announcement_content}
                  </Text>
                </View>
              </Card>
            ))}
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
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
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
  divider: {
    marginVertical: 2,
    backgroundColor: "#949494",
  },
});

export default ChurchNewsAndUpdates;
