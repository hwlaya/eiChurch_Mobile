import { Button } from "@ui-kitten/components";
import React from "react";
import { View, Text, } from "react-native";
import { Input } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Registration Page</Text>

      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="Username" />
      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="First Name" />
      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="Middle Name (optional)" />
      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="Last Name" />
      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="E-mail" />
      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="Password" />
      <Input style={{ marginVertical: 10, width: "80%" }} placeholder="Confirm Password" />
      
      <Button onPress={() => {
          console.log("registered!");
          navigation.navigate("Home");
        }}>
        Register
      </Button>

    </View>
  );
};

export default Register;
