import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootRoutes, RootStackParamList } from "src/types";

type BookAppointmentScreenProps = StackScreenProps<
  RootStackParamList,
  RootRoutes.BookAppointment
>;

const getHoursArr = () => {
  const hours = new Array(24).fill(null);
};

export const BookAppointmentScreen: FC<BookAppointmentScreenProps> = () => {
  const days = new Array(14).fill(null);
  const hours = new Array(24).fill(null);

  return (
    <SafeAreaView style={Styles.wrap}>
      <View style={Styles.table}>
        {days.map(item => (
          <View style={Styles.column}></View>
        ))}
      </View>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#F8F2FF",
  },
  table: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,

    // backgroundColor: "#f00",
  },
  column: {
    borderLeftWidth: 1,
    width: 100,
    height: "100%",
    // backgroundColor: "#f00",
  },
});
