import { useNavigation } from "@react-navigation/native";
import { Button } from "@ui-kitten/components";
import React from "react";
import { View, Text } from "react-native";

const Login = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Login Page</Text>
      <Button
        onPress={() => {
          console.log("test");
          navigation.navigate("Home");
        }}
      >
        BUTTON
      </Button>
    </View>
  );
};

export default Login;
