import { FC, useEffect } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import SplashScreen from "react-native-splash-screen";
import ReAnimated, {
  useDerivedValue,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
  Extrapolation,
  useAnimatedStyle,
  withDelay,
  useAnimatedProps,
} from "react-native-reanimated";
import {
  Canvas,
  rrect,
  rect,
  Path,
  Group,
  Circle,
  DiffRect,
} from "@shopify/react-native-skia";
import { BlurView } from "@react-native-community/blur";
import { getFontFamily } from "src/utils/fontFamily";
import { RootRoutes, RootStackParamList } from "src/types";
import { MMKV } from "react-native-mmkv";
import { useLazyGetAllDoctorsQuery } from "src/services/modules/doctor";
import { setDoctors } from "src/store/doctor";
import { useAppDispatch } from "src/store";

const storage = new MMKV();

const path =
  "M16.4131 759.637C16.4131 759.637 16.9096 741.328 15.4201 733.411C13.9305 725.493 9.46176 697.783 7.47567 687.886C5.48957 677.99 4 668.588 4 655.227C4 641.867 6.48238 623.558 8.46872 615.641C10.4551 607.723 12.4414 600.796 15.9168 589.91C19.3922 579.023 26.3441 566.158 30.316 559.23C34.288 552.302 45.2113 542.406 48.6872 539.932C52.1631 537.457 66.562 529.54 66.562 529.54C70.5345 527.561 71.0307 527.066 75.4997 525.581C79.9687 524.097 82.9471 526.571 84.4369 527.561C85.9267 528.55 88.4091 533.499 88.4091 535.478C88.4091 537.457 88.4088 545.87 87.416 551.808C86.4232 557.745 84.4366 559.725 82.4508 565.663C80.465 571.601 78.9749 576.549 78.9751 583.972C78.9754 591.394 79.9679 595.353 82.9473 602.28C85.9267 609.208 89.4019 614.156 92.8778 619.105C96.3537 624.053 101.319 630.981 102.809 634.939C104.298 638.898 104.795 641.867 104.795 649.784C104.795 657.701 101.319 659.186 97.843 663.639C94.3671 668.093 73.0171 684.422 64.5759 687.391C56.1348 690.36 43.7222 697.783 32.7984 693.329C21.8746 688.876 21.3786 683.928 19.889 677C18.3994 670.072 18.3994 662.155 21.3786 644.836C24.3577 627.517 33.7914 597.332 33.7914 597.332C33.7914 597.332 37.7641 582.487 42.2326 571.601C46.7011 560.714 58.1214 547.849 63.5829 543.395C69.0444 538.942 82.451 531.519 91.3885 528.056C100.326 524.592 115.222 521.623 127.138 519.149C139.055 516.674 145.103 519.149 149.978 522.118C158.916 527.561 159.412 532.014 165.867 538.447C172.322 544.88 179.769 550.323 193.672 551.808C207.575 553.292 243.821 549.333 249.283 548.344C254.745 547.354 258.717 546.364 264.179 548.344C269.641 550.323 272.619 554.282 274.606 558.735C276.592 563.189 273.612 578.034 272.123 587.435C270.634 596.837 258.221 621.579 246.801 631.475C235.38 641.372 218.002 650.279 207.575 656.712C197.148 663.145 195.162 668.093 193.176 673.041C191.19 677.99 192.182 684.917 191.19 693.329C190.197 701.742 179.273 714.607 173.315 725.988C167.357 737.369 163.384 750.73 162.888 761.616C162.391 772.502 166.363 785.368 169.839 790.316C173.315 795.265 174.805 799.718 184.238 803.182C193.672 806.646 204.596 798.234 212.54 794.275C220.485 790.316 232.401 787.347 243.325 786.853C254.249 786.358 274.109 793.285 274.109 793.285C274.109 793.285 292.48 800.708 307.376 800.708C322.272 800.708 330.713 795.265 336.175 790.316C341.637 785.368 349.581 778.44 354.546 775.966C359.511 773.492 368.945 769.533 384.834 773.492C400.226 778.44 414.625 767.554 419.591 763.595C424.556 759.637 427.039 759.142 434.983 747.266C442.927 735.39 432.997 721.04 423.067 718.071C413.136 715.102 401.22 714.607 382.848 713.123C364.476 711.638 361.001 704.71 357.525 701.247C354.049 697.783 347.098 683.928 340.147 677.495C333.195 671.062 329.224 671.062 318.796 672.052C308.369 673.041 303.9 680.464 300.921 685.907C297.943 691.35 298.935 703.226 301.914 708.669C304.894 714.112 313.335 724.009 324.258 731.431C335.182 738.854 340.147 737.864 353.057 736.38C365.966 734.895 371.428 726.978 374.903 724.009C378.379 721.04 388.31 708.669 403.205 685.907C418.101 663.145 409.66 629.001 406.681 619.105C403.702 609.208 385.827 565.168 378.876 540.921C371.924 516.674 376.89 497.871 380.862 484.51C384.834 471.15 390.296 459.274 393.275 450.862C396.254 442.45 395.758 438.491 391.785 431.563C387.813 424.636 372.421 407.811 368.449 400.884C364.476 393.956 366.463 387.523 370.435 382.575C374.407 377.627 391.289 372.184 401.716 364.761C412.143 357.339 413.136 348.432 415.618 338.04C418.101 327.649 417.108 313.299 414.625 295.98C412.143 278.66 406.682 258.372 405.192 241.548C403.702 224.724 404.199 220.765 403.702 208.889C403.205 197.013 400.227 180.684 398.737 173.756C397.247 166.828 397.247 163.859 394.268 161.385C391.289 158.911 387.317 158.911 384.337 161.88C381.358 164.849 381.359 169.797 374.407 173.756C367.455 177.715 363.98 178.21 354.049 178.21C344.119 178.21 334.685 175.241 328.23 171.777C321.775 168.313 320.286 165.344 319.293 158.911C318.3 152.478 321.776 146.54 319.293 139.613C316.81 132.685 305.39 120.314 302.908 109.428C300.425 98.5417 301.915 87.6554 299.928 79.2433C297.942 70.8311 295.956 66.3776 291.984 58.9552C288.012 51.5327 284.04 48.0689 278.081 44.1102C272.123 40.1516 272.62 39.1619 272.123 36.1929C271.626 33.2239 274.109 29.2653 279.571 28.7704C285.033 28.2756 306.879 26.7911 315.321 29.7601C323.762 32.7291 327.733 32.7291 330.713 36.1929C333.692 39.6567 332.202 42.6257 328.23 47.0792C324.258 51.5327 317.307 49.0585 314.328 44.1102C311.348 39.1619 301.915 22.3376 300.425 18.8738C298.935 15.41 298.936 13.9255 300.921 10.9565C302.907 7.9875 305.887 8.48233 309.363 8.48233C312.838 8.48233 336.174 12.9358 346.105 13.9255C356.036 14.9151 365.469 14.4203 373.91 10.4617C382.352 6.50301 388.31 4.52382 402.213 4.02899C416.115 3.53415 431.507 9.47186 439.948 14.4203C448.389 19.3688 468.25 34.7084 478.677 39.1619C489.104 43.6154 504 44.6051 504 44.6051";

