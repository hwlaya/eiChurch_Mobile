import React, { useEffect, useState } from "react";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CustomBackButton from "../components/ui/CustomBackButton";
import api from "../../config/api";

const Prayers = () => {
  const navigation = useNavigation();
  const [prayers, setPrayers] = useState(null);

  useEffect(() => {
    api
      .get("prayer/all")
      .then((response) => {
        setPrayers(response.data.prayers);
      })
      .catch((err) => {
        console.log(err);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("prayer/all")
        .then((response) => {
          setPrayers(response.data.prayers);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.container}>
      {/* <Header
        logoSource={require("../assets/images/church_icon.png")}
        title="eiChurch"
        subtitle="San Roque Parish Church"
      /> */}
      <ImageBackground
        source={require("../assets/images/background5.jpg")} // Specify the path to your background image
        style={styles.backgroundImage}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View>
            <Image
              source={require("../assets/images/prayer.jpg")}
              style={styles.thumbnail}
            />
            <Text variant="headlineSmall" style={styles.textStyle}>
              Prayers
            </Text>

            {prayers ? (
              <>
                {prayers.map((prayer, index) => (
                  <Card style={styles.card}>
                    <View style={styles.newsContent} key={index}>
                      <Text style={styles.newsTitle}>
                        {prayer.prayer_title}
                      </Text>
                      <Divider style={styles.divider} />
                      <Text style={styles.newsCaption}>
                        {prayer.prayer_content}
                      </Text>
                    </View>
                  </Card>
                ))}
              </>
            ) : (
              <Card style={styles.card}>
                <Text>No prayers available</Text>
              </Card>
            )}
          </View>
          <CustomBackButton route={"ExplorePage"} />
        </ScrollView>
      </ImageBackground>
    </View>
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
    paddingVertical: 10,
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

export default Prayers;
