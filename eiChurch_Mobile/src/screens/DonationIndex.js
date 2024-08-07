import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Card } from "@ui-kitten/components";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../config/api";
import { UserContext } from "../providers/UserProvider";
import moment from "moment";
import { FILE_PATH } from "../../config/directory";

const DonationIndex = () => {
  const [donations, setDonations] = useState(null);
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  useEffect(() => {
    api
      .get("donation/active")
      .then((response) => {
        setDonations(response.data.active_donations);
      })
      .catch((error) => {
        console.log(error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("donation/active")
        .then((response) => {
          setDonations(response.data.active_donations);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontFamily: "Montserrat-Bold", fontSize: 20 }}>
            Donations
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          {donations ? (
            <>
              {donations.map((data, index) => (
                <View style={{ marginBottom: 20 }} key={index}>
                  <Card>
                    <View style={{ height: 200, marginBottom: 20 }}>
                      <Image
                        source={{
                          uri: `${FILE_PATH}/donations/${data.donation_image}`,
                        }}
                        style={{ flex: 1, resizeMode: "contain" }}
                      />
                    </View>
                    <View
                      style={{
                        backgroundColor: "#E1EFFE",
                        width: data.donation_type.length * 10,
                        marginBottom: 4,
                        padding: 3,
                      }}
                    >
                      <Text
                        style={{
                          textAlign: "center",
                          color: "#1e429f",
                          fontSize: 12,
                          fontWeight: "bold",
                        }}
                      >
                        {data.donation_type}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontWeight: "bold",
                        marginBottom: 10,
                        fontSize: 15,
                      }}
                    >
                      {data.donation_title}
                    </Text>
                    <Text style={{ textAlign: "justify" }}>
                      {data.donation_content}
                    </Text>

                    <Button
                      style={{ marginTop: 10 }}
                      onPress={() =>
                        navigation.navigate("DonationCreate", {
                          id: data.id,
                        })
                      }
                    >
                      Donate
                    </Button>
                  </Card>
                </View>
              ))}
            </>
          ) : (
            <Card>
              <Text>No donations available.</Text>
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#3366FF",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
  },
  subtitle: {
    fontWeight: "normal",
  },
});

export default DonationIndex;
