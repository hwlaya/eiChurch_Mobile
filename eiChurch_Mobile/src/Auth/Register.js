import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Input, Button, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import api from "../../config/api";

const Register = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = () => {
    api
      .post("register", {
        first_name: "aeron",
        middle_name: "aaron",
        last_name: "desu",
        email: "brandangumila44@gmail.com",
        username: "AeronDesu",
        password: "123456789",
      })

      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        // setLoading(false);
        console.log(err.response);
      });
    // Add your registration logic here
    console.log("Register button pressed");
    // navigation.navigate("Home");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/SanRoque_Logo.png")}
        style={styles.logo}
      />
      <Text category="h5" style={styles.title}>
        Registration
      </Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <Input
          placeholder="Enter your username"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* First Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>First Name</Text>
        <Input
          placeholder="Enter your first name"
          autoCapitalize="words"
          style={styles.input}
        />
      </View>

      {/* Middle Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Middle Name (Optional)</Text>
        <Input
          placeholder="Enter your middle name"
          autoCapitalize="words"
          style={styles.input}
        />
      </View>

      {/* Last Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Last Name</Text>
        <Input
          placeholder="Enter your last name"
          autoCapitalize="words"
          style={styles.input}
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <Input
          placeholder="E-mail: ex. juandelazruz@gmail.com"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Password Input with Show/Hide Button */}
      <View style={styles.passwordInputContainer}>
        <Input
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
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
          style={{ color: "#3366FF", textDecorationLine: "underline" }}
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
    textAlign: "center",
    color: "black",
  },
  inputContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  label: {
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
    color: "gray",
    textAlign: "center",
  },
});

export default Register;
