import {
  NavigatorScreenParams,
  CompositeScreenProps,
} from "@react-navigation/native/src";
import { RootRoutes, BottomTabRoutes } from "./navigation-enums";

export type RootStackParamList = {
  [RootRoutes.Main]: undefined;
};

export type TabStackParamsList = {
  [BottomTabRoutes.HomeNav]: undefined;
  [BottomTabRoutes.CalendarNav]: undefined;
  [BottomTabRoutes.ChatNav]: undefined;
  [BottomTabRoutes.ProfileNav]: undefined;
};
