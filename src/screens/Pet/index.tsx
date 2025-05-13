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
import ArrowLeft from "src/assets/icons/ArrowLeft";
import { secondStepData } from "../AddPet/mock";
import GenderBoyIcon from "src/assets/icons/GenderBoy.svg";
import GenderGirlIcon from "src/assets/icons/GenderGirl.svg";
import BirthdayIcon from "src/assets/icons/Birthday";
import PassportIcon from "src/assets/icons/Passport.svg";

type PetScreenProps = StackScreenProps<
  ProfileStackParamList,
  ProfileRoutes.Pet
>;
// dateOfBirth: Date;
// passport: string;

export const PetScreen: FC<PetScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;

  const petData = useAppSelector(state => state.owner.petsList).find(
    pet => pet.id === id
  )!;

  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const onBackButtonPress = () => {
    navigation.goBack();
  };

  const dateOfBirth = new Date(petData.dateOfBirth);
  const day = dateOfBirth.getDate();
  const month = dateOfBirth.getMonth() + 1;
  const year = dateOfBirth.getFullYear();
  const currentDate = Date.now();
  let age = (currentDate - dateOfBirth.getTime()) / (1000 * 60 * 60 * 24 * 31);
  age = age < 1 ? 1 : Math.trunc(age);

  const data = [
    {
      label: "Дата рождения",
      data: `${day < 10 ? "0" + day : day}.${
        month < 10 ? "0" + month : month
      }.${year}`,
      icon: <BirthdayIcon />,
    },
    {
      label: "Номер паспорта",
      data: petData.passport,
      icon: <PassportIcon />,
    },
  ];

  return (
    <View style={[Styles.wrap, { paddingBottom: 50 + paddingBottom }]}>
      <ScrollView style={Styles.scrollView} overScrollMode="never">
        <View style={Styles.scrollViewContainer}>
          <ImageBackground
            source={{ uri: `data:image/jpeg;base64,${petData.imageBase64}` }}
            resizeMode="cover"
            style={Styles.imageBackground}>
            <View style={[Styles.navigationBar, { marginTop: insets.top }]}>
              <TouchableOpacity
                style={Styles.backButton}
                onPress={onBackButtonPress}>
                <ArrowLeft fill="#000" />
              </TouchableOpacity>
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
              <Text style={Styles.name}>{petData.name}</Text>
              <Text style={Styles.breed}>
                {
                  secondStepData[petData.type].find(
                    item => item.breed === petData.breed
                  )?.text
                }
              </Text>
              <View style={Styles.mainInfo}>
                <View style={Styles.mainInfoItem}>
                  <Text style={Styles.mainInfoItemTitle}>Возраст</Text>
                  <Text style={Styles.mainInfoItemText}>
                    {age >= 12 ? Math.trunc(age / 12) + " г" : age + " м"}
                  </Text>
                </View>
                <View style={Styles.mainInfoItem}>
                  <Text style={Styles.mainInfoItemTitle}>Пол</Text>
                  {petData.gender === "М" ? (
                    <GenderBoyIcon width={24} height={24} />
                  ) : (
                    <GenderGirlIcon />
                  )}
                </View>
                <View style={Styles.mainInfoItem}>
                  <Text style={Styles.mainInfoItemTitle}>Вес</Text>
                  <Text style={Styles.mainInfoItemText}>{petData.weight}</Text>
                </View>
              </View>
              <View style={Styles.info}>
                <Text style={Styles.infoTitle}>Общая информация</Text>
                <View style={Styles.infoList}>
                  {data.map((dataItem, index, arr) => (
                    <View
                      key={dataItem.label}
                      style={[
                        Styles.infoListItem,
                        index !== arr.length - 1 && {
                          borderBottomWidth: 1,
                          borderBottomColor: "#EEEEEE",
                        },
                        index === 0 && {
                          paddingTop: 0,
                        },
                        index === arr.length - 1 && {
                          paddingBottom: 0,
                        },
                      ]}>
                      {dataItem.icon}
                      <View>
                        <Text style={Styles.infoListItemLabel}>
                          {dataItem.label}
                        </Text>
                        <Text style={Styles.infoListItemData}>
                          {dataItem.data}
                        </Text>
                      </View>
                    </View>
                  ))}
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
    justifyContent: "space-between",
    width: "100%",
    paddingTop: 12,
    paddingHorizontal: 22,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#FFFFFF66",
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
  name: {
    fontFamily: getFontFamily("bold"),
    fontSize: 28,
    textAlign: "center",
    color: "#544864",
  },
  breed: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 20,
    textAlign: "center",
    color: "#9E9E9E",
  },
  mainInfo: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    marginTop: 22,
  },
  mainInfoItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#8D7EFB",
  },
  mainInfoItemTitle: {
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    textAlign: "center",
    color: "#616161",
  },
  mainInfoItemText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    textAlign: "center",
    color: "#616161",
  },
  info: {
    marginTop: 16,
  },
  infoTitle: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 20,
    color: "#544864",
  },
  infoList: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 22,
    borderRadius: 16,
    marginTop: 8,
    backgroundColor: "#FFF",
    elevation: 3,
  },
  infoListItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 8,
  },
  infoListItemLabel: {
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#616161",
  },
  infoListItemData: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#212121",
  },
});
