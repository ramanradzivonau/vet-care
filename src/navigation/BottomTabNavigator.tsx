import React, { FC } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Shadow } from "react-native-shadow-2";
import { HomeIcon } from "src/assets/BottomTabNavigation/HomeIcon";
import { CalendarIcon } from "src/assets/BottomTabNavigation/CalendarIcon";
import { ChatIcon } from "src/assets/BottomTabNavigation/ChatIcon";
import { ProfileIcon } from "src/assets/BottomTabNavigation/ProfileIcon";
import { TabStackParamsList } from "src/types/navigation";
import { BottomTabRoutes } from "src/types/navigation-enums";
import { HomeNavigator } from "./HomeNavigator";
import { CalendarNavigator } from "./CalendatNavigation";

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
        children={() => <HomeNavigator />}
      />
      <Tab.Screen
        name={BottomTabRoutes.CalendarNav}
        children={() => <CalendarNavigator />}
      />
      {/* <Tab.Screen
        name={BottomTabRoutes.ChatNav}
        children={() => (
          <View
            style={{
              flex: 1,
              backgroundColor: "#fff",
            }}></View>
        )}
      /> */}
      <Tab.Screen
        name={BottomTabRoutes.ProfileNav}
        children={() => (
          <View
            style={{
              flex: 1,
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
      // case BottomTabRoutes.ChatNav:
      //   return <ChatIcon fill={fill} stroke={stroke} />;
      case BottomTabRoutes.ProfileNav:
        return <ProfileIcon fill={fill} stroke={stroke} />;
      default:
        break;
    }
  };

  const routes = state.routeNames;
  const activeIndex = state.index;

  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  return (
    <View
      style={[
        Styles.wrap,
        {
          height: 50 + paddingBottom,
          marginTop: -50 - paddingBottom,
        },
      ]}>
      <Shadow
        style={[
          Styles.container,
          {
            paddingBottom: paddingBottom,
          },
        ]}
        distance={10}
        startColor="#A259FF60">
        {routes.map((route, index) => (
          <View key={index} style={Styles.itemWrap}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate(route);
              }}
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}>
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
      </Shadow>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    width: "100%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  container: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#fff",
  },
  itemWrap: {
    flex: 0.33,
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
