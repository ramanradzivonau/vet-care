import {
  NavigatorScreenParams,
  CompositeScreenProps,
  StackScreenProps,
} from "@react-navigation/native/src";
import {
  RootRoutes,
  BottomTabRoutes,
  HomeRoutes,
  CalendarRoutes,
} from "./navigation-enums";

export type RootStackParamList = {
  [RootRoutes.BookAppointment]: { id: string };
  [RootRoutes.Doctor]: { id: string };
  [RootRoutes.Main]: undefined;
  [RootRoutes.Login]: undefined;
};

export type TabStackParamsList = {
  [BottomTabRoutes.HomeNav]: NavigatorScreenParams<HomeStackParamList>;
  [BottomTabRoutes.CalendarNav]: undefined;
  // [BottomTabRoutes.ChatNav]: undefined;
  [BottomTabRoutes.ProfileNav]: undefined;
};

export type HomeStackParamList = {
  [HomeRoutes.Home]: undefined;
};

export type CalendarStackParamList = {
  [CalendarRoutes.Month]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type CalendarStackScreenProps<T extends keyof CalendarStackParamList> =
  StackScreenProps<CalendarStackParamList, T>;
