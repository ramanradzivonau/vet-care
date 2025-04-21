import { FC } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { LoginScreen } from "src/screens";
import { RootRoutes, RootStackParamList } from "src/types";
import { DoctorScreen } from "src/screens/Doctor";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator: FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalFadeTransition,
      }}
      initialRouteName={RootRoutes.Login}>
      <RootStack.Screen name={RootRoutes.Login} component={LoginScreen} />
      <RootStack.Screen name={RootRoutes.Main} component={BottomTabNavigator} />
      <RootStack.Screen name={RootRoutes.Doctor} component={DoctorScreen} />
    </RootStack.Navigator>
  );
};
