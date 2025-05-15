import { FC, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootRoutes, RootStackParamList } from "src/types";
import { getFontFamily } from "src/utils/fontFamily";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { launchImageLibrary } from "react-native-image-picker";
import { useLazyRegistrationQuery } from "src/services/modules/owner";
import AddIcon from "src/assets/LoginScreen/add.svg";
import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import { loginUser } from "src/store/user";
import ArrowLeft from "src/assets/icons/ArrowLeft";
import { useAppDispatch } from "src/store";

type SignupScreenParams = StackScreenProps<
  RootStackParamList,
  RootRoutes.Signup
>;

export const SignupScreen: FC<SignupScreenParams> = ({ navigation }) => {
  const [step, setStep] = useState(0);
  const [login, onLoginChange] = useState("");
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");
  const [name, onNameChange] = useState("");
  const [surname, onSurnameChange] = useState("");
  const [telephoneNumber, onTelephoneNumberChange] = useState("");
  const [imageBase64, setImageBase64] = useState("");

  const [register, { status, data }] = useLazyRegistrationQuery();
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const goToSecondStep = () => {
    if (login && email && password) {
      setStep(1);
    }
  };

  const finishRegistration = () => {
    if (imageBase64) {
      register({
        login,
        email,
        password,
        name,
        surname,
        telephoneNumber,
        imageBase64,
      });
    }
  };

  const pickImage = async () => {
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
    if (status === "fulfilled" && data) {
      dispatch(loginUser(data));
      navigation.reset({
        index: 0,
        routes: [{ name: RootRoutes.Welcome }],
      });
    }
  }, [status, data]);

  return (
    <ImageBackground
      source={require("src/assets/LoginScreen/bg.png")}
      resizeMode="cover"
      style={[Styles.logo]}>
      <View style={[Styles.container, { paddingTop: insets.top }]}>
        <View style={Styles.signupForm}>
          {step !== 0 && (
            <TouchableOpacity
              style={Styles.backButton}
              onPress={() => setStep(step - 1)}>
              <ArrowLeft fill="#000" />
            </TouchableOpacity>
          )}
          {step === 0 && (
            <View style={Styles.signupStep}>
              <Text style={Styles.stepTitle}>Создай свой аккаунт</Text>
              <Text style={Styles.stepSubtitle}>Шаг 1: Создайте аккаунт</Text>
              <TextInput
                style={Styles.input}
                onChangeText={onLoginChange}
                onSubmitEditing={goToSecondStep}
                value={login}
                placeholder="Логин"
                placeholderTextColor="#8D7EFB"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={Styles.input}
                onChangeText={onEmailChange}
                onSubmitEditing={goToSecondStep}
                value={email}
                placeholder="Почта"
                placeholderTextColor="#8D7EFB"
                autoCapitalize="none"
                autoCorrect={false}
                inputMode="email"
              />
              <TextInput
                style={Styles.input}
                onChangeText={onPasswordChange}
                onSubmitEditing={goToSecondStep}
                value={password}
                placeholder="Пароль"
                placeholderTextColor="#8D7EFB"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
              <View style={[Styles.nextButtonWrap, { marginTop: "auto" }]}>
                <TouchableOpacity
                  style={[
                    Styles.nextButton,
                    !!(!login || !email || !password) &&
                      Styles.nextButtonDisabled,
                  ]}
                  onPress={goToSecondStep}
                  disabled={!login || !email || !password}>
                  <Text style={Styles.nextButtonText}>Продолжить</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {step === 1 && (
            <View style={Styles.signupStep}>
              <Text style={Styles.stepTitle}>Создай свой аккаунт</Text>
              <Text style={Styles.stepSubtitle}>
                Шаг 2: Добавьте информацию о себе
              </Text>
              <View style={Styles.imgWrap}>
                <TouchableOpacity
                  style={Styles.imgContainer}
                  onPress={pickImage}>
                  <View style={Styles.imgPicker}>
                    {!imageBase64 && (
                      <Image
                        source={require("src/assets/LoginScreen/img-placeholder.png")}
                        style={Styles.imgPlaceholder}
                        resizeMode="contain"
                      />
                    )}
                    {imageBase64 && (
                      <Image
                        source={{
                          uri: `data:image/jpeg;base64,${imageBase64}`,
                        }}
                        style={Styles.img}
                      />
                    )}
                  </View>
                  <AddIcon style={Styles.imgPickerIcon} />
                </TouchableOpacity>
              </View>
              <TextInput
                style={Styles.input}
                onChangeText={onNameChange}
                onSubmitEditing={finishRegistration}
                value={name}
                placeholder="Имя"
                placeholderTextColor="#8D7EFB"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={Styles.input}
                onChangeText={onSurnameChange}
                onSubmitEditing={finishRegistration}
                value={surname}
                placeholder="Фамилия"
                placeholderTextColor="#8D7EFB"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={Styles.input}
                onChangeText={onTelephoneNumberChange}
                onSubmitEditing={finishRegistration}
                value={telephoneNumber}
                placeholder="Номер телефона"
                placeholderTextColor="#8D7EFB"
                autoCapitalize="none"
                autoCorrect={false}
                inputMode="tel"
              />
              <View style={Styles.nextButtonWrap}>
                <TouchableOpacity
                  style={[
                    Styles.nextButton,
                    !!(!name || !surname || !telephoneNumber || !imageBase64) &&
                      Styles.nextButtonDisabled,
                  ]}
                  onPress={finishRegistration}
                  disabled={
                    !name || !surname || !telephoneNumber || !imageBase64
                  }>
                  <Text style={Styles.nextButtonText}>Зарегестрироваться</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={[Styles.loginContainer, step === 1 && { opacity: 0 }]}>
          <>
            <Text style={Styles.loginContainerText}>Уже есть аккаунт? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace(RootRoutes.Login);
              }}>
              <Text style={Styles.loginContainerLink}>Войти</Text>
            </TouchableOpacity>
          </>
        </View>
      </View>
    </ImageBackground>
  );
};

const Styles = StyleSheet.create({
  logo: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 22,
    justifyContent: "center",
    alignItems: "center",
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#FFFFFF66",
  },
  signupForm: {
    flex: 1,
    paddingHorizontal: 22,
  },
  signupStep: {
    flex: 1,
    // justifyContent: "center",
    paddingTop: 140,
    // backgroundColor: "#f00",
    paddingBottom: 22,
  },
  stepTitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: 24,
    color: "#544864",
    marginBottom: 8,
  },
  stepSubtitle: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#544864",
    marginBottom: 24,
  },
  input: {
    height: 54,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#C6BFFD",
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 22,
    backgroundColor: "#fff",
    elevation: 5,
    fontFamily: getFontFamily("medium"),
    fontSize: 14,
    color: "#544864",
  },
  imgWrap: {
    width: (Dimensions.get("screen").width - 44) * 0.52,
    height: (Dimensions.get("screen").width - 44) * 0.52,
    borderWidth: 2,
    borderColor: "#C6BFFD",
    borderRadius: 1000,
    marginHorizontal: "auto",
    marginBottom: 22,
  },
  imgWrapSmall: {
    width: (Dimensions.get("screen").width - 44) * 0.35,
    height: (Dimensions.get("screen").width - 44) * 0.35,
  },
  imgContainer: {
    width: "80%",
    height: "80%",
    borderWidth: 2,
    borderColor: "#C6BFFD",
    borderRadius: 1000,
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
  imgPicker: {
    flex: 1,
  },
  imgPlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 1000,
    marginVertical: "auto",
    marginHorizontal: "auto",
  },
  img: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 1000,
  },
  imgPickerIcon: {
    position: "absolute",
    top: (Dimensions.get("screen").width - 44) * 0.35,
    left: (Dimensions.get("screen").width - 44) * 0.35,
  },
  nextButtonWrap: {
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 5,
  },
  nextButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#7135FD",
  },
  nextButtonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  nextButtonText: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#FFFFFF",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  loginContainerText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#544864",
  },
  loginContainerLink: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#7135FD",
  },
});
