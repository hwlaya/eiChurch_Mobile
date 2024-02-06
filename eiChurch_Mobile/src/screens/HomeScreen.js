import React from "react";
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

const HomeScreen = () => {
  const navigation = useNavigation();

  const carouselImages = [
    { id: 1, source: require("../assets/images/carousel1.jpg") },
    { id: 2, source: require("../assets/images/carousel2.jpg") },
    { id: 3, source: require("../assets/images/carousel3.jpg") },
  ];

  const width = Dimensions.get("window").width;

  const handleCarouselPress = () => {
    // Redirect to the CurrentEvents page
    navigation.navigate("ChurchNewsAndUpdates");
  };

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
            <Text
              style={{
                fontSize: 22,
                marginBottom: 5,
                fontFamily: "Montserrat-Bold",
                color: "black",
                textAlign: "center",
              }}
            >
              Church News and Updates
            </Text>

            {/* News and Updates Feed */}
            <Card
              style={styles.card}
              onPress={() => navigation.navigate("ChurchNewsAndUpdates")}
            >
              {/* Post 1 */}
              <View style={styles.newsFeedItem}>
                {/* Thumbnail */}
                <Image
                  source={require("../assets/images/carousel1.jpg")} // Replace with actual thumbnail source
                  style={styles.thumbnail}
                />
                {/* Content */}
                <View style={styles.newsContent}>
                  {/* Title */}
                  <Text style={styles.newsTitle}>
                    Ika-2 Linggo sa Karaniwang Panahon
                  </Text>
                  {/* Caption */}
                  <Text style={styles.newsCaption}>
                    We invite you to submit your prayer intentions to be
                    included in our..
                  </Text>
                </View>
              </View>

              {/* Post 2 */}
              <View style={styles.newsFeedItem}>
                {/* Thumbnail */}
                <Image
                  source={require("../assets/images/carousel2.jpg")} // Replace with actual thumbnail source
                  style={styles.thumbnail}
                />
                {/* Content */}
                <View style={styles.newsContent}>
                  {/* Title */}
                  <Text style={styles.newsTitle}>
                    𝐋𝐢𝐧𝐠𝐠𝐮𝐡𝐚𝐧𝐠 𝐃𝐞𝐛𝐨𝐬𝐲𝐨𝐧 𝐤𝐚𝐲 𝐒𝐚𝐧 𝐑𝐨𝐪𝐮𝐞
                  </Text>
                  {/* Caption */}
                  <Text style={styles.newsCaption}>
                    Halina at magdebosyon sa ating Mahal na Patron!
                  </Text>
                </View>
              </View>

              {/* Post 3 */}
              <View style={styles.newsFeedItem}>
                {/* Thumbnail */}
                <Image
                  source={require("../assets/images/carousel3.jpg")} // Replace with actual thumbnail source
                  style={styles.thumbnail}
                />
                {/* Content */}
                <View style={styles.newsContent}>
                  {/* Title */}
                  <Text style={styles.newsTitle}>
                    𝐏𝐢𝐬𝐭𝐚 𝐧𝐠 𝐈𝐭𝐢𝐦 𝐧𝐚 𝐍𝐚𝐳𝐚𝐫𝐞𝐧𝐨 | January 9, 2024
                  </Text>
                  {/* Caption */}
                  <Text style={styles.newsCaption}>
                    Taimtim nating pagnilayan ang paggugunita ng 𝐊𝐚𝐩𝐢𝐬𝐭𝐚𝐡𝐚𝐧 𝐧𝐠
                    𝐈𝐭𝐢𝐦 𝐧𝐚 𝐍𝐚𝐳𝐚𝐫𝐞𝐧𝐨
                  </Text>
                </View>
              </View>
            </Card>
          </View>
          <Text>Bottom of the screen</Text>
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
});

export default HomeScreen;
