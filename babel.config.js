module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          // tests: ['./tests/'],
          // '@screens': './app/screens',
          '@utils': './app/utils',
          '@config': './app/config',
          '@i18n': './app/i18n',
          '@models': './app/models',
          // '@navigators': './app/navigators',
          '@services': './app/services',
          '@theme': './app/theme',
          '@hooks': './app/hooks',
          // '@constants': './app/constants',
          // '@types': './app/types',
          '@assets': './assets',
          '@components': './app/components'
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
