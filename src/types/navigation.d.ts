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
  ProfileRoutes,
} from "./navigation-enums";
import { CATEGORIES } from "src/screens/Home/types";

export type RootStackParamList = {
  [RootRoutes.Main]: undefined;
  [RootRoutes.Welcome]: undefined;
  [RootRoutes.Login]: undefined;
  [RootRoutes.Signup]: undefined;
};

export type TabStackParamsList = {
  [BottomTabRoutes.HomeNav]: NavigatorScreenParams<HomeStackParamList>;
  [BottomTabRoutes.CalendarNav]: undefined;
  // [BottomTabRoutes.ChatNav]: undefined;
  [BottomTabRoutes.ProfileNav]: undefined;
};

export type HomeStackParamList = {
  [HomeRoutes.Home]: undefined;
  [HomeRoutes.AddPet]: undefined;
  [HomeRoutes.Doctor]: { id: number; category: CATEGORIES };
  [HomeRoutes.BookAppointment]: { id: number };
};

export type CalendarStackParamList = {
  [CalendarRoutes.Month]: undefined;
};

export type ProfileStackParamList = {
  [ProfileRoutes.Profile]: undefined;
  [ProfileRoutes.AddPet]: undefined;
  [ProfileRoutes.PetsList]: undefined;
  [ProfileRoutes.Pet]: { id: number };
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;

export type CalendarStackScreenProps<T extends keyof CalendarStackParamList> =
  StackScreenProps<CalendarStackParamList, T>;
