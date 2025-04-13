import { BlurView } from "@react-native-community/blur";
import { FC } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getFontFamily } from "src/utils/fontFamily";
import Arrow from "src/assets/icons/arrow-right.svg";

interface BannerProps {
  onButtonPress: () => void;
}

export const Banner: FC<BannerProps> = ({ onButtonPress }) => {
  return (
    <ImageBackground
      source={require("../../assets/bannerBg.png")}
      resizeMode="cover"
      style={Styles.background}
      imageStyle={Styles.backgroundImage}>
      <View style={Styles.wrap}>
        <View style={Styles.infoBackground}>
          <BlurView
            style={Styles.infoBlur}
            blurType="light"
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          />
        </View>
        <View style={Styles.infoWrap}>
          <View style={Styles.infoContainer}>
            <Text style={Styles.infoTitle}>
              Позаботься о здоровье своего питомца
            </Text>
            <Text style={Styles.infoSubtitle}>
              Советы и рекомендации для вашего питомца
            </Text>
          </View>
          <TouchableOpacity style={Styles.infoButton} onPress={onButtonPress}>
            <Arrow />
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const Styles = StyleSheet.create({
  background: {
    width: "100%",
    borderRadius: 30,
    elevation: 16,
  },
  backgroundImage: {
    borderRadius: 30,
  },
  wrap: {
    paddingHorizontal: 14,
    paddingTop: 38,
    paddingBottom: 14,
  },
  infoBackground: {
    position: "absolute",
    top: 38,
    left: 14,
    height: "100%",
    width: "100%",
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#FFFFFF30",
    elevation: 16,
  },
  infoBlur: {
    flex: 1,
  },
  infoWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    paddingHorizontal: 27,
    paddingVertical: 24,
  },
  infoContainer: {
    flex: 1,
  },
  infoTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#544864",
  },
  infoSubtitle: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 12,
    color: "#808080",
  },
  infoButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 16,
    backgroundColor: "#7D16FFB0",
  },
});
