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
import { Text, ProgressBar, TextInput } from "react-native-paper";
import { Datepicker, Select, SelectItem } from "@ui-kitten/components";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import * as DocumentPicker from "expo-document-picker";
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

  const [selectedSacrament, setSelectedSacrament] = useState("");
  const [selectedDateSR, setSelectedDateSR] = useState("");

  const [imageStatus, setImageStatus] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [imageName, setImageName] = useState("");

  const [sacraments, setSacraments] = useState([]);

  useEffect(() => {
    api
      .get(`sacraments/all`)
      .then((response) => {
        setSacraments(response.data.sacraments);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // const fetchSacraments = async () => {
    //   try {
    //     const response = await api.get(`sacraments/all`);
    //     console.log(
    //       "Sacraments fetched successfully:",
    //       response.data.sacraments
    //     );
    //     setSacraments(response.data.sacraments);
    //   } catch (err) {
    //     console.log(err.response);
    //   }
    // };
    // fetchSacraments;
  }, []);
  const uploadPhoto = async () => {
    try {
      console.log("Attempting to upload photo...");
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      console.log("DocumentPicker result:", result);

      if (result.type === "success") {
        console.log("Document picked successfully");

        if (result.type === "file") {
          console.log("File type detected");

          if (
            result.name.endsWith(".pdf") ||
            result.name.endsWith(".jpg") ||
            result.name.endsWith(".png")
          ) {
            console.log("Valid file format selected:", result.name);
            setImageUri(result.assets[0].uri);
            console.log("imageUri set to:", result.assets[0].uri);
            setImageName(result.name);
            setImageStatus(true);
            console.log("imageStatus set to true");
          } else {
            console.log(
              "Invalid file format selected. Please pick a PDF, JPG, or PNG file."
            );
          }
        } else {
          console.log("Unsupported file type selected. Please pick a file.");
        }
      } else if (result.type === "cancel") {
        console.log("User cancelled picking a document");
      }
    } catch (error) {
      console.log("Error picking a document:", error);
    }
  };

  const handlePayment = () => {
    // Submit data to the database
    const formData = {
      registrantName,
      applicantName,
      selectedDate,
      // Add other data as needed
    };
    console.log("Form Data:", formData);
    // Call your database submission function here
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
              <Text style={styles.title}>Reservation</Text>
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
                  onSelect={(nextDate) => setSelectedDateDOB(nextDate)}
                  min={new Date(1900, 0, 1)} // Set min date to January 1, 1900
                  max={new Date()} // Set max date to today
                  style={styles.textInput}
                />
              </View>
            </View>
          ) : page === 2 ? (
            <View style={styles.bodyContainer}>
              <Text style={styles.title}>Reservation</Text>
              <Text style={styles.subtitle}>Event Details</Text>
              <View />
              <View style={styles.inputFieldContainer}>
                <Select
                  label={"Choose a Sacrament"}
                  style={styles.textInput}
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
                <Datepicker
                  label={"Schedule of Reservation"}
                  placeholder={"Pick Date"}
                  date={selectedDateSR}
                  onSelect={(nextDate) => setSelectedDateSR(nextDate)}
                  min={new Date(1900, 0, 1)}
                  max={new Date()}
                  style={styles.textInput}
                />
                <DateTimePicker
                  mode="time"
                  value={new Date()}
                  is24Hour={false}
                  minimumDate={moment().set({ hour: 11, minute: 0 }).toDate()}
                  maximumDate={moment().set({ hour: 22, minute: 0 }).toDate()}
                  style={{ width: 300, opacity: 1, height: 30, marginTop: 50 }}
                  onChange={(e, date) => {
                    if (e.type === "set") {
                      setSelectedTime(moment(date).format("hh:mm A"));
                      setTimePickerVisible(false);
                    } else {
                      setTimePickerVisible(false);
                    }
                  }}
                />
                <TouchableOpacity
                  style={{
                    margin: 20,
                    borderWidth: 1,
                    height: 200,
                    width: 200,
                    borderRadius: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    borderColor: "#aeaeae",
                  }}
                  onPress={() => uploadPhoto()}
                >
                  {imageStatus ? (
                    <Image
                      source={{ uri: imageUri }}
                      style={{
                        height: "100%",
                        width: "100%",
                      }}
                    />
                  ) : (
                    <Text variant="bodySmall" style={{ color: "#aeaeae" }}>
                      Upload Image Here
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.bodyContainer}>
              <Text style={styles.title}>Reservation</Text>
              <Text style={styles.subtitle}>Reservation Summary</Text>
              <View />
              <View style={styles.inputFieldContainer}>
                <TextInput
                  style={styles.textInput}
                  label={"Name of Registrant"}
                  outlineStyle={{ borderRadius: 10 }}
                  value={user ? user.name : ""}
                  mode="outlined"
                  editable={false}
                />
                <TextInput
                  style={styles.textInput}
                  label={"Name of Applicant"}
                  outlineStyle={{ borderRadius: 10 }}
                  mode="outlined"
                />
                <Datepicker label={"Date of Birth"}></Datepicker>
              </View>
            </View>
          )}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
            marginVertical: 30,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#dc3545",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
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
            style={{
              backgroundColor: "#198754",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              if (page === 3) {
                Alert.alert("Warning!", "Already at the last page!");
              } else {
                let tempProgress = progress;
                tempProgress = tempProgress + 0.25;
                setPage(page + 1);
                setProgress(tempProgress);
              }
            }}
          >
            <Text>NEXT</Text>
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
    marginTop: 20,
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
  userInfo: {
    marginBottom: 20,
    justifyContent: "space-between",
    marginRight: "40%",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default ReservationScreen;
