import { FC, useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootRoutes, RootStackParamList } from "src/types";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getFontFamily } from "src/utils/fontFamily";
import { useDispatch } from "react-redux";
import { useLazyLoginQuery } from "src/services/modules/owner";
import { setOwner } from "src/store/owner";

type LoginScreenParams = StackScreenProps<RootStackParamList, RootRoutes.Login>;

export const LoginScreen: FC<LoginScreenParams> = ({ navigation }) => {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");

  const [loginFetch, { status, data }] = useLazyLoginQuery();
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();

  const onLoginHandler = () => {
    if (email && password) {
      loginFetch({ email, password });
    }
  };

  useEffect(() => {
    if (status === "fulfilled" && data) {
      dispatch(setOwner(data));
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
          <View style={Styles.signupStep}>
            <Text style={Styles.stepTitle}>Войдите в свой аккаунт</Text>
            <TextInput
              style={Styles.input}
              onChangeText={onEmailChange}
              onSubmitEditing={onLoginHandler}
              value={email}
              placeholder="Почта"
              placeholderTextColor="#DDC2FF"
              autoCapitalize="none"
              autoCorrect={false}
              inputMode="email"
            />
            <TextInput
              style={Styles.input}
              onChangeText={onPasswordChange}
              onSubmitEditing={onLoginHandler}
              value={password}
              placeholder="Пароль"
              placeholderTextColor="#DDC2FF"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
            />
            <View style={Styles.nextButtonWrap}>
              <TouchableOpacity
                style={[
                  Styles.nextButton,
                  !!(!email || !password) && Styles.nextButtonDisabled,
                ]}
                onPress={onLoginHandler}
                disabled={!email || !password}>
                <Text style={Styles.nextButtonText}>Войти</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={Styles.signUpContainer}>
          <>
            <Text style={Styles.signUpContainerText}>Нет аккаунта? </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.replace(RootRoutes.Signup);
              }}>
              <Text style={Styles.signUpContainerLink}>Зарегестрироваться</Text>
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
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  signupForm: {
    flex: 0.75,
    paddingHorizontal: 22,
  },
  signupStep: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 144,
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
    borderWidth: 1,
    borderColor: "#7D16FF",
    padding: 10,
    marginBottom: 24,
    backgroundColor: "#fff",
    elevation: 5,
    fontFamily: getFontFamily("regular"),
    fontSize: 14,
    color: "#544864",
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
    backgroundColor: "#7D16FF",
  },
  nextButtonDisabled: {
    backgroundColor: "#9E9E9E",
  },
  nextButtonText: {
    fontFamily: getFontFamily("bold"),
    fontSize: 16,
    color: "#FFFFFF",
  },
  signUpContainer: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpContainerText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#544864",
  },
  signUpContainerLink: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#7D16FF",
  },
});
