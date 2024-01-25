import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Input } from "@ui-kitten/components";

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../assets/images/SanRoque_Logo.png")}
        style={{ height: "20%", width: "32%" }}
      />
      <Text>Login Page</Text>

      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="Email" />
      <Input
        style={{ marginVertical: 10, width: "80%" }}
        placeholder="Password"
      />

      <Text>
        Don't have an account yet?
        <TouchableOpacity>
          <Text
            style={{ color: "blue" }}
            onPress={() => {
              console.log("register");
              navigation.navigate("Register");
            }}
          >
            Register here!
          </Text>
        </TouchableOpacity>
      </Text>

      <Button
        onPress={() => {
          console.log("Go to home");
          navigation.navigate("Home");
        }}
      >
        Login
      </Button>
    </View>
  );
};

export default Login;
