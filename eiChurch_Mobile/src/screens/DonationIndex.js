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

const DonationIndex = () => {
  const [donations, setDonations] = useState([]);
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [refreshing, setRefreshing] = useState(false); // State variable for refreshing
  const DEV_URL = "http://192.168.68.115:8000/images/donations";
  const PROD_URL =
    "https://sanroqueparish.com/DataSonicCapstone-main/public/images/donations";

  const fetchDonations = async () => {
    try {
      setRefreshing(true); // Set refreshing to true when fetching data
      const response = await api.get(`/donation/active`);
      const donations = response.data.active_donations;

      setDonations(donations);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setRefreshing(false); // Set refreshing to false when data fetching is done
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Fetch reservations when screen gains focus
      fetchDonations();
    }, [])
  );

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
          {refreshing && (
            <ActivityIndicator size={"small"} style={{ marginBottom: 10 }} />
          )}

          {donations.map((data, index) => (
            <View style={{ marginBottom: 20 }} key={index}>
              <Card>
                <View style={{ height: 200 }}>
                  <Image
                    source={{ uri: `${DEV_URL}/${data.donation_image}` }}
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
                  style={{ fontWeight: "bold", marginBottom: 10, fontSize: 15 }}
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
