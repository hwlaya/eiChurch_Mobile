import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { Text, ProgressBar, TextInput, Divider } from "react-native-paper";
import { Datepicker, Select, SelectItem, Card } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import Header from "../components/Header";
import api from "../../config/api";

const ReservationScreen = () => {
  const navigation = useNavigation();

  const [progress, setProgress] = useState(0.25);
  const [page, setPage] = useState(1);

  const { user } = useContext(UserContext);
  const [registrantName, setRegistrantName] = useState(user ? user.name : "");
  const [applicantName, setApplicantName] = useState("");
  const [selectedDateDOB, setSelectedDateDOB] = useState(null);

  const [sacraments, setSacraments] = useState([]);
  const [selectedSacrament, setSelectedSacrament] = useState("");
  const [selectedDateSR, setSelectedDateSR] = useState(null);
  const [selectedTimeSR, setSelectedTimeSR] = useState(null);
  const [timePickerVisible, setTimePickerVisible] = useState(false);

  const [sacramentFee, setSacramentFee] = useState(0);

  const [requirementImageStatus, setRequirementImageStatus] = useState(false);
  const [requirementImageUri, setRequirementImageUri] = useState("");
  const [requirementImageName, setRequirementImageName] = useState("");

  const [paymentImageStatus, setPaymentImageStatus] = useState(false);
  const [paymentImageUri, setPaymentImageUri] = useState("");
  const [paymentImageName, setPaymentImageName] = useState("");
  const minDateSR = new Date();
  minDateSR.setDate(minDateSR.getDate() + 3);

  useEffect(() => {
    api
      .get(`sacraments/all`)
      .then((response) => {
        setSacraments(response.data.sacraments);
        // console.log(response.data.sacraments);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    // Update sacrament fee when selected sacrament changes
    if (selectedSacrament) {
      const selectedSacramentData = sacraments.find(
        (sacrament) => sacrament.id === selectedSacrament
      );
      if (selectedSacramentData) {
        setSacramentFee(selectedSacramentData.fee);
      }
    }
  }, [selectedSacrament, sacraments]);
  const pickRequirementImage = async () => {
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
      setRequirementImageUri(result.assets[0].uri);
      const uriParts = result.assets[0].uri.split("/");
      const filename = uriParts[uriParts.length - 1];
      setRequirementImageName(filename);
      setRequirementImageStatus(true);
    }
  };
  const pickPaymentImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [2, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setPaymentImageUri(result.assets[0].uri);
      const uriParts = result.assets[0].uri.split("/");
      const filename = uriParts[uriParts.length - 1];
      setPaymentImageName(filename);
      setPaymentImageStatus(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        logoSource={require("../assets/images/church_icon.png")}
        title="eiChurch"
        subtitle="San Roque Parish Church"
      />
      <ImageBackground
        source={require("../assets/images/background5.jpg")}
        style={styles.backgroundImage}
      >
        <ProgressBar
          color="blue"
          animatedValue={progress}
          style={{ backgroundColor: "#FFF" }}
        />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {page === 1 ? (
            <View style={styles.bodyContainer}>
              <Text style={styles.title}>Create a Reservation</Text>
              <Text style={styles.subtitle}>Personal Information</Text>
              <View />
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.textInput}
                  label={"Name of Registrant"}
                  outlineStyle={{ borderRadius: 10 }}
                  value={registrantName}
                  onChangeText={setRegistrantName}
                  mode="outlined"
                  editable={false}
                />
                <TextInput
                  style={styles.textInput}
                  label={"Name of Applicant"}
                  value={applicantName}
                  onChangeText={setApplicantName}
                  outlineStyle={{ borderRadius: 10 }}
                  mode="outlined"
                />
                <Datepicker
                  label={"Date of Birth"}
                  placeholder={"Pick Date"}
                  date={selectedDateDOB}
                  onSelect={(date) => setSelectedDateDOB(date)}
                  min={new Date(1900, 0, 1)} // Set min date to January 1, 1900
                  max={new Date()} // Set max date to today
                  style={styles.textInput}
                />
              </View>
              <TouchableOpacity
                onPress={() => navigation.navigate("ProfileScreen")}
                style={{
                  position: "absolute",
                  left: 10,
                  bottom: -270,
                }}
              >
                <Icon name="arrow-left" size={24} color={"#FFF"} />
              </TouchableOpacity>
            </View>
          ) : page === 2 ? (
            <View style={styles.bodyContainer}>
              <Text style={styles.title}>Create a Reservation</Text>
              <Text style={styles.subtitle}>Event Details</Text>
              <View style={styles.inputFieldContainer}>
                <Select
                  label={"Choose a Sacrament"}
                  style={styles.textInput}
                  value={selectedSacrament}
                  onSelect={(index) => {
                    const selected = sacraments[index - 1].id;
                    console.log("Selected Sacrament:", selected);
                    setSelectedSacrament(selected);
                  }}
                >
                  {sacraments.map((sacrament, index) => (
                    <SelectItem key={index} title={sacrament.sacrament} />
                  ))}
                </Select>
                <Datepicker
                  label={"Schedule of Reservation"}
                  placeholder={"Pick Date"}
                  date={selectedDateSR}
                  onSelect={(nextDate) => setSelectedDateSR(nextDate)}
                  min={minDateSR}
                  style={styles.textInput}
                />
                <TouchableOpacity
                  onPress={() => {
                    setTimePickerVisible(true);
                  }}
                  style={{ marginTop: 10 }}
                >
                  <Text
                    category="label"
                    appearance="hint"
                    style={{
                      fontSize: 13,
                      fontWeight: "bold",
                      color: "#9eaaad",
                    }}
                  >
                    Choose a Time
                  </Text>
                  <View style={styles.timeInput}>
                    <Text style={{ fontSize: 16 }}>{selectedTimeSR}</Text>
                  </View>
                </TouchableOpacity>
                {timePickerVisible && (
                  <DateTimePicker
                    mode="time"
                    value={new Date()}
                    is24Hour={false}
                    minimumDate={moment().set({ hour: 9, minute: 0 }).toDate()}
                    maximumDate={moment().set({ hour: 16, minute: 0 }).toDate()}
                    style={{
                      width: 500,
                      opacity: 1,
                      height: 30,
                      marginTop: 50,
                    }}
                    onChange={(e, date) => {
                      if (e.type === "set") {
                        setSelectedTimeSR(moment(date).format("hh:mm A"));
                        setTimePickerVisible(false);
                      } else {
                        setTimePickerVisible(false);
                      }
                    }}
                  />
                )}
                <View style={styles.uploadPhotoContainer}>
                  <Text
                    category="label"
                    appearance="hint"
                    style={styles.requirementText}
                  >
                    Attach the Requirements
                  </Text>
                  <TouchableOpacity
                    style={styles.uploadPhotoPlaceholder}
                    onPress={pickRequirementImage}
                  >
                    <>
                      <MaterialIcons
                        name="cloud-upload"
                        size={30}
                        color="white"
                      />
                      <Text variant="bodySmall" style={{ color: "#aeaeae" }}>
                        UPLOAD FILE
                      </Text>
                    </>
                  </TouchableOpacity>
                  {requirementImageUri && (
                    <Image
                      source={{ uri: requirementImageUri }}
                      style={{ width: 360, height: 400 }}
                    />
                  )}
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.bodyContainer}>
              <Text style={styles.title}>Create a Reservation</Text>
              <Text style={styles.subtitle}>Reservation Summary</Text>
              {/* <View style={styles.cardContainer}> */}
              <Card style={styles.card}>
                <View style={styles.cardContainer}>
                  {/* Personal Details */}
                  <Text style={styles.cardText}>Personal Details</Text>
                  <Divider style={styles.divider} />
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>Name of Registrant</Text>
                    <Text style={styles.detail2Text}>{registrantName}</Text>
                  </View>
                  <Divider style={styles.dividerDetails} />
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>Name of Applicant</Text>
                    <Text style={styles.detail2Text}>{applicantName}</Text>
                  </View>
                  <Divider style={styles.dividerDetails} />
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailDOBText}> Date of Birth</Text>
                    <Text style={styles.detail2Text}>
                      {moment(selectedDateDOB).format("LL").toString()}
                    </Text>
                  </View>
                  <Divider style={styles.dividerDetails} />
                  {/* Event Details */}
                  <Text style={styles.cardText}>Event Details</Text>
                  <Divider style={styles.divider} />
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>Reserved Sacrament</Text>
                    <Text style={styles.detail2Text}>{selectedSacrament}</Text>
                  </View>
                  <Divider style={styles.dividerDetails} />
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailText}>Date of Reservation</Text>
                    <Text style={styles.detail2Text}>
                      {moment(selectedDateSR).format("LL").toString()}
                    </Text>
                  </View>
                  <Divider style={styles.dividerDetails} />
                  <View style={styles.detailContainer}>
                    <Text style={styles.detailText}> Time of Reservation</Text>
                    <Text style={styles.detail2Text}>{selectedTimeSR}</Text>
                  </View>
                  <Divider style={styles.dividerDetails} />
                  <Text style={styles.detailText}> Requirements</Text>
                  <Text style={styles.detail2Text}>
                    {" "}
                    {requirementImageUri ? (
                      <Text style={styles.detail2Text}>
                        {requirementImageName}
                      </Text>
                    ) : (
                      <Text style={styles.detail2Text}>No image selected</Text>
                    )}
                  </Text>
                  <Divider style={styles.dividerDetails} />
                  {/* Payment Details */}
                  <Text style={styles.cardText}>Payment Details</Text>
                  <Divider style={styles.divider} />
                  <Text style={styles.detailText}> Fee</Text>
                  <Text style={styles.detail2Text}>₱ {sacramentFee}</Text>
                  <Divider style={styles.dividerDetails} />
                </View>
              </Card>
              <View style={styles.uploadPhotoContainer}>
                <Text
                  category="label"
                  appearance="hint"
                  style={styles.requirementText}
                >
                  Attach Payment
                </Text>
                <TouchableOpacity
                  style={styles.uploadPhotoPlaceholder}
                  onPress={pickPaymentImage}
                >
                  <>
                    <MaterialIcons
                      name="cloud-upload"
                      size={30}
                      color="white"
                    />
                    <Text variant="bodySmall" style={{ color: "#aeaeae" }}>
                      UPLOAD FILE
                    </Text>
                  </>
                </TouchableOpacity>
                {paymentImageUri && (
                  <Image
                    source={{ uri: paymentImageUri }}
                    style={{ width: 300, height: 500 }}
                  />
                )}
              </View>
            </View>
          )}
        </ScrollView>
        {/* BUTTON NAVIGATOR */}
        <View style={styles.buttonNavigatorContainer}>
          <TouchableOpacity
            style={styles.navigationBack}
            onPress={() => {
              if (progress === 0.25) {
                Alert.alert("Warning!", "Already at the first page!");
              } else {
                let tempProgress = progress;
                tempProgress = tempProgress - 0.25;
                setPage(page - 1);
                setProgress(tempProgress);
              }
            }}
          >
            <Icon name="chevron-left" size={20} color={"#fff"} />
            <Text style={{ color: "#fff" }}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationNext}
            onPress={() => {
              if (page === 3) {
                const reservationDateTime = `${moment(selectedDateSR).format(
                  "YYYY-MM-DD"
                )} ${selectedTimeSR}`;
                let requirementImage = {
                  uri: requirementImageUri,
                  type: "multipart/form-data",
                  name: requirementImageName,
                };
                let paymentImage = {
                  uri: paymentImageUri,
                  type: "multipart/form-data",
                  name: paymentImageName,
                };

                // const formdata = new FormData();
                // formdata.append("user_id", user.id);
                // formdata.append("name_of_applicant", applicantName);
                // formdata.append(
                //   "date_of_birth",
                //   moment(selectedDateDOB).format("LL")
                // );
                // formdata.append("sacrament", selectedSacrament);
                // formdata.append("reservation_schedule", reservationDateTime);
                // formdata.append("requirement_images[]", requirementImage);
                // formdata.append("total_price", sacramentFee);
                // formdata.append("payment_image", paymentImage);

                // console.log("Form Data:", formdata);

                api
                  .post(`reservation/create`, {
                    user_id: user.id,
                    name_of_applicant: applicantName,
                    date_of_birth: moment(selectedDateDOB).format("LL"),
                    sacrament: selectedSacrament,
                    reservation_schedule: reservationDateTime,
                    // requirement_images: [requirementImage],
                    total_price: sacramentFee,
                    // payment_image: paymentImage,
                  })
                  .then((response) => {
                    Alert.alert("Success", "Reservation created successfully!");
                    navigation.navigate("HomeScreen");
                    console.log(response);
                  })
                  .catch((err) => {
                    Alert.alert("Error", "Failed to create reservation");
                    console.log("errorzz", err.response);
                  });

                // try {
                //   const response = await api.post(
                //     `reservation/create`,
                //     formdata
                //   );
                //   console.log(response);
                //   Alert.alert("Success", "Reservation created successfully!");
                //   navigation.navigate("HomeScreen");
                // } catch (err) {
                //   console.log("errorzz", err.response);
                //   Alert.alert("Error", "Failed to create reservation");
                // }
              } else {
                let tempProgress = progress;
                tempProgress = tempProgress + 0.25;
                setPage(page + 1);
                setProgress(tempProgress);
              }

              if (page === 1) {
                let date = moment(selectedDateSR).format("YYYY-MM-DD");

                const time = moment(selectedTimeSR, "hh:mm A").format(
                  "hh:mm:ss"
                );
                const datetime = `${date}T${time}`; //ISO
              }
            }}
          >
            <Text style={{ color: "#fff" }}>
              {page == 3 ? "Submit" : "Next"}
            </Text>
            <Icon name="chevron-right" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
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
    padding: 12,
  },
  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat-Medium",
    fontSize: 32,
    alignSelf: "flex-start",
  },
  subtitle: {
    marginBottom: 8,
    fontFamily: "Montserrat-Light",
    fontSize: 16,
    alignSelf: "flex-start",
    paddingHorizontal: 20,
  },
  inputFieldContainer: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginRight: "1%",
  },
  textInput: {
    marginBottom: 16,
    width: 360,
  },
  uploadPhotoContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    marginTop: 20,
  },
  requirementText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#9eaaad",
    textAlign: "left",
    alignSelf: "flex-start",
  },
  uploadPhotoPlaceholder: {
    margin: 20,
    borderWidth: 1,
    height: 50,
    width: 330,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#aeaeae",
    backgroundColor: "#1976d2",
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#dde1eb",
    backgroundColor: "#edf0f4",
    borderRadius: 3,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: 360,
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    width: 350,
    height: 550,
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    marginBottom: 1,
    fontFamily: "Montserrat-Black",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  divider: {
    marginTop: 1,
    marginBottom: 10,
    backgroundColor: "#000",
    color: "#949494",
    width: 50,
    height: 2,
    alignSelf: "flex-start",
  },
  detailContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "flex-start",
  },
  detailText: {
    marginBottom: 8,
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    alignSelf: "flex-start",
    paddingRight: 60,
  },
  detail2Text: {
    marginBottom: 8,
    fontFamily: "Montserrat-Regular",
    alignSelf: "center",
    // paddingRight: 80,
    marginLeft: 20,
  },
  detailDOBText: {
    marginBottom: 8,
    fontFamily: "Montserrat-Bold",
    fontSize: 14,
    alignSelf: "flex-start",
    paddingRight: 80,
  },
  dividerDetails: {
    marginVertical: 10,
    backgroundColor: "#000",
    color: "#949494",
    width: 300,
    height: 1,
  },
  buttonNavigatorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 20,
  },
  navigationBack: {
    backgroundColor: "#dc3545",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  navigationNext: {
    backgroundColor: "#198754",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default ReservationScreen;
