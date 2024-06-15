import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  ImageBackground,
  View,
  Image,
} from "react-native";
import { Card, Input } from "@ui-kitten/components";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { UserContext } from "../providers/UserProvider";
import { useNavigation } from "@react-navigation/native";
import { FILE_PATH } from "../../config/directory";
import moment from "moment";

const Profile = () => {
  const { user } = useContext(UserContext);
  const { setUser } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("EditProfileScreen")}
          >
            <Icon
              name="square-edit-outline"
              size={25}
              color={"rgb(2 132 199)"}
            />
          </TouchableOpacity>
        </View>
        {/* avatar */}
        <View style={styles.avatarMainContainer}>
          <View style={styles.avatarSecondContainer}>
            <View style={styles.avatarContainer}>
              {user.user_image != null ? (
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
            </View>
          </View>
        </View>
        {/* end of avatar */}

        <View style={{ marginTop: 20 }}>
          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.textLabel}>
              NAME
            </Text>
            <View style={styles.valueLabel}>
              <Text variant="bodyLarge">{user.name}</Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.textLabel}>
              USERNAME
            </Text>
            <View style={styles.valueLabel}>
              <Text variant="bodyLarge">{user.username}</Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.textLabel}>
              EMAIL
            </Text>
            <View style={styles.valueLabel}>
              <Text variant="bodyLarge">{user.email}</Text>
            </View>
          </View>

          <View style={styles.textContainer}>
            <Text variant="titleMedium" style={styles.textLabel}>
              JOINED AT
            </Text>
            <View style={styles.valueLabel}>
              <Text variant="bodyLarge">
                {moment(user.created_at).format("MMMM YYYY")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
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
  textContainer: {
    marginBottom: 20,
  },
  textLabel: { fontWeight: "bold", paddingLeft: 10 },
  valueLabel: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
  },
  textStyle: {
    fontFamily: "Montserrat-Bold",
    color: "black",
    textAlign: "left",
  },
});

export default Profile;
