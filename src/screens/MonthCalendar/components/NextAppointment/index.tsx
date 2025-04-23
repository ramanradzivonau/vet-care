import { FC } from "react";
import { StyleSheet, View } from "react-native";

export const NextAppointment: FC = () => {
  return <View style={Styles.wrap}></View>;
};

const Styles = StyleSheet.create({
  wrap: {
    width: "100%",
    minHeight: 90,
    borderRadius: 16,
    backgroundColor: "#FFF",
    elevation: 6,
  },
});
