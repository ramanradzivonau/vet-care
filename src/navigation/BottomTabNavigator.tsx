import React, { FC } from "react";
import { Platform, View, TouchableWithoutFeedback } from "react-native";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { HomeIcon } from "src/assets/BottomTabNavigation/HomeIcon";
import { CalendarIcon } from "src/assets/BottomTabNavigation/CalendarIcon";
import { ChatIcon } from "src/assets/BottomTabNavigation/ChatIcon";
import { ProfileIcon } from "src/assets/BottomTabNavigation/ProfileIcon";
import { TabStackParamsList } from "src/types/navigation";
import { BottomTabRoutes } from "src/types/navigation-enums";

const Tab = createBottomTabNavigator<TabStackParamsList>();

export const BottomTabNavigator: FC = () => {
  return (
    <Tab.Navigator
      detachInactiveScreens={false}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name={BottomTabRoutes.HomeNav}
        children={() => (
          <View
            style={{
              flex: 1,
              paddingBottom: 60,
              backgroundColor: "#fff",
            }}></View>
        )}
      />
      <Tab.Screen
        name={BottomTabRoutes.CalendarNav}
        children={() => (
          <View
            style={{
              flex: 1,
              paddingBottom: 60,
              backgroundColor: "#fff",
            }}></View>
        )}
      />
      <Tab.Screen
        name={BottomTabRoutes.ChatNav}
        children={() => (
          <View
            style={{
              flex: 1,
              paddingBottom: 60,
              backgroundColor: "#fff",
            }}></View>
        )}
      />
      <Tab.Screen
        name={BottomTabRoutes.ProfileNav}
        children={() => (
          <View
            style={{
              flex: 1,
              paddingBottom: 60,
              backgroundColor: "#fff",
            }}></View>
        )}
      />
    </Tab.Navigator>
  );
};
const TabBar: FC<BottomTabBarProps> = ({ state, navigation }) => {
  const insets = useSafeAreaInsets();

  const getIcon = (
    route: keyof TabStackParamsList,
    fill: string,
    stroke: string
  ): React.ReactNode | undefined => {
    switch (route) {
      case BottomTabRoutes.HomeNav:
        return <HomeIcon fill={fill} stroke={stroke} />;
      case BottomTabRoutes.CalendarNav:
        return <CalendarIcon fill={fill} stroke={stroke} />;
      case BottomTabRoutes.ChatNav:
        return <ChatIcon fill={fill} stroke={stroke} />;
      case BottomTabRoutes.ProfileNav:
        return <ProfileIcon fill={fill} stroke={stroke} />;
      default:
        break;
    }
  };

  const routes = state.routeNames;
  const activeIndex = state.index;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        // justifyContent: "flex-end",
        // alignItems: "flex-end",
        backgroundColor: "#fff",
        marginTop: -50 - insets.bottom,
        height: 50 + insets.bottom,
        paddingBottom: insets.bottom,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        shadowColor: "#A259FF",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 36,
        elevation: 12,
      }}>
      {routes.map((route, index) => (
        <View
          key={index}
          style={{
            flex: 0.25,
            height: "100%",
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate(route);
            }}>
            <View>
              {getIcon(
                route as keyof TabStackParamsList,
                index === activeIndex ? "#CBA6FB" : "#FFFFFF",
                index === activeIndex ? "#7D16FF" : "#B6B6B6"
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
    </View>
  );
};
