import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { getFontFamily } from "src/utils/fontFamily";
import RatingIcon from "../../assets/RatingIcon";
import LocationIcon from "../../assets/LocationIcon";
import getDistance from "geolib/es/getDistance";
import { Location, LocationErrorCode } from "react-native-get-location";

interface DoctorCardProps {
  index: number;
  fullName: string;
  imgUrl: string;
  rating: number;
  clinicName: string;
  clinicLocation: { latitude: number; longitude: number };
  currentLocation: Location | null;
  currentLocationIsLoading: boolean;
  currentLocationError: LocationErrorCode | null;
}

export const DoctorCard: FC<DoctorCardProps> = ({
  index,
  fullName,
  imgUrl,
  clinicName,
  rating,
  clinicLocation,
  currentLocation,
  currentLocationIsLoading,
  currentLocationError,
}) => {
  const [distance, setDistance] = useState<string | null>(null);

  useEffect(() => {
    if (currentLocation && !currentLocationIsLoading && !currentLocationError) {
      const currentDistance =
        getDistance(clinicLocation, currentLocation) / 1000;
      setDistance(currentDistance.toFixed(1));
    }
  }, [currentLocation, currentLocationIsLoading, currentLocationError]);
  return (
    <View
      style={[
        Styles.wrap,
        index % 2 === 0 && { paddingRight: 9 },
        index % 2 === 1 && { paddingLeft: 9 },
      ]}>
      <View style={Styles.cardWrap}>
        <View style={Styles.imageWrap}>
          <Image source={{ uri: imgUrl }} style={Styles.image} />
        </View>
        <View style={Styles.infoWrap}>
          <Text style={Styles.fullName}>{fullName}</Text>
          <Text style={Styles.clinic}>{clinicName}</Text>
          <View style={Styles.additionalInfoContainer}>
            <View style={Styles.ratingContainer}>
              <RatingIcon />
              <Text style={Styles.additionalText}>{rating}</Text>
            </View>
            <View style={Styles.locationContainer}>
              <LocationIcon />
              <Text style={Styles.additionalText}>
                {(distance ? distance : "-") + " км"}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    width: "50%",

    paddingBottom: 24,
  },
  cardWrap: {
    gap: 8,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#A259FF",
  },
  imageWrap: {
    width: "90%",
    aspectRatio: 1,
    padding: 4,
    borderRadius: "100%",
    backgroundColor: "#B77EFF",
    elevation: 3,
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
  },
  clinic: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 12,
    color: "#CBA6FB",
  },
  additionalInfoContainer: {
    flexDirection: "row",
    gap: 18,
    width: "100%",
    marginTop: 6,
  },
  ratingContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  locationContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  additionalText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 12,
    color: "#F5F5F5",
  },
});
