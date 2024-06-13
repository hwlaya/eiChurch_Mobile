import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Card } from "@ui-kitten/components";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import api from "../../config/api";
import { UserContext } from "../providers/UserProvider";
import moment from "moment";

const ReservationIndex = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [reservations, setReservations] = useState(null);

  useEffect(() => {
    api
      .get("reservation/all")
      .then((response) => {
        const reservations = response.data.reservations;
        const userReservations = reservations.filter(
          (reservation) => reservation.user_id.id == user.id
        );
        setReservations(userReservations);
      })
      .catch((error) => {
        console.log(error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get("reservation/all")
        .then((response) => {
          const reservations = response.data.reservations;
          const userReservations = reservations.filter(
            (reservation) => reservation.user_id.id == user.id
          );
          setReservations(userReservations);
        })
        .catch((error) => {
          console.log(error);
        });
    });

    return unsubscribe;
  }, [navigation, user]);

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
            Reservations
          </Text>
          <Button
            size="small"
            onPress={() => navigation.navigate("ReservationScreen")}
          >
            Create Reservation
          </Button>
        </View>

        <View style={{ marginTop: 30 }}>
          {reservations ? (
            <>
              {reservations.map((data, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate("ReservationView", { id: data.id })
                  }
                >
                  <View style={styles.card}>
                    <Text style={styles.title}>
                      Event Type:
                      <Text style={styles.subtitle}> {data.event_type}</Text>
                    </Text>

                    <Text style={styles.title}>
                      Schedule:
                      <Text style={styles.subtitle}>
                        {" "}
                        {moment(
                          data.reservation_schedule,
                          "YYYY-MM-DD h:mm A"
                        ).format("MMM DD, YYYY h:mm A")}
                      </Text>
                    </Text>

                    <Text style={styles.title}>
                      Reservation Status: {""}
                      {data.booking_status == 1 ? (
                        <Text style={{ fontWeight: "normal", color: "green" }}>
                          Confirmed
                        </Text>
                      ) : data.booking_status == 2 ? (
                        <Text style={{ fontWeight: "normal", color: "orange" }}>
                          Pending
                        </Text>
                      ) : (
                        <Text style={{ fontWeight: "normal", color: "red" }}>
                          Cancelled
                        </Text>
                      )}
                    </Text>

                    <Text style={styles.title}>
                      Payment Status: {""}
                      {data.payment.payment_status == 1 ? (
                        <Text style={{ fontWeight: "normal", color: "green" }}>
                          Verified
                        </Text>
                      ) : (
                        <Text style={{ fontWeight: "normal", color: "red" }}>
                          Not Verified
                        </Text>
                      )}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <Card>
              <Text>No reservations available.</Text>
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

export default ReservationIndex;
