import { FC } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { BookAppointmentScreen, DoctorScreen, HomeScreen } from "src/screens";
import { HomeStackParamList } from "src/types/navigation";
import { HomeRoutes } from "src/types/navigation-enums";
import { StyleSheet } from "react-native";
import { AddPetScreen } from "src/screens/AddPet";

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
      <HomeStack.Screen
        name={HomeRoutes.BookAppointment}
        component={BookAppointmentScreen}
      />
      <HomeStack.Screen name={HomeRoutes.AddPet} component={AddPetScreen} />
    </HomeStack.Navigator>
  );
};

const Styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#F8FBFC",
  },
});
