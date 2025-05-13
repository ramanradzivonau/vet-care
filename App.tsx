import "./gesture-handler";
import type { JSX } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "src/navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "src/store";
import Toast from "react-native-toast-message";
import { LocaleConfig } from "react-native-calendars";

LocaleConfig.locales["ru"] = {
  monthNames: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthNamesShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июнь",
    "Июль",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  dayNames: [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ],
  dayNamesShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  today: "Сегодня",
};

LocaleConfig.defaultLocale = "ru";

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
