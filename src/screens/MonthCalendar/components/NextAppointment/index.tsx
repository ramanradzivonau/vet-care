import { FC } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { categories } from "src/screens/Home/mock";
import { CATEGORIES } from "src/screens/Home/types";
import { getFontFamily } from "src/utils/fontFamily";
import CalendarIcon from "../../calendar.svg";
import { LocaleConfig } from "react-native-calendars";
interface NextAppointmentProps {
  imageBase64: string;
  doctorFullName: string;
  specialisation: CATEGORIES;
  dateTime: string;
}
export const NextAppointment: FC<NextAppointmentProps> = ({
  imageBase64,
  doctorFullName,
  specialisation,
  dateTime,
}) => {
  const date = new Date(dateTime);
  return (
    <View style={Styles.wrap}>
      <View style={Styles.divider} />
      <View style={Styles.container}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          resizeMode="cover"
          style={Styles.image}
        />
        <View style={Styles.info}>
          <Text style={Styles.fullname}>{doctorFullName}</Text>
          <Text style={Styles.specialisation}>
            {categories.find(item => item.category === specialisation)?.label}
          </Text>
        </View>
      </View>
      <View style={Styles.dateWrap}>
        <CalendarIcon />
        <Text style={Styles.date}>
          {LocaleConfig.locales["ru"].monthNamesShort[date.getMonth()] +
            " " +
            date.getDate() +
            " " +
            date.getFullYear()}
        </Text>
        <Text style={Styles.time}>
          {("0" + date.getHours()).slice(-2) +
            ":" +
            ("0" + date.getMinutes()).slice(-2)}
        </Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    width: "100%",
    height: 90,
    borderRadius: 16,
    backgroundColor: "#FFF",
    marginBottom: 12,
    elevation: 3,
    overflow: "hidden",
  },
  divider: {
    height: "100%",
    width: 10,
    backgroundColor: "#7135FD",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    gap: 14,
    paddingVertical: 7,
    paddingHorizontal: 14,
  },
  image: {
    height: "100%",
    aspectRatio: 1,
    borderRadius: 7,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    gap: 2,
    // backgroundColor: "#f00",
  },
  fullname: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 14,
    color: "#000",
  },
  specialisation: {
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#8D7EFB",
  },
  dateWrap: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderLeftWidth: 1,
    borderColor: "#BDBDBD",
  },
  date: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 12,
    color: "#000",
    marginTop: 4,
  },
  time: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 14,
    color: "#8D7EFB",
  },
});
