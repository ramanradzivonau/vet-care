import { FC } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getFontFamily } from "src/utils/fontFamily";

interface CardWithRadioButtonProps {
  text: string;
  imageBase64: string;
  isActive: boolean;
  onPress: () => void;
}
export const CardWithRadioButton: FC<CardWithRadioButtonProps> = ({
  text,
  imageBase64,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[Styles.wrap, isActive && { borderColor: "#7135FD" }]}
      onPress={onPress}>
      <View style={Styles.cardWrap}>
        <Image
          source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
          style={Styles.image}
        />
        <View
          style={[
            Styles.radioButtonWrap,
            isActive && { borderColor: "#7135FD" },
          ]}>
          <View
            style={[
              Styles.radioButton,
              isActive && { backgroundColor: "#7135FD" },
            ]}
          />
        </View>
        <View
          style={[
            Styles.infoWrap,
            isActive && {
              backgroundColor: "#DDD9FE",
            },
          ]}>
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
    alignItems: "center",
  },
  radioButtonWrap: {
    position: "absolute",
    left: 10,
    top: 10,
    width: 18,
    height: 18,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#C6BFFD",
    padding: 2,
    backgroundColor: "#FFFFFF",
  },
  radioButton: {
    flex: 1,
    borderRadius: 7,
    backgroundColor: "#FFFFFF",
  },
  imageWrap: {
    width: "90%",
    aspectRatio: 1,
    padding: 4,
    borderRadius: "100%",
    backgroundColor: "#B77EFF",
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
