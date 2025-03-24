import {
  NavigatorScreenParams,
  CompositeScreenProps,
  StackScreenProps,
} from "@react-navigation/native/src";
import { RootRoutes, BottomTabRoutes } from "./navigation-enums";

export type RootStackParamList = {
  [RootRoutes.Main]: undefined;
  [RootRoutes.Login]: undefined;
};

export type TabStackParamsList = {
  [BottomTabRoutes.HomeNav]: undefined;
  [BottomTabRoutes.CalendarNav]: undefined;
  [BottomTabRoutes.ChatNav]: undefined;
  [BottomTabRoutes.ProfileNav]: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;
