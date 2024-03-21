import React from "react";
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

const MembersOfTheChurch = () => {
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
          <View>
            <Text variant="headlineSmall" style={styles.textStyle}>
              Members Of The Church
            </Text>
            <Text variant="titleSmall" style={styles.subTextStyle}>
              Meet the vibrant members of our church community, each
              contributing their unique gifts, perspectives, and experiences
            </Text>
            <Card style={styles.card}>
              <Image
                source={require("../assets/images/member1.jpg")}
                style={styles.thumbnail}
              />
              <Text style={styles.newsTitle}>Red. Pd. Rey Paglinawan</Text>
              <Divider style={styles.divider} />
              <Text style={styles.newsCaption}>Parish Administrator</Text>
            </Card>
            <Card style={styles.card}>
              <Image
                source={require("../assets/images/member2.jpg")}
                style={styles.thumbnail}
              />
              <Text style={styles.newsTitle}>
                Red. Pd. Mark Anthony Catilogo
              </Text>
              <Divider style={styles.divider} />
              <Text style={styles.newsCaption}>Parish Priest</Text>
            </Card>
            <Card style={styles.card}>
              <Image
                source={require("../assets/images/member3.jpg")}
                style={styles.thumbnail}
              />
              <Text style={styles.newsTitle}>Red. Pd. Juvelan Paul Samia</Text>
              <Divider style={styles.divider} />
              <Text style={styles.newsCaption}>
                Director for Pastoral Ministry
              </Text>
            </Card>
            <Card style={styles.card}>
              <Image
                source={require("../assets/images/member4.jpg")}
                style={styles.thumbnail}
              />
              <Text style={styles.newsTitle}>Red. Fr. Ricky C. Montanez</Text>
              <Divider style={styles.divider} />
              <Text style={styles.newsCaption}>Lead Pastor</Text>
            </Card>
          </View>
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
    height: 400,
    borderRadius: 3,
    marginBottom: 3,
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
  newsContent: {
    flex: 1,
  },
  newsTitle: {
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
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

export default MembersOfTheChurch;
