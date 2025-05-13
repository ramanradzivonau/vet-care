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
import { Shadow } from "react-native-shadow-2";
import DotsIcon from "src/assets/icons/Dots.svg";
import PlusIcon from "src/assets/icons/Plus.svg";
import ArrowRight from "src/assets/icons/ArrowRight";
import { Card } from "src/components";

type ProfileScreenProps = StackScreenProps<
  ProfileStackParamList,
  ProfileRoutes.Profile
>;

export const ProfileScreen: FC<ProfileScreenProps> = ({ navigation }) => {
  const userData = useAppSelector(state => state.owner);

  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const onAddPetPressHandler = () => {
    navigation.navigate(ProfileRoutes.AddPet);
  };

  const onViewAllButtonPressHandler = () => {
    navigation.navigate(ProfileRoutes.PetsList);
  };

  const onPetCardPressHandler = (id: number) => {
    navigation.navigate(ProfileRoutes.Pet, { id });
  };

  return (
    <View style={[Styles.wrap, { paddingBottom: 50 + paddingBottom }]}>
      <ScrollView style={Styles.scrollView} overScrollMode="never">
        <View style={Styles.scrollViewContainer}>
          <ImageBackground
            source={{ uri: `data:image/jpeg;base64,${userData.imageBase64}` }}
            resizeMode="cover"
            style={Styles.imageBackground}>
            <View style={[Styles.navigationBar, { marginTop: insets.top }]}>
              <TouchableOpacity
                style={Styles.settingsButton}
                onPress={() => {}}>
                <DotsIcon />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={Styles.infoWrap}>
            <Shadow
              style={Styles.infoShadow}
              distance={10}
              startColor="#7135FD60">
              <View>
                <Text style={Styles.fullName}>
                  {userData.name + " " + userData.surname}
                </Text>
                <Text style={Styles.email}>{userData.email}</Text>
                <Text style={Styles.phone}>{userData.telephoneNumber}</Text>
              </View>
              <View style={Styles.petsContainer}>
                <Text style={Styles.petsTitle}>Мои питомцы: </Text>
                <View style={[Styles.petsList]}>
                  {userData.petsList.length === 0 && (
                    <TouchableOpacity
                      style={Styles.addPet}
                      onPress={onAddPetPressHandler}>
                      <Text style={Styles.addPetText}>Добавить питомца</Text>
                      <PlusIcon />
                    </TouchableOpacity>
                  )}
                  {userData.petsList.length === 1 && (
                    <>
                      {userData.petsList.map(pet => (
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
                    </>
                  )}
                  {userData.petsList.length >= 2 && (
                    <>
                      {userData.petsList.slice(0, 2).map((pet, index) => (
                        <Card
                          key={`pet-${pet.id}`}
                          text={pet.name}
                          imageBase64={pet.imageBase64}
                          onPress={() => onPetCardPressHandler(pet.id)}
                          style={index === 0 ? {} : Styles.secondPetStyle}
                        />
                      ))}
                      <TouchableOpacity
                        style={Styles.viewAllButton}
                        onPress={onViewAllButtonPressHandler}>
                        <ArrowRight fill="#7135FD" />
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            </Shadow>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    minHeight: "100%",
  },
  imageBackground: {
    height: Dimensions.get("screen").width,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    paddingTop: 12,
    paddingHorizontal: 22,
  },
  settingsButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF66",
  },
  infoWrap: {
    flex: 1,
    minHeight: "50%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
  },
  infoShadow: {
    width: "100%",
    height: "100%",
    paddingVertical: 22,
    paddingHorizontal: 22,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#F8FBFC",
  },
  fullName: {
    fontFamily: getFontFamily("bold"),
    fontSize: 28,
    textAlign: "center",
    color: "#544864",
  },
  email: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 20,
    textAlign: "center",
    color: "#7D16FF",
  },
  phone: {
    marginTop: 4,
    fontFamily: getFontFamily("regular"),
    fontSize: 18,
    textAlign: "center",
    color: "#544864",
  },
  petsContainer: {
    marginTop: 18,
    flex: 1,
  },
  petsTitle: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 20,
    color: "#544864",
  },
  petsList: {
    marginTop: 12,
    flexDirection: "row",
    gap: 18,
  },
  secondPetStyle: {
    left: -27,
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
  viewAllButton: {
    position: "absolute",
    right: 0,
    top: 78,
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    elevation: 3,
  },
});
