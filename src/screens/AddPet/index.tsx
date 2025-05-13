import { FC, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ProfileStackParamList } from "src/types/navigation";
import { ProfileRoutes } from "src/types/navigation-enums";
import ArrowLeft from "src/assets/icons/ArrowLeft";
import { ScrollView } from "react-native-gesture-handler";
import { getFontFamily } from "src/utils/fontFamily";
import { CardWithRadioButton, DataPicker, Loader } from "src/components";
import { firstStepData, secondStepData } from "./mock";
import { DogBreeds } from "./types";
import ArrowRight from "src/assets/icons/ArrowRight";
import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import AddIcon from "src/assets/LoginScreen/add.svg";
import GenderBoyIcon from "src/assets/icons/GenderBoy.svg";
import GenderGirlIcon from "src/assets/icons/GenderGirl.svg";
import MultiSlider, {
  MarkerProps,
} from "@ptomasroos/react-native-multi-slider";
import Animated from "react-native-reanimated";
import { useLazyAddPetQuery } from "src/services/modules/pet";
import { Gender, PetTypes } from "src/services/modules/pet/types";
import { useAppDispatch, useAppSelector } from "src/store";
import { addPetData } from "src/store/user";

type AddPetScreenProps = StackScreenProps<
  ProfileStackParamList,
  ProfileRoutes.AddPet
>;

