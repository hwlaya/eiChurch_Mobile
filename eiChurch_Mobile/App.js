import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as eva from "@eva-design/eva";
import { ApplicationProvider } from "@ui-kitten/components";
import MainNavigation from "./src/Navigation/MainNavigation";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <MainNavigation />
    </ApplicationProvider>
  );
}

export default App;
