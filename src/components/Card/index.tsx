import { FC } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { getFontFamily } from "src/utils/fontFamily";

interface CardProps {
  text: string;
  imageBase64: string;
  onPress: () => void;
  style?: ViewStyle;
}
export const Card: FC<CardProps> = ({ text, imageBase64, onPress, style }) => {
  return (
    <TouchableOpacity style={[Styles.wrap, style]} onPress={onPress}>
      <View style={Styles.cardWrap}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={Styles.image}
        />
        <View style={Styles.infoWrap}>
          <Text style={Styles.text}>{text}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    maxWidth: Dimensions.get("screen").width / 2 - 31,
    minWidth: "40%",
    borderWidth: 2,
    borderRadius: 16,
    borderColor: "#C6BFFD",
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 3,
  },
  cardWrap: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 140,
  },
  infoWrap: {
    width: "100%",
    height: 64,
    paddingVertical: 12,
  },
  text: {
    paddingHorizontal: 18,
    fontFamily: getFontFamily("semiBold"),
    fontSize: 15,
    color: "#544864",
  },
});
