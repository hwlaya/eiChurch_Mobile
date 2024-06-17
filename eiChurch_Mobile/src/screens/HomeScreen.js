import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Card } from "@ui-kitten/components";
import BibleVerseOfTheDay from "../components/BibleVerseOfTheDay";
import Carousel from "react-native-reanimated-carousel";
import api from "../../config/api";
import { WebView } from "react-native-webview";
import { UserContext } from "../providers/UserProvider";
import { Octicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
  const navigation = useNavigation();

  const carouselImages = [
    { id: 1, source: require("../assets/images/carousel1.jpg") },
    { id: 2, source: require("../assets/images/carousel2.jpg") },
    { id: 3, source: require("../assets/images/carousel3.jpg") },
  ];

  const width = Dimensions.get("window").width;
  const user = useContext(UserContext);

  const handleCarouselPress = () => {
    // Redirect to the CurrentEvents page
    navigation.navigate("ChurchNewsAndUpdates");
  };

  const [announcements, setAnnouncements] = useState([]);
  const [livestreams, setLiveStreams] = useState([]);

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

  useEffect(() => {
    api
      .get("livestream/getalllivestreams")
      .then((response) => {
        setLiveStreams(response.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View
        style={{
          padding: 16,
          backgroundColor: "rgb(2 132 199)",
          borderBottomStartRadius: 20,
          borderBottomEndRadius: 20,
        }}
      >
        <View style={styles.carouselContainer}>
          <Carousel
            loop
            width={width}
            height={width / 2}
            autoPlay={true}
            data={carouselImages}
            scrollAnimationDuration={1000}
            //onSnapToItem={(index) => console.log("current index:", index)} //DEBUGGER
            spanGestureHandlerProps={{ activeOffsetX: [-5, 5] }}
            renderItem={({ item }) => (
              <View style={{ flex: 1 }}>
                <Image
                  source={item.source} // Use the image source from the item in the carouselImages array
                  style={{ width: "100%", height: "100%" }} // Adjust the image style as needed
                  resizeMode="cover" // Adjust the resize mode as needed
                />
              </View>
            )}
          />
        </View>

        <Card style={styles.card}>
          <BibleVerseOfTheDay />
        </Card>
      </View>

      <View style={styles.cardsContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Montserrat-Bold",
              color: "black",
              textAlign: "center",
            }}
          >
            Welcome to San Roque Parish
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontSize: 15,
              fontFamily: "Montserrat-Light",
              color: "black",
              textAlign: "center",
            }}
          >
            Explore the features offered by the app:
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 10,
          }}
        >
          <View style={styles.boxContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChurchScreen")}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon
                  name="information-outline"
                  color={"rgb(2 132 199)"}
                  size={50}
                />
                <Text style={styles.boxLabel}>About Us</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ChurchNewsAndUpdates")}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon
                  name="bullhorn-outline"
                  color={"rgb(2 132 199)"}
                  size={50}
                />
                <Text style={styles.boxLabel}>Announcements</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ExplorePage")}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="magnify" color={"rgb(2 132 199)"} size={50} />
                <Text style={styles.boxLabel}>Explore</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ReservationIndex")}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon
                  name="calendar-outline"
                  color={"rgb(2 132 199)"}
                  size={50}
                />
                <Text style={styles.boxLabel}>Reservation</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("DonationIndex")}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="heart-outline" color={"rgb(2 132 199)"} size={50} />
                <Text style={styles.boxLabel}>Donation</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.boxContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("LiveStreamIndex")}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Icon name="video-outline" color={"rgb(2 132 199)"} size={50} />
                <Text style={styles.boxLabel}>Live Stream</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    // marginTop: 5,
    marginBottom: 10,
    alignItems: "left",
  },
  carouselContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  carouselItem: {
    width: "100%",
    height: 200, // Set the desired height for the carousel items
    overflow: "hidden", // Clip the content to the specified dimensions
  },
  carouselImage: {
    width: "100%",
    height: "100%", // Take up the full height of the parent View
  },
  textStyle: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "center",
  },
  subTextStyle: {
    fontSize: 20,
    marginBottom: 4,
    paddingHorizontal: 10,
    fontFamily: "Montserrat-Italic",
    color: "black",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Montserrat-SemiBold",
    color: "black",
    textAlign: "center",
  },
  caption: {
    marginBottom: 10,
    fontFamily: "Montserrat-Medium",
    color: "black",
    textAlign: "center",
  },
  cardsContainer: {
    marginTop: 5,
    padding: 16,
  },
  card: {
    marginVertical: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
  centerText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 8,
  },
  calendarContainer: {
    width: "10%", // Calendar width
  },
  newsFeedItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: -15,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
    resizeMode: "cover",
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  newsContent: {
    flex: 1,
  },
  newsCaption: {
    fontSize: 12,
    color: "gray",
  },
  prayerThumbnail: {
    width: "100%",
    height: "60%",
    borderRadius: 10,
  },
  boxContainer: {
    backgroundColor: "white",
    width: "45%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  boxLabel: {
    fontFamily: "Montserrat-Medium",
    fontSize: 15,
    marginTop: 10,
  },
});

export default HomeScreen;
