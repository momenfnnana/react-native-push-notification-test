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

function App(props: AppProps) {
  const {hideSplashScreen} = props;
  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY);

  const {rehydrated} = useInitialRootStore(() => {
    setTimeout(hideSplashScreen, 500);
  });

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
