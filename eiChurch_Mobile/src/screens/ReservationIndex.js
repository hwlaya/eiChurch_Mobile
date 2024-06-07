import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import { Text, View } from "react-native";

const ReservationIndex = () => {
  const navigation = useNavigation();
  return (
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
    </View>
  );
};

export default ReservationIndex;
