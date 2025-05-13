import { FC } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ProfileStackParamList } from "src/types/navigation";
import { ProfileRoutes } from "src/types/navigation-enums";
import { StyleSheet } from "react-native";
import { ProfileScreen } from "src/screens/Profile";
import { AddPetScreen } from "src/screens/AddPet";
import { PetsListScreen } from "src/screens/PetsList";
import { PetScreen } from "src/screens/Pet";

const ProfileStack = createStackNavigator<ProfileStackParamList>();

export const ProfileNavigator: FC = () => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: Styles.cardStyle,
      }}
      initialRouteName={ProfileRoutes.Profile}>
      <ProfileStack.Screen
        name={ProfileRoutes.Profile}
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name={ProfileRoutes.AddPet}
        component={AddPetScreen}
      />
      <ProfileStack.Screen
        name={ProfileRoutes.PetsList}
        component={PetsListScreen}
      />
      <ProfileStack.Screen name={ProfileRoutes.Pet} component={PetScreen} />
    </ProfileStack.Navigator>
  );
};

const Styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: "#F8FBFC",
  },
});
