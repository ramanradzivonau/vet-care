const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const blacklist = require("metro-config/src/defaults/exclusionList");

const defaultConfig = getDefaultConfig(__dirname);

const {
  resolver: { sourceExts, assetExts },
} = getDefaultConfig(__dirname);

const {
  wrapWithReanimatedMetroConfig,
} = require("react-native-reanimated/metro-config");

const config = {
  resetCache: true,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== "svg"),
    sourceExts: [...sourceExts, "svg"],
    blacklistRE: blacklist([/android\/app\/\.cxx.*/]),
  },
};

module.exports = wrapWithReanimatedMetroConfig(
  mergeConfig(defaultConfig, config)
);
