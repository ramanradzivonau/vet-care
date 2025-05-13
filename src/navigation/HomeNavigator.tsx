import { FC } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { DoctorScreen, HomeScreen } from "src/screens";
import { HomeStackParamList } from "src/types/navigation";
import { HomeRoutes } from "src/types/navigation-enums";
import { StyleSheet } from "react-native";

const HomeStack = createStackNavigator<HomeStackParamList>();

export const HomeNavigator: FC = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: Styles.cardStyle,
      }}
      initialRouteName={HomeRoutes.Home}>
      <HomeStack.Screen name={HomeRoutes.Home} component={HomeScreen} />
      <HomeStack.Screen name={HomeRoutes.Doctor} component={DoctorScreen} />
    </HomeStack.Navigator>
  );
};

const Styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#F8FBFC",
  },
});
