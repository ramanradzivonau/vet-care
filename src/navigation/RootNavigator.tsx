import { FC } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootRoutes, RootStackParamList } from "src/types";
import { BottomTabNavigator } from "./BottomTabNavigator";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator: FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <RootStack.Screen name={RootRoutes.Main} component={BottomTabNavigator} />
    </RootStack.Navigator>
  );
};
