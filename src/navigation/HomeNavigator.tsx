import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "src/screens";
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
    </HomeStack.Navigator>
  );
};

const Styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#F8F2FF",
  },
});
