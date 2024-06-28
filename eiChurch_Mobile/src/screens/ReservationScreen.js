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

  const baptismTypes = [
    "Ordinary Sunday",
    "Special Baptism",
    "Binyagang Bayan",
  ];

  const marriageTypes = ["Catholic", "Civil", "Not Married"];

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

  // additional forms:
  const [typeOfBaptism, setTypeOfBaptism] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [fatherBirthPlace, setFatherBirthPlace] = useState("");
  const [motherName, setMotherName] = useState("");
  const [motherBirthPlace, setMotherBirthPlace] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfMarriage, setTypeOfMarriage] = useState("");
  const [dateOfBaptism, setDateOfBaptism] = useState("");
  const [church, setChurch] = useState("");
  const [dateOfSeminar, setDateOfSeminar] = useState("");
  const [catechist, setCatechist] = useState("");
  const [godFather, setGodFather] = useState("");
  const [godFatherAddress, setGodFatherAddress] = useState("");
  const [godMother, setGodMother] = useState("");
  const [godMotherAddress, setGodMotherAddress] = useState("");
  const [additionalSponsors, setAdditionalSponsors] = useState("");

  const [reservationFee, setReservationFee] = useState("");

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

      setTypeOfBaptism("");
      setContactNumber("");
      setPlaceOfBirth("");
      setAge("");
      setFatherName("");
      setFatherBirthPlace("");
      setMotherName("");
      setMotherBirthPlace("");
      setAddress("");
      setTypeOfMarriage("");
      setDateOfBaptism("");
      setChurch("");
      setDateOfSeminar("");
      setCatechist("");
      setGodFather("");
      setGodFatherAddress("");
      setGodMother("");
      setGodMotherAddress("");
      setAdditionalSponsors("");

      setRequirementImageStatus(false); // not impo
      setRequirementImageUri("");
      setRequirementImageName(""); // not impo
      setSelectedRequirementImage([]);
    }
  }, [selectedSacrament]);

  useEffect(() => {
    if (selectedEventType == "Sacrament") {
      setEventName("");
      setEventFacilitator("");
      setReservationFee("");
    } else {
      setApplicantName("");
      setSelectedDateDOB(null);
      setRequirementImageUri("");
      setSelectedRequirementImage([]);
      setSelectedSacrament("");
      setReservationFee("");
    }
  }, [selectedEventType]);

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
    formdata.append("total_price", reservationFee);

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

      formdata.append("contact_number", contactNumber);
      formdata.append("place_of_birth", placeOfBirth);
      formdata.append("father_name", fatherName);
      formdata.append("father_place_of_birth", fatherBirthPlace);
      formdata.append("mother_name", motherName);
      formdata.append("mother_place_of_birth", motherBirthPlace);
      formdata.append("address", address);
      formdata.append("first_sponsor", godFather);
      formdata.append("second_sponsor", godMother);
      formdata.append("first_sponsor_address", godFatherAddress);
      formdata.append("second_sponsor_address", godMotherAddress);
      formdata.append("date_of_baptism", dateOfBaptism);
      formdata.append("church", church);
      formdata.append("date_of_seminar", dateOfSeminar);
      formdata.append("catechist", catechist);

      formdata.append("type_of_baptism", typeOfBaptism);
      formdata.append("marriage_type", typeOfMarriage);
      formdata.append("additional_sponsors", additionalSponsors);
      formdata.append("age", age);
    } else {
      // event
      formdata.append("event_name", eventName);
      formdata.append("event_facilitator", eventFacilitator);
    }

    if (selectedPayment == "op") {
      formdata.append("payment_image", selectedPaymentImage);
    }

    formdata.append("payment_type", selectedPayment);
    console.log("Form Data:", formdata);

    if (selectedPayment == "ovc") {
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
    } else
      api
        .post(`reservation/create`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          Alert.alert(
            "Success",
            "Reservation created successfully! Please take note that canceling the payment, may forfeit your reservation."
          );
          navigation.navigate("ReservationWebView", {
            reservation_schedule: reservationDateTime,
          });
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
    {
    }
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
      function validateReservationFee(fee) {
        if (!/^\d*$/.test(fee)) {
          return "The reservation fee field should be a number!";
        } else if (fee < 100) {
          return "The minimum reservation fee is P100!";
        } else if (fee > 1000) {
          return "The maximum reservation fee is P1000!";
        }
        return null;
      }

      function validateContactNumber(number) {
        if (!/^\d*$/.test(number)) {
          return "The contact number field should be a number!";
        }
        return null;
      }

      if (selectedEventType == "Sacrament") {
        if (selectedSacrament == "Baptism") {
          if (
            applicantName == "" ||
            selectedDateDOB == null ||
            selectedDateSR == null ||
            eventTime == "" ||
            selectedRequirementImage.length == 0 ||
            reservationFee == "" ||
            paymentType == "" ||
            typeOfBaptism == "" ||
            contactNumber == "" ||
            placeOfBirth == "" ||
            fatherName == "" ||
            fatherBirthPlace == "" ||
            motherName == "" ||
            motherBirthPlace == "" ||
            address == "" ||
            typeOfMarriage == "" ||
            godFather == "" ||
            godFatherAddress == "" ||
            godMother == "" ||
            godMotherAddress == "" ||
            additionalSponsors == ""
          ) {
            Alert.alert("Error!", "Complete filling out the form!");
          } else {
            const reservationFeeError = validateReservationFee(reservationFee);
            const contactNumberError = validateContactNumber(contactNumber);
            if (contactNumberError) {
              Alert.alert("Error!", contactNumberError);
            } else if (reservationFeeError) {
              Alert.alert("Error!", reservationFeeError);
            } else {
              let tempProgress = progress;
              tempProgress = tempProgress + 0.25;
              setPage(page + 1);
              setProgress(tempProgress);
            }
          }
        } else if (selectedSacrament == "Communion") {
          if (
            applicantName == "" ||
            selectedDateDOB == null ||
            selectedDateSR == null ||
            eventTime == "" ||
            selectedRequirementImage.length == 0 ||
            reservationFee == "" ||
            paymentType == "" ||
            contactNumber == "" ||
            placeOfBirth == "" ||
            age == "" ||
            fatherName == "" ||
            fatherBirthPlace == "" ||
            motherName == "" ||
            motherBirthPlace == "" ||
            address == "" ||
            dateOfBaptism == "" ||
            church == "" ||
            dateOfSeminar == "" ||
            catechist == ""
          ) {
            Alert.alert("Error!", "Complete filling out the form!");
          } else {
            const reservationFeeError = validateReservationFee(reservationFee);
            const contactNumberError = validateContactNumber(contactNumber);
            if (contactNumberError) {
              Alert.alert("Error!", contactNumberError);
            } else if (reservationFeeError) {
              Alert.alert("Error!", reservationFeeError);
            } else {
              let tempProgress = progress;
              tempProgress = tempProgress + 0.25;
              setPage(page + 1);
              setProgress(tempProgress);
            }
          }
        } else if (selectedSacrament == "Matrimony") {
          if (
            applicantName == "" ||
            selectedDateDOB == null ||
            selectedDateSR == null ||
            eventTime == "" ||
            selectedRequirementImage.length == 0 ||
            reservationFee == "" ||
            paymentType == ""
          ) {
            Alert.alert("Error!", "Complete filling out the form!");
          } else {
            const reservationFeeError = validateReservationFee(reservationFee);
            if (reservationFeeError) {
              Alert.alert("Error!", reservationFeeError);
            } else {
              let tempProgress = progress;
              tempProgress = tempProgress + 0.25;
              setPage(page + 1);
              setProgress(tempProgress);
            }
          }
        } else if (selectedSacrament == "Confirmation") {
          if (
            applicantName == "" ||
            selectedDateDOB == null ||
            selectedDateSR == null ||
            eventTime == "" ||
            selectedRequirementImage.length == 0 ||
            reservationFee == "" ||
            paymentType == "" ||
            fatherName == "" ||
            motherName == "" ||
            address == "" ||
            dateOfBaptism == "" ||
            church == "" ||
            dateOfSeminar == "" ||
            catechist == "" ||
            godFather == "" ||
            godFatherAddress == "" ||
            godMother == "" ||
            godMotherAddress == ""
          ) {
            Alert.alert("Error!", "Complete filling out the form!");
          } else {
            const reservationFeeError = validateReservationFee(reservationFee);
            if (reservationFeeError) {
              Alert.alert("Error!", reservationFeeError);
            } else {
              let tempProgress = progress;
              tempProgress = tempProgress + 0.25;
              setPage(page + 1);
              setProgress(tempProgress);
            }
          }
        }
      } else {
        if (
          eventName == "" ||
          eventFacilitator == "" ||
          selectedDateSR == null ||
          eventTime == "" ||
          reservationFee == "" ||
          paymentType == ""
        ) {
          Alert.alert("Error!", "Complete filling out the form!");
        } else {
          const reservationFeeError = validateReservationFee(reservationFee);
          if (reservationFeeError) {
            Alert.alert("Error!", reservationFeeError);
          } else {
            let tempProgress = progress;
            tempProgress = tempProgress + 0.25;
            setPage(page + 1);
            setProgress(tempProgress);
          }
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

    setTypeOfBaptism("");
    setContactNumber("");
    setPlaceOfBirth("");
    setAge("");
    setFatherName("");
    setFatherBirthPlace("");
    setMotherName("");
    setMotherBirthPlace("");
    setAddress("");
    setTypeOfMarriage("");
    setDateOfBaptism("");
    setChurch("");
    setDateOfSeminar("");
    setCatechist("");
    setGodFather("");
    setGodFatherAddress("");
    setGodMother("");
    setGodMotherAddress("");
    setAdditionalSponsors("");
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
                <View style={styles.formContainer}>
                  <View style={styles.column}>
                    <Input
                      label={"Name of Applicant"}
                      value={applicantName}
                      onChangeText={setApplicantName}
                      style={{ marginBottom: 10 }}
                    />
                  </View>
                  <View style={styles.column}>
                    <Datepicker
                      label={"Date of Birth"}
                      date={selectedDateDOB}
                      onSelect={(date) => setSelectedDateDOB(date)}
                      min={new Date(1900, 0, 1)} // Set min date to January 1, 1900
                      max={new Date()} // Set max date to today
                      style={{ width: "100%", marginBottom: 10 }}
                    />
                  </View>
                </View>
              ) : (
                <View style={styles.formContainer}>
                  <View style={styles.column}>
                    <Input
                      label={"Name of Event"}
                      value={eventName}
                      onChangeText={setEventName}
                      style={{ marginBottom: 10 }}
                    />
                  </View>
                  <View style={styles.column}>
                    <Input
                      label={"Event Facilitator"}
                      value={eventFacilitator}
                      onChangeText={setEventFacilitator}
                      style={{ marginBottom: 10 }}
                    />
                  </View>
                </View>
              )}

              <View style={styles.formContainer}>
                <View style={styles.column}>
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
                </View>
                <View style={styles.column}>
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
                </View>
              </View>

              {selectedEventType == "Sacrament" && (
                <>
                  {selectedSacrament == "Baptism" && (
                    <Select
                      label={"Type of Baptism"}
                      value={typeOfBaptism}
                      onSelect={(index) => {
                        const selected = baptismTypes[index - 1];
                        console.log("Selected Baptism:", selected);
                        setTypeOfBaptism(selected);
                      }}
                      style={{ marginBottom: 10 }}
                    >
                      {baptismTypes.map((type, index) => (
                        <SelectItem key={index} title={type} />
                      ))}
                    </Select>
                  )}
                  {(selectedSacrament == "Baptism" ||
                    selectedSacrament == "Communion") && (
                    <>
                      <View style={styles.formContainer}>
                        <View style={styles.column}>
                          <Input
                            label={"Contact Number"}
                            value={contactNumber}
                            onChangeText={setContactNumber}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                        <View style={styles.column}>
                          <Input
                            label={"Place of Birth"}
                            value={placeOfBirth}
                            onChangeText={setPlaceOfBirth}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                      </View>
                      {selectedSacrament == "Communion" && (
                        <Input
                          label={"Age"}
                          value={age}
                          onChangeText={setAge}
                          style={{ marginBottom: 10, marginHorizontal: 2 }}
                        />
                      )}
                    </>
                  )}
                  {selectedSacrament != "Matrimony" && (
                    <>
                      <View style={styles.formContainer}>
                        <View style={styles.column}>
                          <Input
                            label={"Father's Name"}
                            value={fatherName}
                            onChangeText={setFatherName}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                        {selectedSacrament != "Confirmation" && (
                          <View style={styles.column}>
                            <Input
                              label={"Father's Birth Place"}
                              value={fatherBirthPlace}
                              onChangeText={setFatherBirthPlace}
                              style={{ marginBottom: 10 }}
                            />
                          </View>
                        )}
                      </View>

                      <View style={styles.formContainer}>
                        <View style={styles.column}>
                          <Input
                            label={"Mother's Name (Maiden's Name)"}
                            value={motherName}
                            onChangeText={setMotherName}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                        {selectedSacrament != "Confirmation" && (
                          <View style={styles.column}>
                            <Input
                              label={"Mother's Birth Place"}
                              value={motherBirthPlace}
                              onChangeText={setMotherBirthPlace}
                              style={{ marginBottom: 10 }}
                            />
                          </View>
                        )}
                      </View>
                    </>
                  )}
                  {selectedSacrament != "Matrimony" && (
                    <Input
                      label={"Address"}
                      value={address}
                      onChangeText={setAddress}
                      style={{ marginBottom: 10, marginHorizontal: 2 }}
                    />
                  )}
                  {selectedSacrament == "Baptism" && (
                    <Select
                      label={"Marriage Type of Parents"}
                      value={typeOfMarriage}
                      onSelect={(index) => {
                        const selected = marriageTypes[index - 1];
                        console.log("Selected Marriage:", selected);
                        setTypeOfMarriage(selected);
                      }}
                      style={{ marginBottom: 10 }}
                    >
                      {marriageTypes.map((type, index) => (
                        <SelectItem key={index} title={type} />
                      ))}
                    </Select>
                  )}

                  {(selectedSacrament == "Communion" ||
                    selectedSacrament == "Confirmation") && (
                    <>
                      <View style={styles.formContainer}>
                        <View style={styles.column}>
                          <Input
                            label={"Date of Baptism"}
                            value={dateOfBaptism}
                            onChangeText={setDateOfBaptism}
                            style={{ marginBottom: 10 }}
                          />
                        </View>

                        <View style={styles.column}>
                          <Input
                            label={"Church"}
                            value={church}
                            onChangeText={setChurch}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                      </View>

                      <View style={styles.formContainer}>
                        <View style={styles.column}>
                          <Input
                            label={"Date of Seminar"}
                            value={dateOfSeminar}
                            onChangeText={setDateOfSeminar}
                            style={{ marginBottom: 10 }}
                          />
                        </View>

                        <View style={styles.column}>
                          <Input
                            label={"Catechist"}
                            value={catechist}
                            onChangeText={setCatechist}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                      </View>
                    </>
                  )}

                  {(selectedSacrament == "Baptism" ||
                    selectedSacrament == "Confirmation") && (
                    <>
                      <View style={styles.formContainer}>
                        <View style={styles.column}>
                          <Input
                            label={"Godfather"}
                            value={godFather}
                            onChangeText={setGodFather}
                            style={{ marginBottom: 10 }}
                          />
                        </View>

                        <View style={styles.column}>
                          <Input
                            label={"Godfather's Address"}
                            value={godFatherAddress}
                            onChangeText={setGodFatherAddress}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                      </View>

                      <View style={styles.formContainer}>
                        <View style={styles.column}>
                          <Input
                            label={"Godmother"}
                            value={godMother}
                            onChangeText={setGodMother}
                            style={{ marginBottom: 10 }}
                          />
                        </View>

                        <View style={styles.column}>
                          <Input
                            label={"Godmother's Address"}
                            value={godMotherAddress}
                            onChangeText={setGodMotherAddress}
                            style={{ marginBottom: 10 }}
                          />
                        </View>
                      </View>
                    </>
                  )}
                </>
              )}

              {selectedEventType == "Sacrament" && (
                <>
                  {selectedSacrament == "Baptism" && (
                    <>
                      <Input
                        label={"Additional Sponsors"}
                        value={additionalSponsors}
                        onChangeText={setAdditionalSponsors}
                        style={{ marginBottom: 10 }}
                        multiline={true}
                        numberOfLines={5}
                      />

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
                    </>
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

                  {selectedSacrament == "Confirmation" && (
                    <View style={styles.cardBox}>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        Confirmation Requirements
                      </Text>
                      {communionReqs.map((reqs, index) => (
                        <Text key={index} style={{ marginLeft: 1 }}>
                          - {reqs}
                        </Text>
                      ))}
                    </View>
                  )}

                  <View style={{ marginBottom: 10 }}>
                    <Text
                      category="label"
                      appearance="hint"
                      style={styles.requirementText}
                    >
                      Attach the Requirements
                    </Text>

                    <Button
                      onPress={pickRequirementImage}
                      style={{ marginTop: 10 }}
                    >
                      Upload File
                    </Button>
                    {requirementImageUri && (
                      <Image
                        source={{ uri: requirementImageUri }}
                        style={{ height: 400, marginTop: 10 }}
                      />
                    )}
                  </View>
                </>
              )}

              <Divider />
              <View style={{ marginTop: 10 }}>
                <Input
                  label={"Reservation Fee"}
                  value={reservationFee}
                  onChangeText={setReservationFee}
                  style={{ marginBottom: 10 }}
                />
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
              </View>
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
              {selectedEventType == "Sacrament" &&
                selectedSacrament != "Matrimony" && (
                  <>
                    <CustomListHeader title="Other Details" />

                    {selectedSacrament == "Baptism" && (
                      <CustomListItem
                        title="Type of Baptism"
                        value={typeOfBaptism}
                      />
                    )}

                    {(selectedSacrament == "Baptism" ||
                      selectedSacrament == "Communion") && (
                      <>
                        <CustomListItem
                          title="Contact Number"
                          value={contactNumber}
                        />
                        <CustomListItem
                          title="Place of Birth"
                          value={placeOfBirth}
                        />
                      </>
                    )}

                    {selectedSacrament == "Communion" && (
                      <CustomListItem title="Age" value={age} />
                    )}

                    {selectedSacrament != "Matrimony" && (
                      <>
                        <CustomListItem
                          title="Father's Name"
                          value={fatherName}
                        />
                        {selectedSacrament != "Confirmation" && (
                          <CustomListItem
                            title="Father's Birth Place"
                            value={fatherBirthPlace}
                          />
                        )}
                        <CustomListItem
                          title="Mother's Name"
                          value={motherName}
                        />
                        {selectedSacrament != "Confirmation" && (
                          <CustomListItem
                            title="Mother's Birth Place"
                            value={motherBirthPlace}
                          />
                        )}
                        <CustomListItem title="Address" value={address} />
                      </>
                    )}

                    {selectedSacrament == "Baptism" && (
                      <CustomListItem
                        title="Marriage Type"
                        value={typeOfMarriage}
                      />
                    )}

                    {(selectedSacrament == "Communion" ||
                      selectedSacrament == "Confirmation") && (
                      <>
                        <CustomListItem
                          title="Date of Baptism"
                          value={dateOfBaptism}
                        />
                        <CustomListItem title="Church" value={church} />
                        <CustomListItem
                          title="Date of Seminar"
                          value={dateOfSeminar}
                        />
                        <CustomListItem title="Catechist" value={catechist} />
                      </>
                    )}

                    {(selectedSacrament == "Baptism" ||
                      selectedSacrament == "Confirmation") && (
                      <>
                        <CustomListItem title="Godfather" value={godFather} />
                        <CustomListItem
                          title="Godfather's Address"
                          value={godFatherAddress}
                        />
                        <CustomListItem title="Godmother" value={godMother} />
                        <CustomListItem
                          title="Godmother's Address"
                          value={godMotherAddress}
                        />
                      </>
                    )}

                    {selectedSacrament == "Baptism" && (
                      <CustomListItem
                        title="Additional Sponsor"
                        value={additionalSponsors}
                      />
                    )}
                  </>
                )}

              <CustomListHeader title="Payment Details" />
              <CustomListItem title="Fee" value={reservationFee} />
            </View>
            {/* {paymentType == "Online Payment" && (
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
            )} */}
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
  formContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  column: {
    flex: 1,
    marginHorizontal: 2,
  },
});

export default ReservationScreen;
