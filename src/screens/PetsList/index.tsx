import { FC } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileStackParamList } from "src/types/navigation";
import { ProfileRoutes } from "src/types/navigation-enums";
import { useAppSelector } from "src/store";
import { getFontFamily } from "src/utils/fontFamily";
import PlusIcon from "src/assets/icons/Plus.svg";
import { Card } from "src/components";
import ArrowLeft from "src/assets/icons/ArrowLeft";

type PetsListScreenProps = StackScreenProps<
  ProfileStackParamList,
  ProfileRoutes.PetsList
>;

export const PetsListScreen: FC<PetsListScreenProps> = ({ navigation }) => {
  const userData = useAppSelector(state => state.owner);

  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const onBackButtonPress = () => {
    navigation.goBack();
  };

  const onAddPetPressHandler = () => {
    navigation.navigate(ProfileRoutes.AddPet);
  };

  const onPetCardPressHandler = (id: number) => {
    navigation.navigate(ProfileRoutes.Pet, { id });
  };

  return (
    <View style={[Styles.wrap, { paddingBottom: 50 + paddingBottom }]}>
      <View style={[Styles.navigationBar, { marginTop: insets.top }]}>
        <TouchableOpacity style={Styles.backButton} onPress={onBackButtonPress}>
          <ArrowLeft fill="#000" />
        </TouchableOpacity>
        <Text style={Styles.navigationBarTitle}>Мои питомцы</Text>
      </View>

      <ScrollView style={Styles.scrollView} overScrollMode="never">
        <View style={[Styles.petsList]}>
          {userData.petsList.map((pet, index) => (
            <Card
              key={`pet-${pet.id}`}
              text={pet.name}
              imageBase64={pet.imageBase64}
              onPress={() => onPetCardPressHandler(pet.id)}
            />
          ))}
          <TouchableOpacity
            style={Styles.addPet}
            onPress={onAddPetPressHandler}>
            <Text style={Styles.addPetText}>Добавить питомца</Text>
            <PlusIcon />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  navigationBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#DDD9FE",
  },
  navigationBarTitle: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 20,
    color: "#544864",
  },
  scrollView: {
    flex: 1,
  },
  petsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 24,
    columnGap: 18,
    paddingTop: 12,
    paddingBottom: 22,
    paddingHorizontal: 22,
  },
  addPet: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: Dimensions.get("screen").width / 2 - 31,
    height: 210,
    borderWidth: 2,
    borderColor: "#8D7EFB",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
  addPetText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 18,
    color: "#8D7EFB",
    textAlign: "center",
  },
});
