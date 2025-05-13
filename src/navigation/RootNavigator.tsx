import { FC, useEffect } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import {
  LoginScreen,
  SignupScreen,
  WelcomeScreen,
  DoctorScreen,
} from "src/screens";
import { RootRoutes, RootStackParamList } from "src/types";
import { BookAppointmentScreen } from "src/screens/BookAppointment";
import changeNavigationBarColor from "react-native-navigation-bar-color";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator: FC = () => {
  useEffect(() => {
    changeNavigationBarColor("#FFFFFF", true, false);
  }, []);

  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalFadeTransition,
      }}
      initialRouteName={RootRoutes.Welcome}>
      <RootStack.Screen name={RootRoutes.Welcome} component={WelcomeScreen} />
      <RootStack.Screen name={RootRoutes.Login} component={LoginScreen} />
      <RootStack.Screen name={RootRoutes.Signup} component={SignupScreen} />

      <RootStack.Screen name={RootRoutes.Main} component={BottomTabNavigator} />
      <RootStack.Screen
        name={RootRoutes.BookAppointment}
        component={BookAppointmentScreen}
      />
    </RootStack.Navigator>
  );
};
