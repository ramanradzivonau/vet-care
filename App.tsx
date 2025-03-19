import "./gesture-handler";
import type { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
