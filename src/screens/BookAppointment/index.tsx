import { StackScreenProps } from "@react-navigation/stack";
import { FC, useEffect, useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LocaleConfig } from "react-native-calendars";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import ArrowLeft from "src/assets/icons/ArrowLeft";
import ArrowRight from "src/assets/icons/ArrowRight";
import { Card, CardWithRadioButton } from "src/components";
import { useLazyGetDoctorScheduleQuery } from "src/services/modules/doctor";
import { HomeRoutes, HomeStackParamList } from "src/types";
import { getFontFamily } from "src/utils/fontFamily";
import PlusIcon from "src/assets/icons/Plus.svg";
import { useAppSelector } from "src/store";
import { ProfileRoutes } from "src/types/navigation-enums";
import { useLazyMakeAppointmentQuery } from "src/services/modules/owner";

type BookAppointmentScreenProps = StackScreenProps<
  HomeStackParamList,
  HomeRoutes.BookAppointment
>;

export const BookAppointmentScreen: FC<BookAppointmentScreenProps> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;
  const userData = useAppSelector(state => state.owner);

  const [fetchSchedule, { status, data }] = useLazyGetDoctorScheduleQuery();
  // console.log(data);

  const [
    makeAppointment,
    { status: appointmentStatus, data: appointmentData },
  ] = useLazyMakeAppointmentQuery();

  const [step, setStep] = useState(1);
  const [activeDate, setActiveDate] = useState<string>();
  const [activeInterval, setActiveInterval] = useState<number>();
  const [activePetId, setActivePetId] = useState<number>();

  const [intervals] = useState(
    new Array(48).fill(0).map((_item, index) => index)
  );
  const minTimeDay = data
    ?.filter(date => date.from !== null)
    .reduce((prev, cur) => {
      if (prev.from < cur.from) {
        return prev;
      }
      return cur;
    }, data[0]);
  const maxTimeDay = data
    ?.filter(date => date.to !== null)
    .reduce((prev, cur) => {
      if (prev.to > cur.to) {
        return prev;
      }
      return cur;
    }, data[0]);

  const isNextButtonDisabled =
    step === 1 ? !(activeDate && activeInterval) : !activePetId;

  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const onBackButtonPress = () => {
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  const onNextButtonPress = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      if (activeDate && activeInterval && activePetId) {
        const hours = Math.trunc(activeInterval / 2);
        const minutes = 30 * (activeInterval % 2);
        const date = new Date(activeDate);
        const userTimezoneOffset = date.getTimezoneOffset() / 60;
        date.setHours(hours - userTimezoneOffset);
        date.setMinutes(minutes);

        // console.log("2025-05-16T12:00:00");
        console.log(date.toISOString().slice(0, 19));
        makeAppointment({
          doctorId: id,
          petId: activePetId,
          ownerId: userData.id,
          dateTime: date.toISOString().slice(0, 19),
        });
      }
    }
  };

  const onAddPetPressHandler = () => {
    navigation.navigate(HomeRoutes.AddPet);
  };

  useEffect(() => {
    fetchSchedule({ id });
  }, []);

  useEffect(() => {
    if (appointmentStatus === "fulfilled" && appointmentData) {
      navigation.pop(2);
    }
  }, [appointmentStatus, appointmentStatus]);

  return (
    <View style={[Styles.wrap, { paddingBottom: 50 + paddingBottom }]}>
      <View style={[Styles.navigationBar, { marginTop: insets.top }]}>
        <TouchableOpacity style={Styles.backButton} onPress={onBackButtonPress}>
          <ArrowLeft fill="#000" />
        </TouchableOpacity>
        <View style={Styles.progressBarInfo}>
          <Text style={Styles.progressBarText}>{`Шаг ${step}/2: ${
            step === 1 ? "Выбери удобное время" : "Выбери питомца"
          }`}</Text>
          <View style={Styles.progressBar}>
            <View
              style={[
                Styles.progress,
                { width: `${(step / 2) * 100}%` },
              ]}></View>
          </View>
        </View>
      </View>
      {step === 1 && (
        <ScrollView style={Styles.scheduleWrap} overScrollMode="never">
          <View style={Styles.schedule}>
            <View style={Styles.scheduleIntervalsWrap}>
              <View
                style={[
                  Styles.scheduleInterval,
                  { backgroundColor: "#C6BFFD" },
                ]}></View>
              {intervals.map(interval => {
                const timeStart = new Date((interval + 42) * 30 * 60 * 1000);
                const timeEnd = new Date((interval + 43) * 30 * 60 * 1000);
                const hoursStart = "0" + timeStart.getHours();
                const hoursEnd = "0" + timeEnd.getHours();
                const minutesStart = "0" + timeStart.getMinutes();
                const minutesEnd = "0" + timeEnd.getMinutes();

                const minTimeDayDate = new Date(
                  minTimeDay?.date + "T" + minTimeDay?.from
                );
                const maxTimeDayDate = new Date(
                  maxTimeDay?.date + "T" + maxTimeDay?.to
                );

                if (
                  minTimeDayDate.getHours() > timeStart.getHours() ||
                  (minTimeDayDate.getHours() === timeStart.getHours() &&
                    minTimeDayDate.getMinutes() > timeStart.getMinutes())
                ) {
                  return (
                    <View
                      key={`scheduleInterval-1-${timeStart.toISOString()}`}
                    />
                  );
                }

                if (
                  maxTimeDayDate.getHours() < timeStart.getHours() ||
                  (maxTimeDayDate.getHours() === timeStart.getHours() &&
                    maxTimeDayDate.getMinutes() === timeStart.getMinutes())
                ) {
                  return (
                    <View
                      key={`scheduleInterval-2-${timeStart.toISOString()}`}
                    />
                  );
                }

                return (
                  <View
                    style={Styles.scheduleInterval}
                    key={`scheduleInterval-${timeStart.toISOString()}`}>
                    <Text
                      style={Styles.scheduleIntervalText}>{`${hoursStart.slice(
                      -2
                    )}:${minutesStart.slice(-2)} - ${hoursEnd.slice(
                      -2
                    )}:${minutesEnd.slice(-2)}`}</Text>
                  </View>
                );
              })}
            </View>
            <ScrollView overScrollMode="never" horizontal>
              <View style={Styles.scheduleDaysWrap}>
                {data?.map(item => {
                  const date = new Date(item.date);
                  const dayOfWeek =
                    LocaleConfig.locales["ru"].dayNames[
                      date.getDay() === 0 ? 6 : date.getDay() - 1
                    ];
                  const day = "0" + date.getDate();

                  const isWorkingDay = item.isWorkingDay;

                  const startAt = new Date(item.date + "T" + item.from);
                  const endAt = new Date(item.date + "T" + item.to);

                  const minTimeDayDate = new Date(
                    minTimeDay?.date + "T" + minTimeDay?.from
                  );
                  const maxTimeDayDate = new Date(
                    maxTimeDay?.date + "T" + maxTimeDay?.to
                  );

                  return (
                    <View key={item.date} style={Styles.scheduleDay}>
                      <View style={[Styles.scheduleDayHeaderItem]}>
                        <Text style={Styles.scheduleDayHeaderDayOfWeek}>
                          {dayOfWeek}
                        </Text>
                        <Text style={Styles.scheduleDayHeaderDay}>
                          {day.slice(-2)}
                        </Text>
                      </View>
                      {intervals.map(interval => {
                        const time = new Date((interval + 42) * 30 * 60 * 1000);

                        if (
                          minTimeDayDate.getHours() > time.getHours() ||
                          (minTimeDayDate.getHours() === time.getHours() &&
                            minTimeDayDate.getMinutes() > time.getMinutes())
                        ) {
                          return (
                            <View
                              key={`scheduleDayItem-1-${
                                item.date
                              }-${time.toISOString()}`}
                            />
                          );
                        }

                        if (
                          maxTimeDayDate.getHours() < time.getHours() ||
                          (maxTimeDayDate.getHours() === time.getHours() &&
                            maxTimeDayDate.getMinutes() === time.getMinutes())
                        ) {
                          return (
                            <View
                              key={`scheduleDayItem-2-${
                                item.date
                              }-${time.toISOString()}`}
                            />
                          );
                        }

                        let isInScheduleRange = false;
                        let isAvailable = true;
                        let isBooked = false;
                        if (isWorkingDay) {
                          if (
                            // (startAt.getMinutes() === 30 &&
                            // startAt.getHours() === time.getHours() &&
                            // startAt.getMinutes() === time.getMinutes()) ||
                            // startAt.getHours() <= time.getHours()
                            (startAt.getHours() <= time.getHours() &&
                              startAt.getMinutes() <= time.getMinutes()) ||
                            startAt.getHours() < time.getHours()
                          ) {
                            if (
                              endAt.getHours() > time.getHours() ||
                              (endAt.getHours() === time.getHours() &&
                                endAt.getMinutes() > time.getMinutes())
                            ) {
                              isInScheduleRange = true;
                            }
                          }
                        }
                        // console.log({
                        //   isInScheduleRange,
                        //   time: time.getHours() + ":" + time.getMinutes(),
                        //   startAt,
                        // });

                        item.notAvailable?.forEach(arrItem => {
                          const notAvailableTime = new Date(
                            item.date + "T" + arrItem
                          );
                          if (
                            notAvailableTime.getHours() === time.getHours() &&
                            notAvailableTime.getMinutes() === time.getMinutes()
                          ) {
                            isAvailable = false;
                          }
                        });

                        item.booked?.forEach(arrItem => {
                          const bookedTime = new Date(
                            item.date + "T" + arrItem
                          );
                          if (
                            bookedTime.getHours() === time.getHours() &&
                            bookedTime.getMinutes() === time.getMinutes()
                          ) {
                            isBooked = true;
                          }
                        });

                        const isDisabled =
                          !isWorkingDay ||
                          !isInScheduleRange ||
                          !isAvailable ||
                          isBooked;

                        return (
                          <TouchableOpacity
                            key={`scheduleDayItem-${
                              item.date
                            }-${time.toISOString()}`}
                            style={[
                              Styles.scheduleDayItem,
                              isDisabled && Styles.scheduleDayItemDisabled,
                              activeDate === item.date &&
                                interval === activeInterval && {
                                  backgroundColor: "#8D7EFB",
                                },
                            ]}
                            disabled={isDisabled}
                            onPress={() => {
                              setActiveDate(item.date);
                              setActiveInterval(interval);
                            }}
                          />
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      )}
      {step === 2 && (
        <View style={Styles.petsListWrap}>
          <ScrollView style={Styles.scrollView} overScrollMode="never">
            <View style={[Styles.petsList]}>
              {userData.petsList.map((pet, index) => (
                <CardWithRadioButton
                  key={`pet-${pet.id}`}
                  text={pet.name}
                  imageBase64={pet.imageBase64}
                  onPress={() => {
                    setActivePetId(pet.id);
                  }}
                  isActive={activePetId === pet.id}
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
      )}
      <View style={Styles.buttonWrap}>
        <TouchableOpacity
          style={[Styles.button, isNextButtonDisabled && Styles.buttonDisabled]}
          onPress={onNextButtonPress}
          disabled={isNextButtonDisabled}>
          <Text style={Styles.buttonText}>
            {step === 1 ? "Далее" : "Записаться"}
          </Text>
          {step === 1 && <ArrowRight fill="#FFF" />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#F8FBFC",
  },
  navigationBar: {
    flexDirection: "row",
    gap: 22,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  progressBarInfo: {
    flex: 1,
    gap: 4,
    justifyContent: "center",
  },
  progressBarText: {
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#544864",
  },
  progressBar: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    backgroundColor: "#BDBDBD",
  },
  progress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8D7EFB",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#DDD9FE",
  },
  scheduleWrap: {
    width: "100%",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 22,
  },
  schedule: {
    width: "100%",
    flexDirection: "row",
  },
  scheduleIntervalsWrap: {
    width: 80,
  },
  scheduleInterval: {
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    width: 80,
    padding: 6,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: "#757575",
    backgroundColor: "#EEECFF",
  },
  scheduleIntervalText: {
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#544864",
    textAlign: "center",
  },
  scheduleDaysWrap: {
    flexDirection: "row",
  },
  scheduleDay: {
    width: 100,
    height: "100%",
    borderRightWidth: 1,
  },
  scheduleDayHeaderItem: {
    justifyContent: "center",
    alignItems: "center",
    height: 54,
    borderBottomWidth: 1,
    backgroundColor: "#C6BFFD",
  },
  scheduleDayHeaderDayOfWeek: {
    fontFamily: getFontFamily("medium"),
    fontSize: 12,
    color: "#424242",
  },
  scheduleDayHeaderDay: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 18,
    color: "#424242",
  },
  scheduleDayItem: {
    height: 54,
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
  },
  scheduleDayItemDisabled: {
    backgroundColor: "#E0E0E0",
  },
  petsListWrap: {
    flex: 1,
    marginBottom: -16,
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
    paddingBottom: 38,
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
  buttonWrap: {
    width: Dimensions.get("screen").width - 44,
    marginHorizontal: 22,
    borderRadius: 16,
    backgroundColor: "#F8FBFC",
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: 54,
    width: "100%",
    borderRadius: 16,
    marginBottom: 22,
    backgroundColor: "#7135FD",
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  buttonText: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#FFFFFF",
  },
});
