import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";
import { Button, Card, Divider } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import CustomBackButton from "../components/ui/CustomBackButton";
import api from "../../config/api";
import { FILE_PATH } from "../../config/directory";

const Accomplishments = () => {
  const navigation = useNavigation();
  const [accomplishments, setAccomplishments] = useState(null);

  useEffect(() => {
    api
      .get("accomplishment/all")
      .then((response) => {
        setAccomplishments(response.data.accomplishments);
      })
      .catch((err) => {
        Alert.alert("Error!", "Error fetching accomplishments");
        console.log(err);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("accomplishment/all")
        .then((response) => {
          setAccomplishments(response.data.accomplishments);
        })
        .catch((err) => {
          Alert.alert("Error!", "Error fetching accomplishments");
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
            <Text variant="headlineSmall" style={styles.textStyle}>
              Accomplishments
            </Text>
            <Text variant="titleSmall" style={styles.subTextStyle}>
              Explore the remarkable achievements of our community, a testament
              to our shared dedication, resilience, and commitment to our values
            </Text>

            {accomplishments ? (
              <>
                {accomplishments.map((data, index) => (
                  <View style={{ marginBottom: 20 }} key={index}>
                    <Card>
                      <View style={{ height: 200, marginBottom: 20 }}>
                        <Image
                          source={{
                            uri: `${FILE_PATH}/accomplishments/${data.accomplishment_image}`,
                          }}
                          style={{ flex: 1, resizeMode: "contain" }}
                        />
                      </View>
                      <Text
                        variant="titleLarge"
                        style={{ textAlign: "center", marginBottom: 20 }}
                      >
                        {data.accomplishment_title}
                      </Text>
                      <Button
                        size="small"
                        onPress={() => {
                          navigation.navigate("AccomplishmentView", {
                            id: data.id,
                          });
                        }}
                      >
                        View
                      </Button>
                    </Card>
                  </View>
                ))}
              </>
            ) : (
              <Text>No accomplishments available.</Text>
            )}
          </View>

          <CustomBackButton route="ChurchScreen" />
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

export default Accomplishments;