const AnimatedImageBackground =
  ReAnimated.createAnimatedComponent(ImageBackground);

type WelcomeScreenParams = StackScreenProps<
  RootStackParamList,
  RootRoutes.Welcome
>;

export const WelcomeScreen: FC<WelcomeScreenParams> = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const isLogIn = !!storage.getString("access_token");

  const [fetchDoctors, { status: doctorsStatus, data: doctorsData }] =
    useLazyGetAllDoctorsQuery();
  const dispatch = useAppDispatch();

  const progress = useSharedValue(0);
  const infoOpacity = useSharedValue(0);

  const firstSegmentTransform = useDerivedValue(() => {
    return [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, -(140 / 430) * width],
          Extrapolation.CLAMP
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, -(68 / 932) * height],
          Extrapolation.CLAMP
        ),
      },
    ];
  });
  const secondSegmentTransform = useDerivedValue(() => {
    return [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, -(8 / 430) * width],
          Extrapolation.CLAMP
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, -(232 / 932) * height],
          Extrapolation.CLAMP
        ),
      },
    ];
  });
  const thirdSegmentTransform = useDerivedValue(() => {
    return [
      {
        translateX: interpolate(
          progress.value,
          [0, 1],
          [0, (66 / 430) * width],
          Extrapolation.CLAMP
        ),
      },
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [0, -(197 / 932) * height],
          Extrapolation.CLAMP
        ),
      },
    ];
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    opacity: progress.value === 1 ? 1 : 0,
  }));
  const infoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: infoOpacity.value,
  }));
  const infoAnimatedProps = useAnimatedProps(() => ({
    pointerEvents:
      infoOpacity.value !== 1 ? ("none" as "none") : ("auto" as "auto"),
  }));

  const pathTransform = useDerivedValue(() => {
    return [
      { translateX: -32 },
      { translateY: 78 - insets.top },
      { scaleX: width / 430 },
      { scaleY: (height + insets.top) / 932 },
    ];
  });

  const outer = rrect(
    rect(
      (93 / 430) * width,
      (354 / 932) * height,
      (130 / 430) * width,
      (130 / 430) * width
    ),
    ((130 / 430) * width) / 2,
    ((130 / 430) * width) / 2
  );
  const inner = rrect(
    rect(
      (126 / 430) * width,
      (388 / 932) * height,
      (64 / 430) * width,
      (64 / 430) * width
    ),
    ((64 / 430) * width) / 2,
    ((64 / 430) * width) / 2
  );

  useEffect(() => {
    SplashScreen.hide();
    progress.value = withTiming(1, {
      duration: 5000,
      easing: Easing.inOut(Easing.cubic),
    });
    infoOpacity.value = withDelay(
      5000,
      withTiming(1, {
        duration: 700,
        easing: Easing.inOut(Easing.cubic),
      })
    );
  }, []);

  useEffect(() => {
    if (isLogIn) {
      fetchDoctors();
    }
  }, [isLogIn]);

  useEffect(() => {
    if (doctorsStatus === "fulfilled" && doctorsData) {
      dispatch(setDoctors(doctorsData));
      navigation.reset({
        index: 0,
        routes: [{ name: RootRoutes.Main }],
      });
    }
  }, [doctorsStatus, doctorsData]);

  return (
    <View style={Styles.wrap}>
      <SafeAreaView style={Styles.safeArea}>
        <Canvas style={[Styles.canvas]}>
          <Group transform={firstSegmentTransform}>
            <Circle
              cx={(111 / 430) * width + ((200 / 430) * width) / 2}
              cy={(376 / 932) * height + ((200 / 932) * height) / 2}
              r={((200 / 430) * width) / 2}
              color="#B77EFF8C"
            />
            <Circle
              cx={(111 / 430) * width + ((200 / 430) * width) / 2}
              cy={(376 / 932) * height + ((200 / 932) * height) / 2}
              r={((134 / 430) * width) / 2}
              color="#fff"
            />
          </Group>
          <Group transform={secondSegmentTransform}>
            <DiffRect inner={inner} outer={outer} color="#F1E5FF" />
          </Group>
          <Group transform={thirdSegmentTransform}>
            <Circle
              cx={(169 / 430) * width + ((24 / 430) * width) / 2}
              cy={(508 / 932) * height + ((24 / 932) * height) / 2}
              r={((24 / 430) * width) / 2}
              color="#B77EFF"
            />
          </Group>
          <Group transform={pathTransform}>
            <Path
              path={path}
              color="#9999FF"
              // start={0.5}
              end={progress}
              style="stroke"
              strokeCap="round"
              strokeWidth={7}
            />
          </Group>
        </Canvas>
        <ImageBackground
          source={require("src/assets/WelcomeScreen/logo.png")}
          resizeMode="cover"
          style={[Styles.logo, { top: insets.top }]}></ImageBackground>
      </SafeAreaView>
      {!isLogIn && (
        <AnimatedImageBackground
          source={require("src/assets/WelcomeScreen/screenBg.png")}
          resizeMode="cover"
          style={[
            Styles.background,
            {
              top: insets.top,
              height: height,
              width: width,
            },
            backgroundAnimatedStyle,
          ]}>
          <ReAnimated.View
            style={[Styles.info, infoAnimatedStyle]}
            animatedProps={infoAnimatedProps}>
            <View style={Styles.infoBg}>
              <BlurView
                style={Styles.infoBlur}
                blurType="light"
                blurAmount={7}
                reducedTransparencyFallbackColor="white"
              />
            </View>
            <View style={Styles.infoContainer}>
              <Text style={Styles.infoTitle}>Позаботься о своём питомце</Text>
              <TouchableOpacity
                style={Styles.loginButton}
                onPress={() => {
                  navigation.navigate(RootRoutes.Login);
                }}>
                <Text style={Styles.loginButtonText}>Вход</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={Styles.signUpButton}
                onPress={() => {
                  navigation.navigate(RootRoutes.Signup);
                }}>
                <Text style={Styles.signUpButtonText}>Регистрация</Text>
              </TouchableOpacity>
            </View>
          </ReAnimated.View>
        </AnimatedImageBackground>
      )}
    </View>
  );
};

const Styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: "#fff",
  },
  safeArea: {
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
  logo: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  background: {
    position: "absolute",
    justifyContent: "flex-end",
    paddingHorizontal: 22,
    paddingBottom: 80,
  },
  info: {
    width: "100%",
    borderRadius: 30,
    elevation: 5,
  },
  infoBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#ffffff80",
  },
  infoBlur: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    padding: 32,
  },
  infoTitle: {
    marginBottom: 24,
    fontFamily: getFontFamily("extraBold"),
    fontSize: 28,
    textAlign: "center",
    color: "#544864",
  },
  loginButton: {
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#7D16FF",
  },
  signUpButton: {
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#7D16FF",
    borderRadius: 12,
    backgroundColor: "#F8F2FF",
  },
  loginButtonText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#FFF",
  },
  signUpButtonText: {
    fontFamily: getFontFamily("semiBold"),
    fontSize: 16,
    color: "#7D16FF",
  },
});
