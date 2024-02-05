import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainNavigation from "./src/Navigation/MainNavigation";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <SafeAreaProvider>
          <MainNavigation />
        </SafeAreaProvider>
      </ApplicationProvider>
    </>
  );
}

export default App;
