import { useNavigation } from "@react-navigation/native";
import { Button, Input, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";

const Login = () => {
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = () => {
    // Add your login logic here
    console.log("Login button pressed");
    navigation.replace("Home");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/SanRoque_Logo.png")}
        style={styles.logo}
      />
      <Text category="h4" style={styles.title}>
        Welcome to San Roque Parish Church
      </Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Input
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Password Input with Show/Hide Button */}
      <View style={styles.passwordInputContainer}>
        <View style={styles.passwordInput}>
          <Input
            placeholder="Enter your password"
            secureTextEntry={!passwordVisible}
            autoCapitalize="none"
          />
        </View>
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.showHideButton}
        >
          <Text>{passwordVisible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      <Button onPress={handleLogin} style={styles.button}>
        Log In
      </Button>

      <Text style={styles.registerText}>
        New user?{" "}
        <Text
          style={{ color: "#3366FF", textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("Register")}
        >
          Create an account
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
    padding: 16,
    backgroundColor: "#ffffff", // Background color
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    borderRadius: 10, // Optional: Add border radius for a rounded look
  },
  title: {
    marginBottom: 16,
    textAlign: "center",
    color: "black", // Text color
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    width: "80%",
    marginRight: 8,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    marginRight: 8,
  },
  showHideButton: {
    padding: 8,
  },
  button: {
    marginBottom: 16,
    width: "80%", // Adjust width as needed
    backgroundColor: "#3366FF",
  },
  registerText: {
    color: "gray",
    textAlign: "center",
  },
});

export default Login;
