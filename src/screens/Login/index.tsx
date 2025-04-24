import { FC } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootRoutes, RootStackParamList } from "src/types";
import { SafeAreaView } from "react-native-safe-area-context";

type LoginScreenParams = StackScreenProps<RootStackParamList, RootRoutes.Login>;

export const LoginScreen: FC<LoginScreenParams> = ({}) => {
  return (
    <ImageBackground
      source={require("src/assets/LoginScreen/bg.png")}
      resizeMode="cover"
      style={[
        Styles.logo,
        // { top: insets.top }
      ]}>
      <SafeAreaView style={Styles.safeArea}>
        <View style={Styles.container}></View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const Styles = StyleSheet.create({
  logo: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ff000040",
  },
});
function useAppSelector(arg0: (state: any) => any): number {
  throw new Error("Function not implemented.");
}
