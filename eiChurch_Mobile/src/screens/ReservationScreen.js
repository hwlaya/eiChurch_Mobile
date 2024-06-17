import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Text, ProgressBar, TextInput, Divider } from "react-native-paper";
import {
  Datepicker,
  Select,
  SelectItem,
  Card,
  Input,
  Layout,
  List,
  ListItem,
  Button,
} from "@ui-kitten/components";
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
import CustomListHeader from "../components/ui/CustomListHeader";
import CustomListItem from "../components/ui/CustomListItem";

const ReservationScreen = () => {
  const navigation = useNavigation();

  const [progress, setProgress] = useState(0.25);
  const [page, setPage] = useState(1);

  const { user } = useContext(UserContext);
  // const [registrantName, setRegistrantName] = useState(user ? user.name : "");
  const [applicantName, setApplicantName] = useState("");
  const [selectedDateDOB, setSelectedDateDOB] = useState(null);

  const [sacraments, setSacraments] = useState([]);
  const [selectedSacrament, setSelectedSacrament] = useState("");
  const [selectedDateSR, setSelectedDateSR] = useState(null);

  const [requirementImageStatus, setRequirementImageStatus] = useState(false);
  const [requirementImageUri, setRequirementImageUri] = useState("");
  const [requirementImageName, setRequirementImageName] = useState("");

  const [paymentImageStatus, setPaymentImageStatus] = useState(false);
  const [paymentImageUri, setPaymentImageUri] = useState("");
  const [paymentImageName, setPaymentImageName] = useState("");
  const minDateSR = new Date();
  minDateSR.setDate(minDateSR.getDate() + 7);

  const eventTypeList = ["Sacrament", "Service Mass", "Blessing", "Other"];
  const timeList = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];
  const baptismalReqs = [
    "Registered Birth Certificate (original & photocopy)",
    "Marriage Certificate (if the parents are married)",
  ];

  const marriageReqs = [
    "Baptismal Certificate (both parties)",
    "Confirmation Certificate (both parties)",
    "Marriage License",
    "Copy of the Civil Marriage Certificate",
  ];

  const communionReqs = [
    "Photocopy of Baptismal Certificate",
    "Photocopy of Birth Certificate",
  ];

  const paymentTypes = [
    {
      id: "ovc",
      title: "Over the counter",
    },
    {
      id: "op",
      title: "Online Payment",
    },
  ];
  const [selectedEventType, setSelectedEventType] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventFacilitator, setEventFacilitator] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [sacramentDetails, setSacramentDetails] = useState([]); // store the sacrament from the sacrament field
  const [availableTime, setAvailableTime] = useState([]);
  const [selectedRequirementImage, setSelectedRequirementImage] = useState([]);
  const [selectedPaymentImage, setSelectedPaymentImage] = useState([]);
  const [paymentType, setPaymentType] = useState("");
  const [loading, setLoading] = useState(false);

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
      const sacramentDetails = sacraments.find(
        (sacrament) => sacrament.sacrament === selectedSacrament
      );
      setSacramentDetails(sacramentDetails);
    }
  }, [selectedSacrament]);

  useEffect(() => {
    api
      .get(`/reservation/getAllReservedTime/`, {
        params: {
          date: moment(selectedDateSR).format("YYYY-MM-DD"),
        },
      })

      .then((response) => {
        const reservedTime = response.data.reserved_time;

        console.log(reservedTime);
        const availableTime = timeList.filter(
          (time) => !reservedTime.includes(time)
        );
        setAvailableTime(availableTime);
      })
      .catch((err) => {
        console.log(err);
      });

    setEventTime("");
  }, [selectedDateSR]);

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
      const image = {
        uri: result.uri,
        type: "image/jpeg",
        name: "image.jpg",
      };
      setSelectedRequirementImage(image);
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
      const image = {
        uri: result.uri,
        type: "image/jpeg",
        name: "image.jpg",
      };
      setSelectedPaymentImage(image);
      setPaymentImageUri(result.assets[0].uri);
      const uriParts = result.assets[0].uri.split("/");
      const filename = uriParts[uriParts.length - 1];
      setPaymentImageName(filename);
      setPaymentImageStatus(true);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const reservationDateTime = `${moment(selectedDateSR).format(
      "YYYY-MM-DD"
    )} ${eventTime}`;

    const selectedPayment = paymentType == "Online Payment" ? "op" : "ovc";

    const formdata = new FormData();
    formdata.append("user_id", user.id);
    formdata.append("reservation_schedule", reservationDateTime);
    formdata.append("event_type", selectedEventType);

    if (selectedEventType == "Sacrament") {
      // sacrament
      formdata.append("name_of_applicant", applicantName);
      formdata.append(
        "date_of_birth",
        moment(selectedDateDOB).format("YYYY-MM-DD")
      );
      formdata.append("sacrament", sacramentDetails.id);
      // formdata.append("requirement_images[]", requirementImage);
      formdata.append("mobile_requirement_images", selectedRequirementImage); // will only work if the foreach is not implemented in backend
      formdata.append("total_price", sacramentDetails.fee);
    } else {
      // event
      formdata.append("event_name", eventName);
      formdata.append("event_facilitator", eventFacilitator);

      formdata.append("total_price", "100");
    }

    if (selectedPayment == "op") {
      formdata.append("payment_image", selectedPaymentImage);
    }

    formdata.append("payment_type", selectedPayment);
    console.log("Form Data:", formdata);

    api
      .post(`reservation/create`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        Alert.alert("Success", "Reservation created successfully!");
        navigation.navigate("ReservationIndex");
        resetForm();
        console.log(response);
      })
      .catch((err) => {
        Alert.alert("Error", "Failed to create reservation");
        console.log("errorzz", err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false when submission ends
      });
  };

  const handleNext = () => {
    // if (page == 3) {
    //   handleSubmit();
    // } else {
    //   let tempProgress = progress;
    //   tempProgress = tempProgress + 0.25;
    //   setPage(page + 1);
    //   setProgress(tempProgress);
    // }
    if (page == 1) {
      if (selectedEventType == "") {
        Alert.alert("Error!", "The event type field is required!");
      } else if (selectedEventType == "Sacrament" && selectedSacrament == "") {
        Alert.alert("Error!", "The sacrament field is required!");
      } else {
        let tempProgress = progress;
        tempProgress = tempProgress + 0.25;
        setPage(page + 1);
        setProgress(tempProgress);
      }
    } else if (page == 2) {
      if (selectedEventType == "Sacrament") {
        if (applicantName == "") {
          Alert.alert("Error!", "The name of applicant field is required!");
        } else if (selectedDateDOB == null) {
          Alert.alert("Error!", "The date of birth field is required!");
        } else if (selectedDateSR == null) {
          Alert.alert(
            "Error!",
            "The schedule of reservation field is required!"
          );
        } else if (eventTime == "") {
          Alert.alert("Error!", "The time of reservation field is required!");
        } else if (paymentType == "") {
          Alert.alert("Error!", "The payment type field is required!");
        } else if (selectedRequirementImage.length == 0) {
          Alert.alert("Error!", "The requirement file field is required!");
        } else {
          let tempProgress = progress;
          tempProgress = tempProgress + 0.25;
          setPage(page + 1);
          setProgress(tempProgress);
        }
      } else {
        if (eventName == "") {
          Alert.alert("Error!", "The name of event field is required!");
        } else if (eventFacilitator == "") {
          Alert.alert("Error!", "The event facilitator field is required!");
        } else if (selectedDateSR == null) {
          Alert.alert(
            "Error!",
            "The schedule of reservation field is required!"
          );
        } else if (eventTime == "") {
          Alert.alert("Error!", "The time of reservation field is required!");
        } else if (paymentType == "") {
          Alert.alert("Error!", "The payment type field is required!");
        } else {
          let tempProgress = progress;
          tempProgress = tempProgress + 0.25;
          setPage(page + 1);
          setProgress(tempProgress);
        }
      }
    } else if (page == 3) {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (progress === 0.25) {
      resetForm();
      navigation.navigate("ReservationIndex");
    } else {
      let tempProgress = progress;
      tempProgress = tempProgress - 0.25;
      setPage(page - 1);
      setProgress(tempProgress);
    }
  };

  const resetForm = () => {
    setApplicantName("");
    setSelectedDateDOB(null);
    setSelectedSacrament("");
    setSelectedDateSR(null);

    setRequirementImageStatus(false); // not impo
    setRequirementImageUri("");
    setRequirementImageName(""); // not impo

    setPaymentImageStatus(false);
    setPaymentImageUri("");
    setPaymentImageName("");

    setSelectedEventType("");
    setEventName("");
    setEventFacilitator("");
    setEventTime("");
    setSacramentDetails([]);

    setAvailableTime([]);
    setSelectedRequirementImage([]);
    setSelectedPaymentImage([]);
    setPaymentType("");

    setProgress(0.25);
    setPage(1);
  };

  return (
    <View style={styles.container}>
      {/* <Header
        logoSource={require("../assets/images/church_icon.png")}
        title="eiChurch"
        subtitle="San Roque Parish Church"
      /> */}
      <ProgressBar
        color="blue"
        animatedValue={progress}
        style={{ backgroundColor: "#FFF" }}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {page == 1 ? (
          <View style={{ padding: 5 }}>
            <Text style={styles.title}>Create a Reservation</Text>
            <Text style={styles.subtitle}>Event Type</Text>
            <Select
              label={"Select Event Type"}
              style={{ marginBottom: 10 }}
              value={selectedEventType}
              onSelect={(index) => {
                const event = eventTypeList[index.row];
                console.log("Selected Sacrament:", event);
                setSelectedEventType(event);
              }}
            >
              {eventTypeList.map((event, index) => (
                <SelectItem key={index} title={event} />
              ))}
            </Select>
            {selectedEventType == "Sacrament" && (
              <Select
                label={"Choose a Sacrament"}
                value={selectedSacrament}
                onSelect={(index) => {
                  const selected = sacraments[index - 1].sacrament;
                  console.log("Selected Sacrament:", selected);
                  setSelectedSacrament(selected);
                }}
              >
                {sacraments.map((sacrament, index) => (
                  <SelectItem key={index} title={sacrament.sacrament} />
                ))}
              </Select>
            )}
          </View>
        ) : page === 2 ? (
          <View style={{ padding: 5 }}>
            <Text style={styles.title}>Create a Reservation</Text>
            <Text style={styles.subtitle}>Event Details</Text>
            <View>
              {selectedEventType == "Sacrament" ? (
                <>
                  <Input
                    label={"Name of Applicant"}
                    value={applicantName}
                    onChangeText={setApplicantName}
                    style={{ marginBottom: 10 }}
                  />
                  <Datepicker
                    label={"Date of Birth"}
                    date={selectedDateDOB}
                    onSelect={(date) => setSelectedDateDOB(date)}
                    min={new Date(1900, 0, 1)} // Set min date to January 1, 1900
                    max={new Date()} // Set max date to today
                    style={{ width: "100%", marginBottom: 10 }}
                  />
                </>
              ) : (
                <>
                  <Input
                    label={"Name of Event"}
                    value={eventName}
                    onChangeText={setEventName}
                    style={{ marginBottom: 10 }}
                  />
                  <Input
                    label={"Event Facilitator"}
                    value={eventFacilitator}
                    onChangeText={setEventFacilitator}
                    style={{ marginBottom: 10 }}
                  />
                </>
              )}
              <Datepicker
                label={"Schedule of Reservation"}
                date={selectedDateSR}
                onSelect={(nextDate) => {
                  console.log(`Schedule of Reservation: ${nextDate}`);
                  setSelectedDateSR(nextDate);
                }}
                min={minDateSR}
                style={{ width: "100%", marginBottom: 10 }}
              />
              <Select
                label={"Time of Reservation"}
                value={eventTime}
                onSelect={(index) => {
                  const selected = availableTime[index - 1];
                  console.log("Selected Time:", selected);
                  setEventTime(selected);
                }}
                style={{ marginBottom: 10 }}
              >
                {availableTime.map((time, index) => (
                  <SelectItem key={index} title={time} />
                ))}
              </Select>
              <Select
                label={"Payment Type"}
                value={paymentType}
                onSelect={(index) => {
                  const selected = paymentTypes[index - 1].title;
                  setPaymentType(selected);
                  console.log("Selected Time:", selected);
                }}
                style={{ marginBottom: 10 }}
              >
                {paymentTypes.map((payment, index) => (
                  <SelectItem key={index} title={payment.title} />
                ))}
              </Select>
              {selectedEventType == "Sacrament" && (
                <>
                  {selectedSacrament == "Baptism" && (
                    <View style={styles.cardBox}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Baptismal Requirements
                      </Text>
                      {baptismalReqs.map((reqs, index) => (
                        <Text key={index} style={{ marginLeft: 1 }}>
                          - {reqs}
                        </Text>
                      ))}
                    </View>
                  )}

                  {selectedSacrament == "Communion" && (
                    <View style={styles.cardBox}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Communion Requirements
                      </Text>
                      {communionReqs.map((reqs, index) => (
                        <Text key={index} style={{ marginLeft: 1 }}>
                          - {reqs}
                        </Text>
                      ))}
                    </View>
                  )}

                  {selectedSacrament == "Matrimony" && (
                    <View style={styles.cardBox}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Marriage Requirements
                      </Text>
                      {marriageReqs.map((reqs, index) => (
                        <Text key={index} style={{ marginLeft: 1 }}>
                          - {reqs}
                        </Text>
                      ))}
                    </View>
                  )}

                  <View>
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
                        style={{ height: 400, marginTop: 10 }}
                      />
                    )}
                  </View>
                </>
              )}
            </View>
          </View>
        ) : (
          <View style={styles.bodyContainer}>
            <Text style={styles.title}>Create a Reservation</Text>
            <Text style={styles.subtitle}>Reservation Summary</Text>

            <View
              style={{
                width: "100%",
                padding: 10,
                borderWidth: 0.4,
                borderColor: "#ccc",
              }}
            >
              <CustomListHeader title="Personal Information" />
              <CustomListItem title="Name of Registrant" value={user.name} />
              {selectedEventType == "Sacrament" && (
                <>
                  <CustomListItem
                    title="Name of Applicant"
                    value={applicantName}
                  />
                  <CustomListItem
                    title="Date of Birth"
                    value={moment(selectedDateDOB).format("LL")}
                  />
                </>
              )}

              <CustomListHeader title="Event Details" />
              <CustomListItem
                title="Date of Reservation"
                value={moment(selectedDateSR).format("LL")}
              />
              <CustomListItem title="Time of Reservation" value={eventTime} />
              {selectedEventType == "Sacrament" ? (
                <>
                  <CustomListItem
                    title="Reserved Sacrament"
                    value={sacramentDetails.sacrament}
                  />
                </>
              ) : (
                <>
                  <CustomListItem title="Event Name" value={eventName} />
                  <CustomListItem
                    title="Event Facilitator"
                    value={eventFacilitator}
                  />
                </>
              )}

              <CustomListHeader title="Payment Details" />
              <CustomListItem
                title="Fee"
                value={
                  selectedEventType == "Sacrament"
                    ? sacramentDetails.fee
                    : "100"
                }
              />
            </View>
            {paymentType == "Online Payment" && (
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
                    style={{ width: 300, height: 500, marginTop: 10 }}
                  />
                )}
              </View>
            )}
          </View>
        )}
        {/* BUTTON NAVIGATOR */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 5,
            marginTop: 10,
          }}
        >
          <Button appearance="outline" status="basic" onPress={handleBack}>
            Back
          </Button>
          <Button onPress={handleNext}>{page == 3 ? "Submit" : "Next"}</Button>
        </View>
      </ScrollView>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
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
    padding: 12,
  },
  bodyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Montserrat-Medium",
    fontSize: 20,
    alignSelf: "flex-start",
  },
  subtitle: {
    marginBottom: 20,
    fontFamily: "Montserrat-Light",
    fontSize: 16,
    alignSelf: "flex-start",
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
  },
  uploadPhotoPlaceholder: {
    // margin: 20,
    marginTop: 5,
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
  cardBox: {
    marginTop: 10,
    backgroundColor: "#EAF1FE",
    padding: 10,
    borderTopWidth: 5,
    borderTopColor: "#3366FF",
    marginBottom: 10,
  },
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

export default ReservationScreen;
