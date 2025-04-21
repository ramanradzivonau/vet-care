import { FC } from "react";
import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ArrowLeft from "src/assets/icons/ArrowLeft";
import { RootRoutes, RootStackParamList } from "src/types";
import { doctorsMockData } from "../Home/mock";
import { Shadow } from "react-native-shadow-2";
import { getFontFamily } from "src/utils/fontFamily";
import RatingIcon from "src/assets/icons/RatingIcon";
import ChatIcon from "src/assets/icons/ChatIcon.svg";
import ArrowRight from "src/assets/icons/ArrowRight";

type DoctorScreenProps = StackScreenProps<
  RootStackParamList,
  RootRoutes.Doctor
>;

export const DoctorScreen: FC<DoctorScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const doctorInfo = doctorsMockData.find(doctor => doctor.id === id)!;
  const insets = useSafeAreaInsets();

  return (
    <View style={Styles.wrap}>
      <ScrollView style={Styles.scrollView} overScrollMode="never">
        <View style={Styles.scrollViewContainer}>
          <ImageBackground
            source={{ uri: doctorInfo.img }}
            resizeMode="cover"
            style={Styles.imageBackground}>
            <View style={[Styles.navigationBar, { marginTop: insets.top }]}>
              <TouchableOpacity
                style={Styles.backButton}
                onPress={() => navigation.goBack()}>
                <ArrowLeft fill="#000" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <View style={Styles.infoWrap}>
            <Shadow
              style={Styles.infoShadow}
              distance={10}
              startColor="#A259FF60">
              <Text style={Styles.fullName}>{doctorInfo.fullName}</Text>
              <View style={Styles.tagsContainer}>
                {doctorInfo.tags.map(tag => (
                  <View key={tag} style={Styles.tag}>
                    <Text style={Styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
              <View style={Styles.ratingContainer}>
                {new Array(5)
                  .fill(null)
                  .map((_, index) => index + 1)
                  .map(item => (
                    <RatingIcon
                      key={`rating-item-${item}`}
                      stroke="#544864"
                      fill="#EFC721"
                      width={26}
                      fillPercentage={
                        doctorInfo.rating > item
                          ? 1
                          : doctorInfo.rating - item + 1
                      }
                    />
                  ))}
              </View>
              <Text style={Styles.description}>{doctorInfo.description}</Text>
              <View style={Styles.buttonsContainer}>
                <TouchableOpacity style={Styles.messageButton}>
                  <ChatIcon />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.bookButton}>
                  <Text style={Styles.bookButtonText}>Забронировать</Text>
                  <ArrowRight fill="#FFF" />
                </TouchableOpacity>
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
    width: "100%",
    paddingTop: 12,
    paddingHorizontal: 22,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 16,
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
    backgroundColor: "#F8F2FF",
  },
  fullName: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 24,
    textAlign: "center",
    color: "#544864",
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
    marginTop: 6,
  },
  tag: {
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: "#DDC2FF",
  },
  tagText: {
    fontFamily: getFontFamily("regular"),
    fontSize: 16,
    color: "#A259FF",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 5,
    marginTop: 16,
  },
  description: {
    marginTop: 20,
    fontFamily: getFontFamily("light"),
    fontSize: 16,
    color: "#544864",
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: "flex-end",
    flex: 1,
    flexDirection: "row",
    gap: 12,
  },
  messageButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    width: 54,
    borderRadius: 16,
    backgroundColor: "#7D16FF",
    elevation: 5,
  },
  bookButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#7D16FF",
    elevation: 5,
  },
  bookButtonText: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#FFFFFF",
  },
});
