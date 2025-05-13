import { FC } from "react";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ArrowLeft from "src/assets/icons/ArrowLeft";
import { HomeRoutes, HomeStackParamList } from "src/types";
import { Shadow } from "react-native-shadow-2";
import { getFontFamily } from "src/utils/fontFamily";
import ArrowRight from "src/assets/icons/ArrowRight";
import { useAppSelector } from "src/store";
import { LocaleConfig } from "react-native-calendars";

type DoctorScreenProps = StackScreenProps<
  HomeStackParamList,
  HomeRoutes.Doctor
>;

export const DoctorScreen: FC<DoctorScreenProps> = ({ navigation, route }) => {
  const doctorsData = useAppSelector(state => state.doctor.doctorsByCategory);

  const { id } = route.params;
  const { category } = route.params;

  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const doctorInfo = doctorsData
    .find(doctors => doctors.specialisation === category)
    ?.doctors.find(doctor => doctor.id === id)!;

  const onBookAppointmentButtonPress = () => {
    // navigation.navigate(RootRoutes.BookAppointment, { id });
  };

  const currentDay = new Date().toISOString().slice(0, 10);

  return (
    <View style={[Styles.wrap, { paddingBottom: 50 + paddingBottom }]}>
      <ScrollView style={Styles.scrollView} overScrollMode="never">
        <View style={Styles.scrollViewContainer}>
          <ImageBackground
            source={{ uri: `data:image/jpeg;base64,${doctorInfo.imageBase64}` }}
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
              startColor="#7135FD60">
              <Text style={Styles.fullName}>{doctorInfo.fullName}</Text>
              <View style={Styles.tagsContainer}>
                {doctorInfo.hashTags.map(tag => (
                  <View key={tag} style={Styles.tag}>
                    <Text style={Styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
              <Text style={Styles.description}>{doctorInfo.description}</Text>
              <View style={Styles.scheduleContainer}>
                <Text style={Styles.scheduleTitle}>
                  {doctorInfo.schedule
                    ? "Даты ближайший приемов:"
                    : "В ближайшее время врач не принимает"}
                </Text>
                {doctorInfo.schedule && (
                  <View style={Styles.scheduleDaysContainer}>
                    {doctorInfo.schedule?.slice(0, 5)?.map(day => {
                      const date = new Date(day);
                      const dateString = date.toISOString().slice(0, 10);
                      console.log({ date });

                      const dayOfWeek =
                        LocaleConfig.locales["ru"].dayNamesShort[
                          date.getDay() === 0 ? 6 : date.getDay() - 1
                        ];
                      return (
                        <View key={day} style={Styles.scheduleDay}>
                          <Text style={Styles.scheduleDayOfWeek}>
                            {dayOfWeek}
                          </Text>
                          <Text
                            style={[
                              Styles.scheduleDate,
                              currentDay === dateString && {
                                color: "#7D16FF",
                              },
                            ]}>
                            {date.getDate()}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
              <View style={Styles.buttonsContainer}>
                <TouchableOpacity
                  style={[
                    Styles.bookButton,
                    doctorInfo.schedule === null && Styles.bookButtonDisabled,
                  ]}
                  onPress={onBookAppointmentButtonPress}
                  disabled={doctorInfo.schedule === null}>
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
  description: {
    marginTop: 20,
    fontFamily: getFontFamily("light"),
    fontSize: 16,
    color: "#544864",
  },
  scheduleContainer: {
    marginTop: 16,
  },
  scheduleTitle: {
    fontFamily: getFontFamily("medium"),
    fontSize: 18,
    color: "#544864",
  },
  scheduleDaysContainer: {
    marginTop: 20,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  scheduleDay: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FAFAFB",
    elevation: 1,
  },
  scheduleDayOfWeek: {
    fontFamily: getFontFamily("regular"),
    fontSize: 14,
    color: "#9BA1A8",
  },
  scheduleDate: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 18,
    color: "#000000",
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
  bookButtonDisabled: {
    backgroundColor: "#9BA1A8",
  },
  bookButtonText: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#FFFFFF",
  },
});

// F8FBFC;
