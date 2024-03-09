import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import api from "../../config/api";
import Loading from "../components/Loading";
const Register = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const handleRegister = () => {
    api
      .post("register", {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        email: email,
        username: username,
        password: password,
        password_confirmation: confirmPassword,
      })

      .then((response) => {
        console.log(response);
        setLoading(true);
        Alert.alert("Success", "Registration successful!");
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err.response);
      });
    // Add your registration logic here
    console.log("Register button pressed");
    navigation.navigate("Login");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Loading loading={loading} />
      <Image
        source={require("../assets/images/SanRoque_Logo.png")}
        style={styles.logo}
      />
      <Text variant="titleLarge" style={styles.title}>
        Registration
      </Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text variant="labelLarge" style={styles.label}>
          Username
        </Text>
        <Input
          placeholder="Enter your username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
      </View>

      {/* First Name Input */}
      <View style={styles.inputContainer}>
        <Text variant="labelLarge" style={styles.label}>
          First Name
        </Text>
        <Input
          placeholder="Enter your first name"
          autoCapitalize="words"
          value={firstName}
          onChangeText={setFirstName}
          style={styles.input}
        />
      </View>

      {/* Middle Name Input */}
      <View style={styles.inputContainer}>
        <Text variant="labelLarge" style={styles.label}>
          Middle Name (Optional)
        </Text>
        <Input
          placeholder="Enter your middle name"
          autoCapitalize="words"
          value={middleName}
          onChangeText={setMiddleName}
          style={styles.input}
        />
      </View>

      {/* Last Name Input */}
      <View style={styles.inputContainer}>
        <Text variant="labelLarge" style={styles.label}>
          Last Name
        </Text>
        <Input
          placeholder="Enter your last name"
          autoCapitalize="words"
          value={lastName}
          onChangeText={setLastName}
          style={styles.input}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text variant="labelLarge" style={styles.label}>
          E-mail
        </Text>
        <Input
          placeholder="E-mail: ex. juandelazruz@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
      </View>

      {/* Password Input with Show/Hide Button */}
      <View style={styles.passwordInputContainer}>
        <Input
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
          style={styles.passwordInput}
        />
        <Button
          appearance="ghost"
          status="basic"
          onPress={togglePasswordVisibility}
          style={styles.showHideButton}
        >
          {passwordVisible ? "Hide" : "Show"}
        </Button>
      </View>

      {/* Confirm Password Input with Show/Hide Button */}
      <View style={styles.passwordInputContainer}>
        <Input
          placeholder="Confirm your password"
          secureTextEntry={!confirmPasswordVisible}
          autoCapitalize="none"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.passwordInput}
        />
        <Button
          appearance="ghost"
          status="basic"
          onPress={toggleConfirmPasswordVisibility}
          style={styles.showHideButton}
        >
          {confirmPasswordVisible ? "Hide" : "Show"}
        </Button>
      </View>

      {/* Register Button */}
      <Button onPress={handleRegister} style={styles.button}>
        Register
      </Button>

      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text
          style={{
            fontFamily: "Montserrat-Light",
            color: "#3366FF",
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("Login")}
        >
          Log In
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    backgroundColor: "#ffffff", // Background color
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 8,
    borderRadius: 10, // Optional: Add border radius for a rounded look
  },
  title: {
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    color: "black",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  label: {
    fontFamily: "Montserrat-SemiBold",
    color: "black",
    fontSize: 14,
    marginBottom: 4,
    textAlign: "left",
  },
  input: {
    width: "95%",
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    width: "95%",
  },
  passwordInput: {
    width: "80%",
    marginRight: 8,
  },
  showHideButton: {
    padding: 8,
  },
  button: {
    marginBottom: 16,
    width: "95%",
    backgroundColor: "#3366FF",
  },
  loginText: {
    fontFamily: "Montserrat-SemiBold",
    color: "gray",
    textAlign: "center",
  },
});

export default Register;
