import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const Header = ({
  logoSource,
  title,
  subtitle,
  logoStyle,
  titleStyle,
  subtitleStyle,
}) => {
  return (
    <View style={styles.container}>
      <Image source={logoSource} style={[styles.logo, logoStyle]} />
      <View style={styles.textContainer}>
        <View style={styles.titleContainer}>
          <Text variant="headlineSmall" style={[styles.title, titleStyle]}>
            {title}
          </Text>
        </View>
        <View style={styles.subtitleContainer}>
          <Text variant="titleMedium" style={[styles.subtitle, subtitleStyle]}>
            {subtitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 80,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 60,
    marginBottom: 20,
  },
  textContainer: {
    marginTop: -20,
    justifyContent: "flex-start",
  },
  titleContainer: {
    marginBottom: -10,
    justifyContent: "flex-start",
  },
  subtitleContainer: {
    justifyContent: "flex-start",
  },
  title: {
    marginBottom: 8,
    fontFamily: "Montserrat-SemiBold",
  },
  subtitle: {
    fontFamily: "Montserrat-Italic",
    // your subtitle style
  },
});

export default Header;
