import "./gesture-handler";
import type { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "src/store";
import Toast from "react-native-toast-message";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
