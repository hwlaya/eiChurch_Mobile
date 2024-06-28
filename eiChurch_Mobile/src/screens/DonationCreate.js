import { useNavigation, useRoute } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CustomBackButton from "../components/ui/CustomBackButton";
import { Button, Card, Input } from "@ui-kitten/components";
import { useEffect, useState } from "react";
import api from "../../config/api";
import * as ImagePicker from "expo-image-picker";
import { FILE_PATH } from "../../config/directory";
import Loading from "../components/Loading";

const DonationCreate = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params;
  const [donation, setDonation] = useState(null);
  const [donationFee, setDonationFee] = useState("");
  const [donationPayment, setDonationPayment] = useState([]);
  const [donationPaymentUri, setDonationPaymentUri] = useState("");

  const [donationContent, setDonationContent] = useState("");
  const [donationProof, setDonationProof] = useState([]);
  const [donationProofUri, setDonationProofUri] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/donation/all").then((response) => {
      const donations = response.data.donations;
      const donationId = donations.filter((donation) => donation.id == id);

      console.log(`eto yung donation id: ${donationId}`);
      setDonation(donationId[0]);
    });
    resetForm();

    const unsubscribe = navigation.addListener("focus", () => {
      api.get("/donation/all").then((response) => {
        const donations = response.data.donations;
        const donationId = donations.filter((donation) => donation.id == id);

        console.log(`eto yung donation id: ${donationId}`);
        setDonation(donationId[0]);
      });
      resetForm();
    });

    return unsubscribe;
  }, [navigation, id]);

  const pickDonationPayment = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [2, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("result:", result.assets[0]);
      const image = {
        uri: result.uri,
        type: "image/jpeg",
        name: "image.jpg",
      };
      setDonationPayment(image);
      setDonationPaymentUri(result.assets[0].uri);
    }
  };

  const pickDonationProof = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [2, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("result:", result.assets[0]);
      const image = {
        uri: result.uri,
        type: "image/jpeg",
        name: "image.jpg",
      };
      setDonationProof(image);
      setDonationProofUri(result.assets[0].uri);
    }
  };

  const resetForm = () => {
    setDonationFee("");
    setDonationPayment([]);
    setDonationPaymentUri("");
    setDonationContent("");
    setDonationProof([]);
    setDonationProofUri("");
  };

  const handleSubmit = () => {
    if (donation.donation_type == "Monetary" && donationFee == "") {
      Alert.alert("Error", "The donation fee field is required!");
    } else if (
      donation.donation_type == "Monetary" &&
      !/^\d*$/.test(donationFee)
    ) {
      Alert.alert("Error", "The donation fee field should be a number!");
    } else if (
      donation.donation_type == "Monetary" &&
      donationPayment.length == 0
    ) {
      Alert.alert("Error", "Upload the screenshot of your donation!");
    } else if (
      donation.donation_type == "Non-monetary" &&
      donationContent == ""
    ) {
      Alert.alert("Error", "The donation content field is required!");
    } else if (
      donation.donation_type == "Non-monetary" &&
      donationProof.length == 0
    ) {
      Alert.alert("Error", "Upload a proof of your donation!");
    } else {
      setLoading(true);

      const formdata = new FormData();

      formdata.append("donation_id", id);

      if (donation.donation_type == "Monetary") {
        formdata.append("donation_fee", donationFee);
        formdata.append("payment_image", donationPayment);
      } else {
        formdata.append("donation_non_monetary_content", donationContent);
        formdata.append("donation_non_monetary_image", donationProof);
      }

      console.log(`Donation formdata:`);
      console.log(formdata);

      api
        .post(`/donation/payment/create`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          Alert.alert("Success", "Donation submitted successfully!");
          resetForm();
          navigation.navigate("DonationIndex");
        })
        .catch((err) => {
          console.log(err);
          Alert.alert(
            "Error",
            "There was an error in submitting your donation!"
          );
        })
        .finally(() => {
          setLoading(false); // Set loading to false when submission ends
        });
    }
  };

  const handleOnlinePayment = () => {
    if (donation.donation_type == "Monetary" && donationFee == "") {
      Alert.alert("Error", "The donation fee field is required!");
    } else if (
      donation.donation_type == "Monetary" &&
      !/^\d*$/.test(donationFee)
    ) {
      Alert.alert("Error", "The donation fee field should be a number!");
    } else if (donationFee < 20) {
      Alert.alert("Error", "The minimum donation fee is P20!");
    } else if (donationFee > 100000) {
      Alert.alert(
        "Error",
        "The maximum donation fee is P100,000 per transaction!"
      );
    } else {
      navigation.navigate("DonationWebView", {
        id: id,
        amount: donationFee,
      });
    }
  };

  return (
    <ScrollView>
      <View style={{ flex: 1, padding: 20 }}>
        <Loading loading={loading} />

        <Card>
          {donation ? (
            <>
              <View>
                <View style={{ height: 200, marginBottom: 20 }}>
                  <Image
                    source={{
                      uri: `${FILE_PATH}/donations/${donation.donation_image}`,
                    }}
                    style={{ flex: 1, resizeMode: "contain" }}
                  />
                </View>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    fontSize: 15,
                  }}
                >
                  {donation.donation_title}
                </Text>
                <Text style={{ textAlign: "justify" }}>
                  {donation.donation_content}
                </Text>
                <View
                  style={{
                    backgroundColor: "#eee",
                    padding: 0.5,
                    width: "100%",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                ></View>

                <View>
                  <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
                    Other Information:
                  </Text>

                  <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
                    Start Date:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {donation.donation_start_date}
                    </Text>
                  </Text>

                  <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
                    End Date:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {donation.donation_end_date}
                    </Text>
                  </Text>

                  <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
                    Contact Person:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {donation.donation_contact_person}
                    </Text>
                  </Text>

                  <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
                    Beneficiary:{" "}
                    <Text style={{ fontWeight: "normal" }}>
                      {donation.donation_beneficiary}
                    </Text>
                  </Text>
                  {donation.dropoff != null && (
                    <Text style={{ fontWeight: "bold", marginVertical: 5 }}>
                      Dropoff:{" "}
                      <Text style={{ fontWeight: "normal" }}>
                        {donation.donation_dropoff}
                      </Text>
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    backgroundColor: "#eee",
                    padding: 0.5,
                    width: "100%",
                    marginTop: 10,
                    marginBottom: 10,
                  }}
                ></View>

                {donation.donation_type == "Monetary" && (
                  <>
                    <Input
                      label={"Donation Fee"}
                      value={donationFee}
                      onChangeText={setDonationFee}
                      style={{ marginBottom: 10 }}
                    />

                    {/* <Button
                      onPress={pickDonationPayment}
                      style={{ marginBottom: 10 }}
                    >
                      Upload Payment
                    </Button>

                    {donationPaymentUri && (
                      <View style={{ height: 200 }}>
                        <Image
                          source={{ uri: donationPaymentUri }}
                          style={{ flex: 1, resizeMode: "contain" }}
                        />
                      </View>
                    )} */}
                  </>
                )}

                {donation.donation_type == "Non-monetary" && (
                  <>
                    <Input
                      label={"Donation Content"}
                      value={donationContent}
                      onChangeText={setDonationContent}
                      style={{ marginBottom: 10 }}
                      caption="Please provide a brief description of what you donated and what we will receive."
                      multiline={true}
                    />

                    <Button
                      onPress={pickDonationProof}
                      style={{ marginBottom: 10 }}
                    >
                      Upload Donation Proof
                    </Button>

                    {donationProofUri && (
                      <View style={{ height: 200 }}>
                        <Image
                          source={{ uri: donationProofUri }}
                          style={{ flex: 1, resizeMode: "contain" }}
                        />
                      </View>
                    )}
                  </>
                )}
              </View>
            </>
          ) : (
            <Text>No donation details available.</Text>
          )}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <CustomBackButton route="DonationIndex" />
            {(donation && donation.donation_type) == "Non-monetary" && (
              <Button size="small" onPress={handleSubmit}>
                Donate
              </Button>
            )}
            {(donation && donation.donation_type) == "Monetary" && (
              <Button size="small" onPress={handleOnlinePayment}>
                Donate
              </Button>
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
  },
});

export default DonationCreate;
