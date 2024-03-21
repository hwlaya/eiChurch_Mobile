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

const Prayers = () => {
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
            <Image
              source={require("../assets/images/prayer.jpg")}
              style={styles.thumbnail}
            />
            <Text variant="headlineSmall" style={styles.textStyle}>
              Prayers
            </Text>
            <Card style={styles.card}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>
                  Prayer to Affirm Your Hope in God
                </Text>
                <Divider style={styles.divider} />
                <Text style={styles.newsCaption}>
                  O My God, relying on Thy infinite goodness and promises, I
                  hope to obtain pardon of my sins, the help of Thy grace and
                  life everlasting, through the merits of Jesus Christ, my Lord
                  and Redeemer.
                </Text>
              </View>
            </Card>
            <Card style={styles.card}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>Prayer for Peace</Text>
                <Divider style={styles.divider} />
                <Text style={styles.newsCaption}>
                  Lord, make me an instrument of your peace. Where there is
                  hatred, let me sow love;Where there is injury, pardon;Where
                  there is doubt, faith;Where there is despair, hope;Where there
                  is darkness, light; Where there is sadness, joy. O Divine
                  Master, grant that I may not so much seek to be consoled as to
                  console;To be understood as to understand;To be loved as to
                  love. For it is in giving that we receive;It is in pardoning
                  that we are pardoned; And it is in dying that we are born to
                  eternal life.
                </Text>
              </View>
            </Card>
            <Card style={styles.card}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>Prayer for Forgiveness</Text>
                <Divider style={styles.divider} />
                <Text style={styles.newsCaption}>
                  Our Father who is in heaven, uphold the holiness of your name.
                  Bring in your kingdom so that your will is done on earth as
                  it's done in heaven. Give us the bread we need for today.
                  Forgive us for the ways we have wronged you, just as we also
                  forgive those who have wronged us. And don't lead us into
                  temptation, but rescue us from the evil one.
                </Text>
              </View>
            </Card>
            <Card style={styles.card}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>Prayer for Comfort</Text>
                <Divider style={styles.divider} />
                <Text style={styles.newsCaption}>
                  The LORD is my shepherd. I lack nothing. He lets me rest in
                  grassy meadows; he leads me to restful waters; he keeps me
                  alive. He guides me in proper paths for the sake of his good
                  name. Even when I walk through the darkest valley, I fear no
                  danger because you are with me. Your rod and your staff — they
                  protect me. You set a table for me right in front of my
                  enemies. You bathe my head in oil; my cup is so full it spills
                  over! Yes, goodness and faithful love will pursue me all the
                  days of my life, and I will live in the LORD's house as long
                  as I live.
                </Text>
              </View>
            </Card>
            <Card style={styles.card}>
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>Prayer for Gratitude</Text>
                <Divider style={styles.divider} />
                <Text style={styles.newsCaption}>
                  Lord, thank you for your abundant, abounding grace. Thank you
                  that we don't have to earn a drop of the mighty river of grace
                  that flows freely for us today. Thank you for the unexpected,
                  unmerited favor you've showered on my life. Help me put myself
                  in the path of your love and grace. Help me not neglect the
                  disciplines I need to meet with you regularly and to drink
                  from the water of life. Thank you for your rich love. Amen.
                </Text>
              </View>
            </Card>
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
