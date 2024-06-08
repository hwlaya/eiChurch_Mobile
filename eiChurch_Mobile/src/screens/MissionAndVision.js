import React from "react";
import { View, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Card, Divider } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CustomBackButton from "../components/ui/CustomBackButton";

const MissionAndVision = () => {
  const navigation = useNavigation();
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
          <Text variant="headlineSmall" style={styles.textStyle}>
            Mission and Vision
          </Text>
          <Text variant="titleSmall" style={styles.subTextStyle}>
            Discover the heart of our congregation through our mission and
            vision.
          </Text>
          <Card style={styles.card}>
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>OUR MISSION</Text>
              <Divider style={styles.divider} />
              <Text style={styles.listItem}>
                Embracing the Vision of the Manila Archdiocesan General Pastoral
                Assembly, we as parishioner of San Roque in obedience to the
                Word of God, to the Teachings of the Catholic Chruch, envision
                an evangeleized and united parish through the guidance of our
                holy patron, San Roque.{"\n"}
              </Text>
              <Text style={styles.listItem}>
                To accomplish the Archdiocesan Vision through the guidance fo
                the Holy Spirit and the intercession fot he Blessed Virgin Mary,
                and the prayers of San Roque, we commit ourselves to:
              </Text>
            </View>
          </Card>
          <Card style={styles.card}>
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>OUR VISION</Text>
              <Divider style={styles.divider} />
              <Text style={styles.listItem}>
                1. Have a meaningful liturgical and devotional celebrations by
                encouraging and making the congregation participate fully in all
                our worship activities.{"\n"}
              </Text>
              <Text style={styles.listItem}>
                2. Realize the programs that establish and build up Basic
                Ecclesial Communities or “Mumunting Kapitbahayang Kristiyano.”
                {"\n"}
              </Text>
              <Text style={styles.listItem}>
                3. Realize formations and teachings relevant to all sectors of
                the parish community.{"\n"}
              </Text>
              <Text style={styles.listItem}>
                4. Implement evangelization programs, especially the PONDO NG
                PINOY, necessarily responding to the needs of the economically
                and scocially-marginalized in the parish.{"\n"}
              </Text>
              <Text style={styles.listItem}>
                5. Support and find ways to finance the on-going physical
                development and maintenance of the San Roque Church.{"\n"}
              </Text>
              <Text style={styles.listItem}>
                6. We also commit ourselves to Jesus Christ, our Lord and
                Savior, to be our model in our daily lives.{"\n"}
              </Text>
            </View>
          </Card>
          <CustomBackButton route="ChurchScreen" />

          {/* <TouchableOpacity onPress={() => navigation.navigate("ChurchScreen")}>
            <Icon name="arrow-left" size={50} color={"#000"} />
          </TouchableOpacity> */}
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

export default MissionAndVision;
