import { FC, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  HomeStackScreenProps,
  HomeRoutes,
  RootRoutes,
  HomeStackParamList,
} from "src/types";
import { Banner } from "./components";
import { getFontFamily } from "src/utils/fontFamily";
import { categories, doctorsMockData } from "./mock";
import { CategoryItem } from "./components/CategoryItem";
import { DoctorCard } from "./components/DoctorCard";
import { useCurrentLocation } from "src/hooks";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { RootStackParamList, TabStackParamsList } from "src/types/navigation";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type HomeScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<HomeStackParamList, HomeRoutes.Home>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabStackParamsList>,
    StackNavigationProp<RootStackParamList>
  >
>;

type HomeScreenRouteProp = RouteProp<HomeStackParamList, HomeRoutes.Home>;

type HomeScreenParams = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export const HomeScreen: FC<HomeScreenParams> = ({ navigation }) => {
  const [activeCategoryId, setActiveCategoryId] = useState(categories[0].id);

  const [doctorsList, setDoctorsList] = useState(
    doctorsMockData.filter(doctor =>
      doctor.categoies.includes(activeCategoryId)
    )
  );
  const insets = useSafeAreaInsets();
  const { isLoading, location, error } = useCurrentLocation();

  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const onBannerButtonPress = () => {
    console.log("banner press");
  };

  const onChangeCategory = (id: string) => {
    setActiveCategoryId(id);
    setDoctorsList(
      doctorsMockData.filter(doctor => doctor.categoies.includes(id))
    );
  };

  const onDoctorCardPress = (id: string) => {
    navigation.navigate(RootRoutes.Doctor, { id });
  };

  return (
    <SafeAreaView
      style={[Styles.safeArea, { paddingBottom: 50 + paddingBottom }]}>
      <ScrollView style={Styles.scrollView} overScrollMode="never">
        <View style={Styles.bannerContainer}>
          <Banner onButtonPress={onBannerButtonPress} />
        </View>
        <View style={Styles.contentContainer}>
          <View style={Styles.categoriesContainer}>
            <Text style={Styles.title}>Категории</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              overScrollMode="never"
              contentContainerStyle={Styles.categoriesList}>
              {categories.map(category => (
                <CategoryItem
                  key={`category-item-${category.id}`}
                  category={category.category}
                  isActive={activeCategoryId === category.id}
                  label={category.label}
                  onPress={() => onChangeCategory(category.id)}
                />
              ))}
            </ScrollView>
          </View>
          <View style={Styles.doctorsContainer}>
            <Text style={Styles.title}>Врачи</Text>
            <View style={Styles.doctorsList}>
              {doctorsList.map((doctor, index) => (
                <DoctorCard
                  index={index}
                  fullName={doctor.fullName}
                  imgUrl={doctor.img}
                  rating={doctor.rating}
                  clinicName={doctor.clinic.name}
                  clinicLocation={doctor.clinic.location}
                  currentLocation={location}
                  currentLocationIsLoading={isLoading}
                  currentLocationError={error}
                  key={`doctor-id-${doctor.id}`}
                  onPress={() => {
                    onDoctorCardPress(doctor.id);
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingVertical: 22,
  },
  bannerContainer: {
    paddingHorizontal: 22,
  },
  contentContainer: {
    flex: 1,
    minHeight: "100%",
  },
  title: {
    paddingHorizontal: 22,
    fontFamily: getFontFamily("semiBold"),
    fontSize: 20,
    color: "#544864",
  },
  categoriesContainer: {
    gap: 18,
    marginTop: 24,
  },
  categoriesList: {
    gap: 26,
    paddingHorizontal: 22,
  },
  doctorsContainer: {
    flex: 1,
    gap: 18,
    marginTop: 24,
  },
  doctorsList: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 24,
    columnGap: 18,
    paddingHorizontal: 22,
    paddingBottom: 24,
    marginBottom: 24,
  },
});
