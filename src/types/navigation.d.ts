import {
  NavigatorScreenParams,
  CompositeScreenProps,
  StackScreenProps,
} from "@react-navigation/native/src";
import { RootRoutes, BottomTabRoutes, HomeRoutes } from "./navigation-enums";

export type RootStackParamList = {
  [RootRoutes.Doctor]: { id: string };
  [RootRoutes.Main]: undefined;
  [RootRoutes.Login]: undefined;
};

export type TabStackParamsList = {
  [BottomTabRoutes.HomeNav]: NavigatorScreenParams<HomeStackParamList>;
  [BottomTabRoutes.CalendarNav]: undefined;
  [BottomTabRoutes.ChatNav]: undefined;
  [BottomTabRoutes.ProfileNav]: undefined;
};

export type HomeStackParamList = {
  [HomeRoutes.Home]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  StackScreenProps<HomeStackParamList, T>;
