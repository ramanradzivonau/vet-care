import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Header, NextAppointment } from "./components";
import { getFontFamily } from "src/utils/fontFamily";
import LeftArrow from "./left.svg";
import RightArrow from "./right.svg";
import { useAppSelector } from "src/store";
import { categories } from "../Home/mock";

const compare = (a, b) => {
  if (a.dateTime < b.dateTime) {
    return -1;
  }
  if (a.dateTime > b.dateTime) {
    return 1;
  }
  return 0;
};

export const MonthCalendarScreen: FC = () => {
  const appointments = useAppSelector(state => state.owner.appointments);
  const currDate = new Date(Date.now());
  const userTimezoneOffset = currDate.getTimezoneOffset() / 60;
  currDate.setHours(-userTimezoneOffset);

  console.log({ currDate: currDate });
  const markersDates = appointments.reduce((prev, curr) => {
    const date = new Date(curr.dateTime);
    console.log("2", new Date(curr.dateTime).getTime());
    return {
      ...prev,
      [curr.dateTime.slice(0, 10)]: {
        marked: true,
        dotColor: currDate.getTime() < date.getTime() ? "#7135FD" : "#9E9E9E",
      },
    };
  }, {});

  console.log(markersDates);
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  return (
    <View style={Styles.wrap}>
      <SafeAreaView
        style={[Styles.safeArea, { paddingBottom: 50 + paddingBottom }]}>
        <View style={Styles.calendarWrap}>
          <Calendar
            current={new Date().toUTCString()}
            showSixWeeks
            enableSwipeMonths
            // hideArrows
            renderArrow={(direction: "left" | "right") =>
              direction === "left" ? <LeftArrow /> : <RightArrow />
            }
            renderHeader={(date: string) => <Header date={date} />}
            markedDates={markersDates}
            style={Styles.calendar}
            theme={{
              "stylesheet.calendar.header": {
                week: Styles.weekHeader,
                dayHeader: Styles.dayHeader,
              },
              "stylesheet.calendar.main": { week: Styles.week },
              "stylesheet.day.basic": {
                base: Styles.day,
                today: Styles.dayCurrent,
                text: Styles.dayText,
                todayText: Styles.dayTextCurrent,
                disabledText: Styles.dayDisabledText,
              },
              "stylesheet.dot": {
                dot: Styles.dot,
              },
            }}
          />
        </View>
        <View style={Styles.appointmentWrap}>
          <Text style={Styles.appointmentTitle}>Ближайшие записи:</Text>
          {appointments
            .filter(appointment => {
              const date = new Date(appointment.dateTime);
              return currDate.getTime() < date.getTime();
            })
            .sort(compare)
            .slice(0, 2)
            .map(appointment => (
              <NextAppointment
                key={appointment.id}
                imageBase64={appointment.doctor.imageBase64}
                doctorFullName={appointment.doctor.name}
                specialisation={appointment.doctor.specialisation}
                dateTime={appointment.dateTime}
              />
            ))}
          {/* <NextAppointment /> */}
          {appointments.length === 0 && (
            <View style={Styles.noAppointment}>
              <Text style={Styles.noAppointmentText}>У вас нет записей</Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#F8FBFC",
  },
  safeArea: {
    flex: 1,
    gap: 22,
    paddingHorizontal: 22,
  },
  calendarWrap: {
    flex: 0.6,
    justifyContent: "center",
  },
  calendar: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderRadius: 16,
    elevation: 3,
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  week: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  dayHeader: {
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#000",
    marginTop: 8,
  },
  day: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCurrent: {
    borderRadius: 20,
    backgroundColor: "#DDD9FE",
  },
  dayText: {
    marginTop: 6,
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#000",
  },
  dayTextCurrent: {
    color: "#000",
  },
  dayDisabledText: {
    color: "#B0A5FD",
  },
  appointmentWrap: {
    flex: 0.4,
    gap: 12,
  },
  appointmentTitle: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 18,
    color: "#000",
  },
  dot: {
    width: 6,
    height: 6,
    marginTop: 1,
    marginHorizontal: 1,
    borderRadius: "100%",
  },
  noAppointment: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    minHeight: 90,
    borderRadius: 16,
    backgroundColor: "#FFF",
    elevation: 3,
  },
  noAppointmentText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#757575",
  },
});
