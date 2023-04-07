const plugins = [
  [
    "@babel/plugin-proposal-decorators",
    {
      legacy: true,
    },
  ],
  ["@babel/plugin-proposal-optional-catch-binding"],
  [
    "react-native-reanimated/plugin",
    {
      globals: ["__scanCodes"],
    },
  ], // NOTE: this must be last in the plugins
  [
    "module-resolver",
    {
      root: ["./app"],
      extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
      alias: {
        tests: ["./tests/"],
        "@screens": "./app/screens",
        "@components": "./app/components",
        "@utils": "./app/utils",
        "@config": "./app/config",
        "@i18n": "./app/i18n",
        "@models": "./app/models",
        "@navigators": "./app/navigators",
        "@services": "./app/services",
        "@theme": "./app/theme",
        "@hooks": "./app/hooks",
        "@constants": "./app/constants",
        "@types": "./app/types",
        "@assets": "./assets",
      },
    },
  ],
]

const vanillaConfig = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins,
}

const expoConfig = {
  presets: ["babel-preset-expo"],
  env: {
    production: {},
  },
  plugins,
}

let isExpo = false
try {
  const Constants = require("expo-constants")
  // True if the app is running in an `expo build` app or if it's running in Expo Go.
  isExpo =
    Constants.executionEnvironment === "standalone" ||
    Constants.executionEnvironment === "storeClient"
} catch {}

const babelConfig = vanillaConfig

module.exports = babelConfig
