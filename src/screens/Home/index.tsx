import { FC, useState } from "react";
import { StyleSheet, StatusBar, Text, View } from "react-native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { ScrollView } from "react-native-gesture-handler";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { HomeRoutes, RootRoutes, HomeStackParamList } from "src/types";
import { Banner } from "./components";
import { getFontFamily } from "src/utils/fontFamily";
import { categories } from "./mock";
import { CategoryItem } from "./components/CategoryItem";
import { DoctorCard } from "./components/DoctorCard";
import { useAppSelector } from "src/store";
import { CATEGORIES } from "./types";
import { Card } from "src/components";

type HomeScreenProps = StackScreenProps<HomeStackParamList, HomeRoutes.Home>;

export const HomeScreen: FC<HomeScreenProps> = ({ navigation }) => {
  const doctorsData = useAppSelector(state => state.doctor.doctorsByCategory);
  const [activeCategory, setActiveCategory] = useState(CATEGORIES.THERAPISTS);
  const [doctorsList, setDoctorsList] = useState(
    doctorsData.find(doctors =>
      doctors.specialisation.includes(CATEGORIES.THERAPISTS)
    )?.doctors || []
  );
  const insets = useSafeAreaInsets();

  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const onBannerButtonPress = () => {
    console.log("banner press");
  };

  const onChangeCategory = (activeCategory: CATEGORIES) => {
    setActiveCategory(activeCategory);
    setDoctorsList(
      doctorsData.find(doctors =>
        doctors.specialisation.includes(activeCategory)
      )?.doctors || []
    );
  };

  const onDoctorCardPress = (id: number) => {
    navigation.navigate(HomeRoutes.Doctor, { id, category: activeCategory });
  };

  return (
    <SafeAreaView
      style={[Styles.safeArea, { paddingBottom: 50 + paddingBottom }]}>
      <StatusBar translucent />
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
                  isActive={activeCategory === category.category}
                  label={category.label}
                  onPress={() => onChangeCategory(category.category)}
                />
              ))}
            </ScrollView>
          </View>
          <View style={Styles.doctorsContainer}>
            <Text style={Styles.title}>Врачи</Text>
            <View style={Styles.doctorsList}>
              {doctorsList.map(doctor => (
                <Card
                  key={`doctor-id-${doctor.id}`}
                  text={doctor.fullName}
                  imageBase64={doctor.imageBase64}
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
