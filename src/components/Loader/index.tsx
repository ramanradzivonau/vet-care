import { FC } from "react";
import {
  ActivityIndicator as ActivityIndicatorRN,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

interface LoaderProps {
  style: ViewStyle;
}
export const Loader: FC<LoaderProps> = ({ style }) => {
  return (
    <View style={[Styles.wrap, style]}>
      <ActivityIndicatorRN size="large" color="#8D7EFB" />
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
