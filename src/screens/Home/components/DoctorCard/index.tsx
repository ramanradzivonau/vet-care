import { FC } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { getFontFamily } from "src/utils/fontFamily";

const { width: screenWidth } = Dimensions.get("screen");
interface DoctorCardProps {
  fullName: string;
  imageBase64: string;
  onPress: () => void;
}

export const DoctorCard: FC<DoctorCardProps> = ({
  fullName,
  imageBase64,
  onPress,
}) => {
  return (
    <TouchableOpacity style={Styles.wrap} onPress={onPress}>
      <View style={Styles.cardWrap}>
        <View style={Styles.imageWrap}>
          <Image
            source={{ uri: `data:image/jpeg;base64,${imageBase64}` }}
            style={Styles.image}
          />
        </View>
        <View style={Styles.infoWrap}>
          <Text style={Styles.fullName}>{fullName}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    maxWidth: screenWidth / 2 - 31,
    minWidth: "40%",
    borderRadius: 16,
    elevation: 5,
    backgroundColor: "#A259FF",
  },
  cardWrap: {
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  imageWrap: {
    width: "90%",
    aspectRatio: 1,
    padding: 4,
    borderRadius: "100%",
    backgroundColor: "#B77EFF",
  },
  image: {
    flex: 1,
    borderRadius: 1000,
    backgroundColor: "#fff",
  },
  infoWrap: {
    width: "100%",
  },
  fullName: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 14,
    color: "#F5F5F5",
    textAlign: "center",
  },
});
