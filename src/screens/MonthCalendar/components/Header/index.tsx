import { FC } from "react";
import { StyleSheet, Text } from "react-native";
import { LocaleConfig } from "react-native-calendars";
import { getFontFamily } from "src/utils/fontFamily";

interface HeaderProps {
  date: string;
}

export const Header: FC<HeaderProps> = ({ date }) => {
  const currentDate = new Date(date);
  const month = LocaleConfig.locales["ru"].monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return <Text style={Styles.text}>{month + " " + year}</Text>;
};

const Styles = StyleSheet.create({
  text: {
    // paddingBottom: 12,
    fontFamily: getFontFamily("semiBold"),
    fontSize: 22,
    color: "#544864",
  },
});
