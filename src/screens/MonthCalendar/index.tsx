import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-calendars";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Header, NextAppointment } from "./components";
import { getFontFamily } from "src/utils/fontFamily";

export const MonthCalendarScreen: FC = () => {
  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  return (
    <View style={Styles.wrap}>
      <SafeAreaView
        style={[Styles.safeArea, { paddingBottom: 50 + paddingBottom }]}>
        <Calendar
          current={new Date().toUTCString()}
          showSixWeeks
          enableSwipeMonths
          hideArrows
          renderHeader={(date: string) => <Header date={date} />}
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
          }}
        />
        <NextAppointment />
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
    justifyContent: "center",
    gap: 22,
    paddingHorizontal: 22,
  },
  calendar: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 38,
    borderRadius: 16,
    elevation: 6,
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
    marginBottom: 16,
  },
  dayHeader: {
    fontFamily: getFontFamily("regular"),
    fontSize: 12,
    color: "#000",
  },
  day: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  dayCurrent: {
    borderRadius: 16,
    backgroundColor: "#A259FF",
  },
  dayText: {
    marginTop: 6,
    fontFamily: getFontFamily("regular"),
    fontSize: 12,
    color: "#000",
  },
  dayTextCurrent: {
    color: "#fff",
  },
  dayDisabledText: {
    color: "#B77EFF8C",
  },
});
