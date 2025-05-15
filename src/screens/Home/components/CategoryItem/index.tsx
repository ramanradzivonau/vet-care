import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TherapistsIcon from "../../assets/TherapistsIcon";
import SurgeonsIcon from "../../assets/SurgeonsIcon";
import OphthalmologistsIcon from "../../assets/OphthalmologistsIcon";
import DermatologistsIcon from "../../assets/DermatologistsIcon";
import CardiologistIcon from "../../assets/CardiologistIcon";
import DentistsIcon from "../../assets/DentistsIcon";
import OrthopedistsIcon from "../../assets/OrthopedistsIcon";
import ExotologistsIcon from "../../assets/ExotologistsIcon";
import { CATEGORIES } from "../../types";
import { getFontFamily } from "src/utils/fontFamily";

interface CategoryItemProps {
  category: CATEGORIES;
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const getIconByCategory = (category: CATEGORIES, isActive: boolean) => {
  const stroke = isActive ? "#DDD9FE" : "#7135FD";
  switch (category) {
    case CATEGORIES.THERAPISTS:
      return <TherapistsIcon stroke={stroke} />;
    case CATEGORIES.SURGEONS:
      return <SurgeonsIcon stroke={stroke} />;
    case CATEGORIES.OPHTHALMOLOGISTS:
      return <OphthalmologistsIcon stroke={stroke} />;
    case CATEGORIES.DERMATOLOGISTS:
      return <DermatologistsIcon stroke={stroke} />;
    case CATEGORIES.CARDIOLOGISTS:
      return <CardiologistIcon stroke={stroke} />;
    case CATEGORIES.DENTISTS:
      return <DentistsIcon stroke={stroke} />;
    case CATEGORIES.ORTHOPEDISTS:
      return <OrthopedistsIcon stroke={stroke} />;
    case CATEGORIES.EXOTOLOGISTS:
      return <ExotologistsIcon stroke={stroke} />;
    default:
      return <></>;
  }
};

export const CategoryItem: FC<CategoryItemProps> = ({
  category,
  label,
  isActive,
  onPress,
}) => {
  return (
    <TouchableOpacity style={Styles.container} onPress={onPress}>
      <View style={[Styles.iconWrap, isActive && Styles.iconWrapActive]}>
        {getIconByCategory(category, isActive)}
      </View>
      <View style={Styles.labelWrap}>
        <Text android_hyphenationFrequency={"full"} style={Styles.label}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: 75,
    gap: 12,
  },
  iconWrap: {
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    width: 75,
    borderRadius: "100%",
    backgroundColor: "#C6BFFD",
  },
  iconWrapActive: {
    backgroundColor: "#7135FD",
  },
  labelWrap: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 12,
    color: "#544864",
    textAlign: "center",
  },
});
