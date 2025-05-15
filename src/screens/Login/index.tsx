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
import { useLazyLoginQuery } from "src/services/modules/owner";
import { loginUser } from "src/store/user";
import { useAppDispatch } from "src/store";

type LoginScreenParams = StackScreenProps<RootStackParamList, RootRoutes.Login>;

export const LoginScreen: FC<LoginScreenParams> = ({ navigation }) => {
  const [email, onEmailChange] = useState("");
  const [password, onPasswordChange] = useState("");

  const [loginFetch, { status, data }] = useLazyLoginQuery();
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const onLoginHandler = () => {
    if (email && password) {
      loginFetch({ email, password });
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
          <View style={Styles.signupStep}>
            <Text style={Styles.stepTitle}>Войдите в свой аккаунт</Text>
            <TextInput
              style={Styles.input}
              onChangeText={onEmailChange}
              onSubmitEditing={onLoginHandler}
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
              onSubmitEditing={onLoginHandler}
              value={password}
              placeholder="Пароль"
              placeholderTextColor="#8D7EFB"
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
    color: "#7135FD",
  },
});
