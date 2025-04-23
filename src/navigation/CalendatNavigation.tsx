import { FC } from "react";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { CalendarStackParamList } from "src/types/navigation";
import { CalendarRoutes } from "src/types/navigation-enums";
import { MonthCalendarScreen } from "src/screens/MonthCalendar";

const CalendarStack = createStackNavigator<CalendarStackParamList>();

export const CalendarNavigator: FC = () => {
  return (
    <CalendarStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalFadeTransition,
      }}
      initialRouteName={CalendarRoutes.Month}>
      <CalendarStack.Screen
        name={CalendarRoutes.Month}
        component={MonthCalendarScreen}
      />
    </CalendarStack.Navigator>
  );
};
