import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, Alert, ScrollView, Text, View } from "react-native";
import CustomListHeader from "../components/ui/CustomListHeader";
import CustomListItem from "../components/ui/CustomListItem";
import { Button } from "@ui-kitten/components";
import CustomBackButton from "../components/ui/CustomBackButton";
import api from "../../config/api";
import moment from "moment";

const ReservationView = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [reservation, setReservation] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`viewReservationMobile/${id}`)
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        Alert.alert("Error", "Error fetching reservation");
        console.log("Error fetching reservation:", error);
      });

    const unsubscribe = navigation.addListener("focus", () => {
      api
        .get(`viewReservationMobile/${id}`)
        .then((response) => {
          setReservation(response.data);
        })
        .catch((error) => {
          Alert.alert("Error", "Error fetching reservation");
          console.log("Error fetching reservation:", error);
        });
    });
    return unsubscribe;
  }, [navigation, id]);

  return (
    <ScrollView>
      <View style={{ padding: 20 }}>
        <View
          style={{
            width: "100%",
            padding: 10,
            borderWidth: 0.4,
            borderColor: "#ccc",
          }}
        >
          {reservation ? (
            <>
              <CustomListHeader title="Personal Information" />
              <CustomListItem title="Reservation ID" value={id} />
              <CustomListItem
                title="Name of Registrant"
                value={reservation.user_id.name}
              />
              {reservation.event_type == "Sacrament" && (
                <>
                  <CustomListItem
                    title="Name of Applicant"
                    value={reservation.name_of_applicant}
                  />
                  <CustomListItem
                    title="Date of Birth"
                    value={reservation.date_of_birth}
                  />
                </>
              )}

              <CustomListHeader title="Event Details" />
              <CustomListItem
                title="Date of Reservation"
                value={moment(
                  reservation.reservation_schedule,
                  "YYYY-MM-DD h:mm A"
                ).format("LL")}
              />
              <CustomListItem
                title="Time of Reservation"
                value={moment(
                  reservation.reservation_schedule,
                  "YYYY-MM-DD h:mm A"
                ).format("h:mm A")}
              />
              {reservation.event_type == "Sacrament" ? (
                <CustomListItem
                  title="Reserved Sacrament"
                  value={reservation.sacrament.sacrament}
                />
              ) : (
                <>
                  <CustomListItem
                    title="Event Name"
                    value={reservation.event_name}
                  />
                  <CustomListItem
                    title="Event Name"
                    value={reservation.event_facilitator}
                  />
                </>
              )}
              <CustomListItem
                title="Reservation Status"
                value={
                  reservation.booking_status == 1
                    ? "Confirmed"
                    : reservation.booking_status == 2
                    ? "Pending"
                    : "Cancelled"
                }
              />

              <CustomListHeader title="Payment Details" />
              <CustomListItem
                title="Fee"
                value={reservation.payment.total_price}
              />
              <CustomListItem
                title="Payment Type"
                value={reservation.payment.payment_type}
              />
              <CustomListItem
                title="Payement Status"
                value={
                  reservation.payment.payment_status == 1
                    ? "Verified"
                    : "Unverified"
                }
              />
            </>
          ) : (
            <Text>No reservation details available.</Text>
          )}
        </View>
        <CustomBackButton route="ReservationIndex" />
      </View>
    </ScrollView>
  );
};

export default ReservationView;
