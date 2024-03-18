import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Text, Card } from "@ui-kitten/components";
import BibleVerseOfTheDay from "../components/BibleVerseOfTheDay";
import Carousel from "react-native-reanimated-carousel";
import api from "../../config/api";
import { WebView } from 'react-native-webview';
import { UserContext } from "../providers/UserProvider";

const HomeScreen = () => {
  const navigation = useNavigation();

  const carouselImages = [
    { id: 1, source: require("../assets/images/carousel1.jpg") },
    { id: 2, source: require("../assets/images/carousel2.jpg") },
    { id: 3, source: require("../assets/images/carousel3.jpg") },
  ];

  const width = Dimensions.get("window").width;
  const user = useContext(UserContext)

  const handleCarouselPress = () => {
    // Redirect to the CurrentEvents page
    navigation.navigate("ChurchNewsAndUpdates");
  };

  const [announcements, setAnnouncements] = useState([]);
  const [livestreams, setLiveStreams] = useState([]);

  useEffect(() => {
    // Fetch data here
    const fetchAnnouncements = async () => {
      // Make API call
      try {
        const response = await api.get(`announcement/all`);
        setAnnouncements(response.data.announcements);
      } catch (err) {
        console.log(err.response);
      }
    };
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
    <ImageBackground
      source={require("../assets/images/background4.jpg")} // Specify the path to your background image
      style={styles.backgroundImage}
    >
      <ScrollView style={styles.container}>
        {/* Temporary Header*/}
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: "Montserrat-Bold",
            }}
          >
            Welcome to San Roque Parish
          </Text>
        </View>

        {/* Carousel Section */}
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

        {/* Cards */}
        <View style={styles.cardsContainer}>
          {/* Card 1: Bible Verse of the Day */}
          <Card style={styles.card}>
            <BibleVerseOfTheDay />
          </Card>

          <View>
            <Text style={styles.textStyle}>Church News and Updates</Text>

            {/* News and Updates Feed */}
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("ChurchNewsAndUpdates")}
            >
              {/* Post 1 */}
              {announcements.map((announcement, index) => (
                <View key={index} style={styles.newsFeedItem}>
                  <Image
                    source={{
                      uri: `https://sanroqueparish.com/DataSonicCapstone-main/public/images/announcements/${announcement.announcement_image}`,
                    }} // Replace with actual thumbnail source
                    style={styles.thumbnail}
                  />
                  {/* Content */}
                  <View style={styles.newsContent}>
                    {/* Title */}
                    <Text style={styles.newsTitle}>
                      {announcement.announcement_title}
                    </Text>
                    {/* Caption */}
                    <Text style={styles.newsCaption}>
                      {announcement.announcement_content}
                    </Text>
                  </View>
                </View>
              ))}
            </Card>
          </View>
          <View>
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("Prayers")}
            >
              <Text style={styles.textStyle}>Prayers</Text>
              <View style={{ height: 300, marginBottom: -100 }}>
                <Image
                  source={require("../assets/images/prayer.jpg")}
                  style={styles.prayerThumbnail}
                />
              </View>
              <Text style={styles.subTextStyle}>Need Guidance? Press Here</Text>
            </Card>
          </View>
          <View>
            <Text style={styles.textStyle}>Celebration and Events</Text>
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("CelebrationEvents")}
            >
              <Text>Celebration and Events</Text>
            </Card>
            <Text style={styles.textStyle}>Current Events</Text>
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("CurrentEvents")}
            >
              <Text>Current Events</Text>
            </Card>
          </View>
          <View>
            <Text style={styles.textStyle}>Live Streams</Text>
            {livestreams.length > 0 && livestreams.map((item, index) => {
              return (
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("LiveStream", {
                token: user.token,
                user: user.user,
                room: item.livestream_name
              })}
              key={index}
            >
              <Text>{item.livestream_name}</Text>
            </Card>
              )
            })}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
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
    marginTop: 40,
    marginBottom: 20,
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
    marginBottom: 5,
    fontFamily: "Montserrat-Italic",
    color: "black",
    textAlign: "center",
  },
  cardsContainer: {
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#F3EFE0",
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
});

export default HomeScreen;
