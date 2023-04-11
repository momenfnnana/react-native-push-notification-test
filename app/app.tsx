/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigators, so head over there
 * if you're interested in adding screens and navigators.
 */
import './i18n';
import './utils/ignoreWarnings';
import React, {useCallback, useEffect} from 'react';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import {useInitialRootStore, useStores} from './models';
import {AppNavigator, useNavigationPersistence} from './navigators';
import {ErrorBoundary} from './screens/ErrorScreen/ErrorBoundary';
import * as storage from './utils/storage';
import {colors, typography} from './theme';
import Config from './config';
import {
  DefaultTheme,
  Provider as PaperProvider,
  useTheme,
} from 'react-native-paper';
import {QueryClient, QueryClientProvider} from 'react-query';
import {readAccessToken, setAxiosAccessToken} from '@utils';
import {useAccessToken} from '@hooks';
import {Alert, Linking, PermissionsAndroid, Platform, Text} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.palette.neutral100,
  },
  roundness: 12,
  fonts: {
    ...DefaultTheme.fonts,
    regular: {fontFamily: typography.fonts.spaceGrotesk.normal},
  },
};

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

const config = {
  screens: {
    Login: {
      path: '',
    },
    Welcome: 'welcome',
    Demo: {
      screens: {
        DemoShowroom: {
          path: 'showroom/:queryIndex?/:itemIndex?',
        },
        DemoDebug: 'debug',
        DemoPodcastList: 'podcast',
        DemoCommunity: 'community',
      },
    },
  },
};

interface AppProps {
  hideSplashScreen: () => Promise<void>;
}

/**
 * This is the root component of our app.
 */
function App(props: AppProps) {
  const theme = useTheme();
  const {hideSplashScreen} = props;
  const {
    authenticationStore: {setAccessToken},
  } = useStores();
  const {accessToken} = useAccessToken();
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const {rehydrated} = useInitialRootStore(() => {
    // This runs after the root store has been initialized and rehydrated.

    // If your initialization scripts run very fast, it's good to show the splash screen for just a bit longer to prevent flicker.
    // Slightly delaying splash screen hiding for better UX; can be customized or removed as needed,
    // Note: (vanilla Android) The splash-screen will not appear if you launch your app via the terminal or Android Studio. Kill the app and launch it normally by tapping on the launcher icon. https://stackoverflow.com/a/69831106
    // Note: (vanilla iOS) You might notice the splash-screen logo change size. This happens in debug/development mode. Try building the app for release.
    setTimeout(hideSplashScreen, 500);
  });

  // useEffect(() => {
  //   readAccessToken().then(accessToken => {
  //     console.log({accessToken});
  //     if (accessToken) {
  //       setAxiosAccessToken(accessToken);
  //       setAccessToken(accessToken);
  //     }
  //   });
  // }, [accessToken]);
  async function requestUserPermission() {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    }
  }
  useEffect(() => {
    requestUserPermission();
  }, []);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color.
  // In iOS: application:didFinishLaunchingWithOptions:
  // In Android: https://stackoverflow.com/a/45838109/204044
  // You can replace with your own loading component if you wish.
  if (!rehydrated || !isNavigationStateRestored) return null;
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider theme={customTheme}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ErrorBoundary catchErrors={Config.catchErrors}>
            <AppNavigator
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </ErrorBoundary>
        </SafeAreaProvider>
      </PaperProvider>
    </QueryClientProvider>
  );
}

export default App;
