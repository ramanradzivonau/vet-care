import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { BottomTabNavigator } from "./BottomTabNavigator";
import { LoginScreen } from "src/screens";
import { RootRoutes, RootStackParamList } from "src/types";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootNavigator: FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={RootRoutes.Login}>
      <RootStack.Screen name={RootRoutes.Login} component={LoginScreen} />
      <RootStack.Screen name={RootRoutes.Main} component={BottomTabNavigator} />
    </RootStack.Navigator>
  );
};
