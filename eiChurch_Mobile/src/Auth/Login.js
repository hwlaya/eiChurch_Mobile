import React, { useState, useContext } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Button, Input, Text } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../providers/UserProvider";

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    if (email === "" || password === "") {
      Alert.alert("Error!", "Please input your credentials!");
      setLoading(false);
    } else {
      api
        .post("login", {
          email: email,
          password: password,
          isMobile: true,
        })
        .then((response) => {
          setLoading(false);
          setUser(response.data.user);
          navigation.navigate("Home");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          Alert.alert("Error!", "Invalid credentials. Please try again.");
        });
    }
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
      <Input
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input with Show/Hide Button */}
      <View style={styles.passwordInputContainer}>
        <Input
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          autoCapitalize="none"
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.showHideButton}
        >
          <Text>{passwordVisible ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <Button onPress={handleLogin} style={styles.button}>
        Log In
      </Button>

      {/* Register Text */}
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
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%",
    marginBottom: 10,
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
  },
  showHideButton: {
    padding: 10,
  },
  button: {
    width: "80%",
    marginBottom: 10,
  },
  registerText: {
    marginTop: 10,
  },
});

export default Login;
