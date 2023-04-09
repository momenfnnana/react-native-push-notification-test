/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from "./app/app.tsx"
import {name as appName} from './app.json';
import RNBootSplash from "react-native-bootsplash"
import 'react-native-gesture-handler';
import "./Base64"
// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent(appName, () => IgniteApp);
