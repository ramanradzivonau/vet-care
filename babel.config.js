module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        extensions: ['.js', '.json'],
        alias: {
          src: './src',
        },
      },
    ],
  ],
};
