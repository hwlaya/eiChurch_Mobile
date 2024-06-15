import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import api from "../../config/api";
import { Button, Card } from "@ui-kitten/components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";
import { UserContext } from "../providers/UserProvider";

const LiveStreamIndex = () => {
  const navigation = useNavigation();
  const [livestreams, setLiveStreams] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    api
      .get("/livestream/getalllivestreams")
      .then((response) => {
        setLiveStreams(response.data);
      })
      .catch((err) => {
        console.log(err);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("/livestream/getalllivestreams")
        .then((response) => {
          setLiveStreams(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <Text variant="headlineSmall" style={styles.textStyle}>
          Live Streams
        </Text>
        <Text variant="titleSmall" style={styles.subTextStyle}>
          Watch Mass Live Here
        </Text>

        <View style={{ marginVertical: 20 }}>
          {livestreams.length != 0 ? (
            <>
              {livestreams.map((live, index) => (
                <Card key={index}>
                  <View style={{ height: 200, marginBottom: 20 }}>
                    <ImageBackground
                      source={require("../assets/images/church.jpg")} // Specify the path to your background image
                      style={{ flex: 1, resizeMode: "contain" }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <Text
                        variant="titleLarge"
                        style={{
                          textAlign: "left",
                          // marginBottom: 15,
                          fontWeight: "bold",
                        }}
                      >
                        {live.livestream_name}
                      </Text>
                      <Text
                        variant="bodyLarge"
                        style={{
                          textAlign: "left",
                          color: "#9ca3af",
                          marginBottom: 15,
                        }}
                      >
                        {moment(live.created_at).format("LL")}
                      </Text>
                      <View
                        style={{
                          backgroundColor: "#C3FBB6",
                          width: 8 * 10,
                          marginBottom: 4,
                          padding: 3,
                        }}
                      >
                        <Text
                          style={{
                            textAlign: "center",
                            color: "#0D6A37",
                            fontSize: 12,
                            fontWeight: "bold",
                          }}
                        >
                          {live.livestream_status}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("LiveStream", {
                          token: user.token,
                          user: user.user,
                          room: live.livestream_name,
                        })
                      }
                    >
                      <Icon name="play-circle" size={60} color={"#3366FF"} />
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </>
          ) : (
            <Card>
              <Text>No live stream available.</Text>
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
});

export default LiveStreamIndex;
