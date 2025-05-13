import { FC, useState } from "react";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  View,
  Text,
} from "react-native";
import BirthdayIcon from "src/assets/icons/Birthday";
import DateTimePicker, {
  DateType,
  useDefaultStyles,
} from "react-native-ui-datepicker";
import { getFontFamily } from "src/utils/fontFamily";
import { LocaleConfig } from "react-native-calendars";

interface DataPickerProps {
  selectedDate: Date | undefined;
  onSelect: (date: Date) => void;
}

export const DataPicker: FC<DataPickerProps> = ({
  selectedDate: initialDate,
  onSelect,
}) => {
  const [isActive, setIsActive] = useState(false);
  const defaultStyles = useDefaultStyles();
  const [selected, setSelected] = useState<DateType>(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialDate
  );

  const onSelectDate = ({ date }: { date: DateType }) => {
    const selectedDate = new Date(date);
    setSelected(date);
    setSelectedDate(selectedDate);
    onSelect(selectedDate);
  };

  return (
    <>
      <TouchableOpacity style={Styles.wrap} onPress={() => setIsActive(true)}>
        <View style={Styles.iconWrap}>
          <BirthdayIcon />
        </View>
        <View style={Styles.birthdayInfo}>
          <Text style={Styles.birthdayTitle}>День Рождения</Text>
          <Text style={Styles.birthdayText}>
            {selectedDate
              ? `${
                  LocaleConfig.locales["ru"].monthNamesShort[
                    selectedDate.getMonth()
                  ]
                } ${selectedDate.getDate()} ${selectedDate.getFullYear()}`
              : "- / - / -"}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="none"
        transparent={true}
        visible={isActive}
        onRequestClose={() => {
          setIsActive(false);
        }}
        statusBarTranslucent={true}>
        <Pressable
          style={Styles.modalContainer}
          onPress={() => {
            setIsActive(false);
          }}>
          <View style={Styles.dataPickerWrap}>
            <DateTimePicker
              mode="single"
              date={selected}
              showOutsideDays={true}
              onChange={onSelectDate}
              locale="ru"
              styles={{
                ...defaultStyles,
                ...Styles,
              }}
              maxDate={Date.now()}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    gap: 12,
    width: "100%",
    padding: 12,
    borderWidth: 2,
    borderColor: "#C6BFFD",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  iconWrap: {
    justifyContent: "center",
    alignItems: "center",
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: "#DDD9FE",
  },
  birthdayInfo: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center",
    justifyContent: "center",
    // height: "100%",
  },
  birthdayTitle: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 15,
    color: "#424242",
  },
  birthdayText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 13,
    color: "#9E9E9E",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 22,
    backgroundColor: "#00000030",
  },
  dataPickerWrap: {
    width: "100%",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#fff",
    elevation: 3,
  },
  month_selector_label: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 15,
    color: "#424242",
    textTransform: "capitalize",
  },
  year_selector_label: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 15,
    color: "#424242",
  },
  weekday_label: {
    fontFamily: getFontFamily("medium"),
    fontSize: 13,
    color: "#424242",
    textTransform: "capitalize",
  },
  today: {
    backgroundColor: "#DDD9FE",
    borderRadius: "50%",
    aspectRatio: 1,
  },
  day_label: {
    fontFamily: getFontFamily("medium"),
    fontSize: 13,
    color: "#424242",
  },
  outside_label: {
    color: "#B0A5FD",
  },
  disabled_label: {
    color: "#BDBDBD",
  },
  selected: {
    backgroundColor: "#7135FD",
    borderRadius: "50%",
    aspectRatio: 1,
  },
  selected_label: { color: "#FFFFFF" },
  month: {
    borderWidth: 2,
    borderColor: "#C6BFFD",
    borderRadius: 16,
  },
  month_label: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 15,
    color: "#424242",
    textTransform: "capitalize",
    padding: 0,
  },
  selected_month: {
    backgroundColor: "#DDD9FE",
    borderColor: "#7135FD",
  },
  selected_month_label: {},
  year: {
    borderWidth: 2,
    borderColor: "#C6BFFD",
    borderRadius: 16,
  },
  year_label: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 15,
    color: "#424242",
    textTransform: "capitalize",
    padding: 0,
  },
  selected_year: {
    backgroundColor: "#C6BFFD",
    borderColor: "#7135FD",
  },
  selected_year_label: {},
  active_year: {
    backgroundColor: "#DDD9FE",
    borderColor: "#DDD9FE",
  },
});