export const AddPetScreen: FC<AddPetScreenProps> = ({ navigation }) => {
  const userData = useAppSelector(state => state.owner);
  const [step, setStep] = useState(1);
  const [type, setType] = useState<PetTypes>();
  const [breed, setBreed] = useState<string>();
  const [imageBase64, setImageBase64] = useState<string>();
  const [name, setName] = useState<string>();
  const [gender, setGender] = useState<Gender | undefined>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [passport, setPassport] = useState<string>();
  const [weight, setWeight] = useState<number>(1);
  const [isWeightSelected, setIsWeightSelected] = useState<boolean | undefined>(
    undefined
  );

  const [addPet, { status, data: petData }] = useLazyAddPetQuery();
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();
  const paddingBottom = insets.bottom >= 20 ? insets.bottom : 20;

  const data = [
    type,
    breed,
    [imageBase64, name, gender].every(
      item => item !== undefined && item !== ""
    ) || undefined,
    passport,
    dateOfBirth,
    isWeightSelected,
  ];
  const isNextButtonDisabled = data[step - 1] === undefined;

  const onBackButtonPress = () => {
    if (step === 5 && passport === "") {
      setPassport(undefined);
    }
    if (step === 1) {
      navigation.goBack();
    } else {
      setStep(step - 1);
    }
  };

  const onNextButtonPress = () => {
    if (step < 6) {
      setStep(step + 1);
    } else {
      addPet({
        name: name as string,
        type: type as PetTypes,
        breed: breed as string,
        dateOfBirth: dateOfBirth?.toISOString() as string,
        gender: gender as Gender,
        weight: weight,
        passport: passport as string,
        idOwn: userData.id,
        imageBase64: imageBase64 as string,
      });
    }
  };

  const onPickImage = async () => {
    const result = await launchImageLibrary({ mediaType: "photo" });

    if (result.assets?.[0].uri) {
      const resized = await ImageResizer.createResizedImage(
        result.assets[0].uri,
        300,
        300,
        "JPEG",
        50
      );

      const base64 = await RNFS.readFile(resized.uri, "base64");
      setImageBase64(base64);
    }
  };

  useEffect(() => {
    if (status === "fulfilled" && petData) {
      dispatch(addPetData(petData));
      navigation.goBack();
    }
  }, [status, petData]);

  return (
    <View style={[Styles.wrap, { paddingBottom: 50 + paddingBottom }]}>
      {(status === undefined || status === "uninitialized") && (
        <>
          <View style={[Styles.navigationBar, { marginTop: insets.top }]}>
            <TouchableOpacity
              style={Styles.backButton}
              onPress={onBackButtonPress}>
              <ArrowLeft fill="#000" />
            </TouchableOpacity>
            <View style={Styles.progressBarInfo}>
              <Text style={Styles.progressBarText}>{`Шаг ${step}/6`}</Text>
              <View style={Styles.progressBar}>
                <Animated.View
                  style={[
                    Styles.progress,
                    { width: `${(step / 6) * 100}%` },
                  ]}></Animated.View>
              </View>
            </View>
          </View>
          <ScrollView style={Styles.scrollView} overScrollMode="never">
            {step === 1 && (
              <View style={Styles.step}>
                <Text style={Styles.stepTitle}>Кто ваш питомец?</Text>
                <View style={Styles.stepItemsWrap}>
                  {firstStepData.map(item => (
                    <CardWithRadioButton
                      key={item.type}
                      text={item.text}
                      imageBase64={item.image}
                      isActive={type === item.type}
                      onPress={() => {
                        setType(item.type);
                      }}
                    />
                  ))}
                </View>
              </View>
            )}
            {step === 2 && (
              <View style={Styles.step}>
                <Text style={Styles.stepTitle}>
                  Выберете породу вашего питомца
                </Text>
                <View style={Styles.stepItemsWrap}>
                  {secondStepData[type!].map(item => (
                    <CardWithRadioButton
                      key={item.breed}
                      text={item.text}
                      imageBase64={item.image}
                      isActive={breed === item.breed}
                      onPress={() => {
                        setBreed(item.breed);
                      }}
                    />
                  ))}
                </View>
              </View>
            )}
            {step === 3 && (
              <View style={Styles.step}>
                <Text style={Styles.stepTitle}>Давайте знакомиться</Text>
                <View
                  style={Styles.stepItemsWrap && { flexDirection: "column" }}>
                  <View style={Styles.petImgWrap}>
                    <TouchableOpacity
                      style={Styles.petImgContainer}
                      onPress={onPickImage}>
                      <View style={Styles.petImgPicker}>
                        {!imageBase64 && (
                          <Image
                            source={require("src/assets/LoginScreen/img-placeholder.png")}
                            style={Styles.petImgPlaceholder}
                            resizeMode="contain"
                          />
                        )}
                        {imageBase64 && (
                          <Image
                            source={{
                              uri: `data:image/jpeg;base64,${imageBase64}`,
                            }}
                            style={Styles.petImg}
                          />
                        )}
                      </View>
                      <AddIcon style={Styles.petImgPickerIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={Styles.petInfoWrap}>
                    <Text style={Styles.petNameTitle}>
                      Как зовут вашего питомца?
                    </Text>
                    <TextInput
                      style={Styles.input}
                      onChangeText={setName}
                      value={name}
                      placeholder="Имя вашего питомца"
                      placeholderTextColor="#8D7EFB"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                    <Text style={Styles.petNameTitle}>
                      Какого пола ваш питомец?
                    </Text>
                    <View style={Styles.genderWrap}>
                      <TouchableOpacity
                        style={[
                          Styles.genderContainer,
                          gender === "М" && {
                            borderColor: "#7135FD",
                            backgroundColor: "#DDD9FE",
                          },
                        ]}
                        onPress={() => {
                          setGender("М");
                        }}>
                        <GenderBoyIcon />
                        <Text style={Styles.genderText}>Мальчик</Text>
                        <View
                          style={[
                            Styles.radioButtonWrap,
                            gender === "М" && { borderColor: "#7135FD" },
                          ]}>
                          <View
                            style={[
                              Styles.radioButton,
                              gender === "М" && { backgroundColor: "#7135FD" },
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          Styles.genderContainer,
                          gender === "Ж" && {
                            borderColor: "#7135FD",
                            backgroundColor: "#DDD9FE",
                          },
                        ]}
                        onPress={() => {
                          setGender("Ж");
                        }}>
                        <GenderGirlIcon />
                        <Text style={Styles.genderText}>Девочка</Text>
                        <View
                          style={[
                            Styles.radioButtonWrap,
                            gender === "Ж" && { borderColor: "#7135FD" },
                          ]}>
                          <View
                            style={[
                              Styles.radioButton,
                              gender === "Ж" && { backgroundColor: "#7135FD" },
                            ]}
                          />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
            {step === 4 && (
              <View style={Styles.step}>
                <Text style={Styles.stepTitle}>
                  Добавте паспорт вашего питомца
                </Text>
                <View style={[Styles.petImgWrap, Styles.petImgWrapSmall]}>
                  <View style={Styles.petImgContainer}>
                    <View style={Styles.petImgPicker}>
                      {imageBase64 && (
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${imageBase64}`,
                          }}
                          style={Styles.petImg}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={Styles.petInfoWrap}>
                  <Text style={Styles.petNameTitle}>
                    Номер паспорта вашего питомца:
                  </Text>
                  <TextInput
                    style={Styles.input}
                    onChangeText={setPassport}
                    value={passport}
                    placeholder="Номер паспорта"
                    placeholderTextColor="#8D7EFB"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </View>
            )}
            {step === 5 && (
              <View style={Styles.step}>
                <Text style={Styles.stepTitle}>
                  Укажите дату рождения вашего питомца
                </Text>
                <View style={[Styles.petImgWrap, Styles.petImgWrapSmall]}>
                  <View style={Styles.petImgContainer}>
                    <View style={Styles.petImgPicker}>
                      {imageBase64 && (
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${imageBase64}`,
                          }}
                          style={Styles.petImg}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={Styles.dataPickerWrap}>
                  <DataPicker
                    selectedDate={dateOfBirth}
                    onSelect={(date: Date) => setDateOfBirth(date)}
                  />
                </View>
              </View>
            )}
            {step === 6 && (
              <View style={Styles.step}>
                <Text style={Styles.stepTitle}>Укажите вес вашего питомца</Text>
                <View style={[Styles.petImgWrap, Styles.petImgWrapSmall]}>
                  <View style={Styles.petImgContainer}>
                    <View style={Styles.petImgPicker}>
                      {imageBase64 && (
                        <Image
                          source={{
                            uri: `data:image/jpeg;base64,${imageBase64}`,
                          }}
                          style={Styles.petImg}
                        />
                      )}
                    </View>
                  </View>
                </View>
                <View style={Styles.weightWrap}>
                  <Text style={Styles.weightText}>
                    {weight % 1 === 0 ? `${weight}.0` : weight} кг
                  </Text>
                  <MultiSlider
                    sliderLength={Dimensions.get("screen").width - 88}
                    values={[weight]}
                    min={1}
                    max={40}
                    step={0.5}
                    onValuesChange={value => {
                      setWeight(value[0]);
                      setIsWeightSelected(true);
                    }}
                    selectedStyle={Styles.sliderSelectedStyle}
                    unselectedStyle={Styles.sliderUnselectedStyle}
                    trackStyle={Styles.sliderTrackStyle}
                    customMarker={(_props: MarkerProps) => {
                      return <View style={Styles.sliderMarker} />;
                    }}
                  />
                </View>
              </View>
            )}
          </ScrollView>
          <TouchableOpacity
            style={[
              Styles.button,
              isNextButtonDisabled && Styles.buttonDisabled,
            ]}
            onPress={onNextButtonPress}
            disabled={isNextButtonDisabled}>
            <Text style={Styles.buttonText}>
              {step === 6 ? "Добавить питомца" : "Далее"}
            </Text>
            {step !== 6 && <ArrowRight fill="#FFF" />}
          </TouchableOpacity>
        </>
      )}
      {status === "pending" && (
        <Loader style={{ paddingTop: 50 + paddingBottom }} />
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
  },
  navigationBar: {
    flexDirection: "row",
    gap: 22,
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 22,
  },
  progressBarInfo: {
    flex: 1,
    gap: 4,
    justifyContent: "center",
  },
  progressBarText: {
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#544864",
  },
  progressBar: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    backgroundColor: "#BDBDBD",
  },
  progress: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8D7EFB",
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#DDD9FE",
  },
  step: {
    flex: 1,
    padding: 22,
    paddingBottom: 34,
  },
  stepTitle: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 24,
    textAlign: "center",
    color: "#544864",
  },
  stepItemsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 24,
    columnGap: 18,
    marginTop: 18,
  },
  petImgWrap: {
    width: (Dimensions.get("screen").width - 44) * 0.8,
    height: (Dimensions.get("screen").width - 44) * 0.8,
    borderWidth: 2,
    borderColor: "#C6BFFD",
    borderRadius: 1000,
    marginHorizontal: "auto",
    marginTop: 22,
  },
  petImgWrapSmall: {
    width: (Dimensions.get("screen").width - 44) * 0.6,
    height: (Dimensions.get("screen").width - 44) * 0.6,
  },
  petImgContainer: {
    width: "80%",
    height: "80%",
    borderWidth: 2,
    borderColor: "#C6BFFD",
    borderRadius: 1000,
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
  petImgPicker: {
    flex: 1,
  },
  petImgPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
  petImg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 1000,
  },
  petImgPickerIcon: {
    position: "absolute",
    top: (Dimensions.get("screen").width - 44) * 0.512 - 6,
    left: (Dimensions.get("screen").width - 44) * 0.512 - 6,
  },
  petInfoWrap: {
    flex: 1,
    paddingVertical: 22,
    gap: 22,
  },
  petNameTitle: {
    width: "100%",
    fontFamily: getFontFamily("medium"),
    fontSize: 18,
    textAlign: "center",
    color: "#544864",
  },
  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#C6BFFD",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    elevation: 5,
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#544864",
  },
  genderWrap: {
    flex: 1,
    flexDirection: "row",
    gap: 22,
  },
  genderContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#C6BFFD",
  },
  genderText: {
    fontFamily: getFontFamily("medium"),
    fontSize: 16,
    color: "#544864",
    textAlign: "center",
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
  dataPickerWrap: {
    flex: 1,
    marginTop: 44,
  },
  weightWrap: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginTop: 44,
  },
  weightText: {
    fontFamily: getFontFamily("extraBold"),
    fontSize: 42,
    color: "#B0A5FD",
  },
  sliderTrackStyle: {
    height: 6,
    borderRadius: 10,
  },
  sliderSelectedStyle: {
    backgroundColor: "#B0A5FD",
  },
  sliderUnselectedStyle: {
    backgroundColor: "#9E9E9E",
  },
  sliderMarker: {
    width: 24,
    height: 24,
    borderRadius: 100,
    backgroundColor: "#8D7EFB",
    top: 3,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: 54,
    width: Dimensions.get("screen").width - 44,
    borderRadius: 16,
    marginHorizontal: 22,
    marginTop: -16,
    marginBottom: 22,
    backgroundColor: "#7135FD",
    elevation: 3,
  },
  skipButton: {
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: 54,
    width: "100%",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#7135FD",
    elevation: 3,
  },
  buttonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  skipButtonText: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#7135FD",
  },
  buttonText: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#FFFFFF",
  },
});
