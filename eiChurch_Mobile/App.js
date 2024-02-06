import React from "react";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import * as eva from "@eva-design/eva";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigation from "./src/Navigation/MainNavigation";
import { useFonts } from "expo-font";

const App = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Black": require("./src/assets/fonts/Montserrat-Black.ttf"),
    "Montserrat-BlackItalic": require("./src/assets/fonts/Montserrat-BlackItalic.ttf"),
    "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
    "Montserrat-BoldItalic": require("./src/assets/fonts/Montserrat-BoldItalic.ttf"),
    "Montserrat-ExtraLight": require("./src/assets/fonts/Montserrat-ExtraLight.ttf"),
    "Montserrat-ExtraLightItalic": require("./src/assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Montserrat-Italic": require("./src/assets/fonts/Montserrat-Italic.ttf"),
    "Montserrat-Light": require("./src/assets/fonts/Montserrat-Light.ttf"),
    "Montserrat-LightItalic": require("./src/assets/fonts/Montserrat-LightItalic.ttf"),
    "Montserrat-Medium": require("./src/assets/fonts/Montserrat-Medium.ttf"),
    "Montserrat-MediumItalic": require("./src/assets/fonts/Montserrat-MediumItalic.ttf"),
    "Montserrat-Regular": require("./src/assets/fonts/Montserrat-Regular.ttf"),
    "Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-SemiBoldItalic": require("./src/assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Montserrat-Thin": require("./src/assets/fonts/Montserrat-Thin.ttf"),
    "Montserrat-ThinItalic": require("./src/assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <MainNavigation />
      </ApplicationProvider>
    </SafeAreaProvider>
  );
};

export default App;
