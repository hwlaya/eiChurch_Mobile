import { useNavigation } from "@react-navigation/native";
import { Card } from "@ui-kitten/components";
import { ImageBackground, ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ExplorePage = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text variant="headlineSmall" style={styles.textStyle}>
          Explore
        </Text>

        {/* PRAYERS */}
        <TouchableOpacity onPress={() => navigation.navigate("Prayers")}>
          <View style={styles.box}>
            <ImageBackground
              source={require("../assets/images/background5.jpg")} // Specify the path to your background image
              style={styles.image}
            >
              <View style={styles.contentContainer}>
                <View style={styles.contentContainer2}>
                  <Text variant="titleLarge" style={styles.text}>
                    Prayers
                  </Text>
                  <Icon name="arrow-right-circle" size={30} color={"white"} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>

        {/* ROSARY */}
        <TouchableOpacity onPress={() => navigation.navigate("ExploreRosary")}>
          <View style={styles.box}>
            <ImageBackground
              source={require("../assets/images/background5.jpg")} // Specify the path to your background image
              style={styles.image}
            >
              <View style={styles.contentContainer}>
                <View style={styles.contentContainer2}>
                  <Text variant="titleLarge" style={styles.text}>
                    Rosary
                  </Text>
                  <Icon name="arrow-right-circle" size={30} color={"white"} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>

        {/* GALLERY */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ExploreGalleryPage")}
        >
          <View style={styles.box}>
            <ImageBackground
              source={require("../assets/images/background5.jpg")} // Specify the path to your background image
              style={styles.image}
            >
              <View style={styles.contentContainer}>
                <View style={styles.contentContainer2}>
                  <Text variant="titleLarge" style={styles.text}>
                    Gallery
                  </Text>
                  <Icon name="arrow-right-circle" size={30} color={"white"} />
                </View>
              </View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
  },
  box: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "flex-end", // Aligns children (Text) to the bottom
  },
  image: { flex: 1, justifyContent: "flex-end" },
  contentContainer: {
    height: 120,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  contentContainer2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  text: {
    fontFamily: "Montserrat-Bold",
    color: "black",
  },
});

export default ExplorePage;
