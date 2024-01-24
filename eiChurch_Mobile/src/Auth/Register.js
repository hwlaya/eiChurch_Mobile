import { Button } from "@ui-kitten/components";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Input } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Registration Page</Text>

      <Input style={styles.inputStyle} placeholder="Username" />
      <Input style={styles.inputStyle} placeholder="First Name" />
      <Input style={styles.inputStyle} placeholder="Middle Name (optional)" />
      <Input style={styles.inputStyle} placeholder="Last Name" />
      <Input style={styles.inputStyle} placeholder="E-mail" />
      <Input style={styles.inputStyle} placeholder="Password" />
      <Input style={styles.inputStyle} placeholder="Confirm Password" />

      <Button
        onPress={() => {
          console.log("registered!");
          navigation.navigate("Home");
        }}
      >
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bodyContainer: {
    flex: 1,
  },

  inputStyle: {
    marginVertical: 10,
    width: "80%",
  },
});

export default Register;
