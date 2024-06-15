import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Image,
  Alert,
} from "react-native";
import { Button, Card, Input } from "@ui-kitten/components";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { FILE_PATH } from "../../config/directory";
import moment from "moment";
import CustomBackButton from "../components/ui/CustomBackButton";
import api from "../../config/api";
import Loading from "../components/Loading";
import * as ImagePicker from "expo-image-picker";

const EditProfileScreen = () => {
  const { user, setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState([]);
  const [profilePictureUri, setProfilePictureUri] = useState("");

  const [checkEmail, setCheckEmail] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);

  useEffect(() => {
    api.get("users/all").then((response) => {
      const users = response.data.allUsers;
      const exceptCurrentUser = users.filter((value) => value.id != user.id);
      // console.log(exceptCurrentUser);
      const existingEmail = exceptCurrentUser.filter(
        (user) => user.email == email.trim().toLowerCase()
      );
      const existingUsername = exceptCurrentUser.filter(
        (user) => user.username == username.trim().toLowerCase()
      );
      console.log(existingEmail.length);
      console.log(existingUsername.length);
      if (existingEmail.length != 0) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
      if (existingUsername.length != 0) {
        setCheckUsername(true);
      } else {
        setCheckUsername(false);
      }
    });
  }, [email, username]);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
    setUsername(user.username);
    setPassword("");
    setConfirmPassword("");
    setProfilePicture([]);
    setProfilePictureUri("");

    const unsubscribe = navigation.addListener("focus", () => {
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setPassword("");
      setConfirmPassword("");
      setProfilePicture([]);
      setProfilePictureUri("");
    });

    return unsubscribe;
  }, [navigation, user]);

  const changeProfilePic = async () => {
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
      console.log(result.assets[0].uri);
      setProfilePicture(image);
      setProfilePictureUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (name == "") {
      Alert.alert("Error!", "The name field is required.");
    } else if (username == "") {
      Alert.alert("Error!", "The username field is required.");
    } else if (email == "") {
      Alert.alert("Error!", "The email field is required.");
    } else if (checkUsername) {
      Alert.alert("Error!", "The username has already been taken.");
    } else if (checkEmail) {
      Alert.alert("Error!", "The email has already been taken.");
    } else if (password != "" && password != confirmPassword) {
      Alert.alert(
        "Error!",
        "The password confirmation and password must match."
      );
    } else if (password != "" && password.trim().length < 8) {
      Alert.alert("Error!", "The password must be at least 8 characters.");
    } else {
      setLoading(true);
      const formdata = new FormData();

      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("username", username);
      formdata.append("password", password);
      formdata.append("user_image", profilePicture);

      console.log(formdata);

      api
        .post(`profile/update/${user.id}`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          setLoading(false);
          setUser(response.data.user);
          Alert.alert("Success!", "Profile updated successfully!");
          navigation.navigate("Profile");
        })
        .catch((err) => {
          console.error(err.response);
        });
    }
  };

  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={{ marginBottom: 20 }}>
          <Card>
            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", marginBottom: 10 }}
            >
              Personal Information
            </Text>
            {/* avatar */}
            <View style={styles.avatarMainContainer}>
              <View style={styles.avatarSecondContainer}>
                <View style={styles.avatarContainer}>
                  {/* {profilePictureUri && (
                    <Image
                      source={{ uri: profilePictureUri }}
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: 1000,
                      }}
                    />
                  )} */}
                  {profilePictureUri ? (
                    <Image
                      source={{ uri: profilePictureUri }}
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: 1000,
                      }}
                    />
                  ) : user.user_image != null ? (
                    <Image
                      source={{
                        uri: `${FILE_PATH}/profile_pictures/${user.user_image}`,
                      }}
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: 1000,
                      }}
                    />
                  ) : (
                    <Text style={{ color: "white", fontSize: 100 }}>
                      {user.name[0]}
                    </Text>
                  )}
                  {/* {user.user_image != null ? (
                    <Image
                      source={{
                        uri: `${FILE_PATH}/profile_pictures/${user.user_image}`,
                      }}
                      style={{
                        width: 180,
                        height: 180,
                        borderRadius: 1000,
                      }}
                    />
                  ) : (
                    <Text style={{ color: "white", fontSize: 100 }}>
                      {user.name[0]}
                    </Text>
                  )} */}
                </View>
              </View>
            </View>

            <Button
              style={{ marginVertical: 20, marginHorizontal: 100 }}
              size="small"
              onPress={changeProfilePic}
            >
              Change Picture
            </Button>
            {/* end of avatar */}

            <Input
              label={"Name"}
              value={name}
              onChangeText={setName}
              style={{ marginBottom: 10 }}
            />
            <Input
              label={"Username"}
              value={username}
              onChangeText={setUsername}
              style={{ marginBottom: 10 }}
            />
            <Input
              label={"Email"}
              value={email}
              onChangeText={setEmail}
              style={{ marginBottom: 10 }}
            />

            <Text
              variant="titleMedium"
              style={{ fontWeight: "bold", marginTop: 20, marginBottom: 10 }}
            >
              Change Password
            </Text>
            <Input
              label={"New Password"}
              value={password}
              secureTextEntry
              onChangeText={setPassword}
              style={{ marginBottom: 10 }}
            />
            <Input
              label={"Confirm New Password"}
              value={confirmPassword}
              secureTextEntry
              onChangeText={setConfirmPassword}
              style={{ marginBottom: 10 }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <CustomBackButton route="Profile" />

              <Button
                size="small"
                style={{ marginLeft: 10 }}
                onPress={handleSubmit}
              >
                Save Changes
              </Button>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  textStyle: {
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
  },
  avatarMainContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  avatarSecondContainer: {
    width: 180,
    height: 180,
    borderRadius: 1000,
    backgroundColor: "rgb(2 132 199)",
  },
  avatarContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default EditProfileScreen;
