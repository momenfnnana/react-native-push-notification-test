/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import Geolocation from '@react-native-community/geolocation';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {StackScreenProps} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect} from 'react';
import {Alert, Linking, Platform, useColorScheme} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import {getProfile} from '@services';
import {readAccessToken, remove, setAxiosAccessToken} from '@utils';
import Config from '../config';
import {useStores} from '../models';
import {
  ForgotPasswordScreen,
  VerficationScreen,
  LoginScreen,
  ResetPasswordScreen,
} from '../screens';

import {DemoNavigator, DemoTabParamList} from './DemoNavigator';
import {navigationRef, useBackButtonHandler} from './navigationUtilities';
import {HomeStackNavigator} from './HomeStackNavigator';
import {PERMISSIONS, request} from 'react-native-permissions';
import {translate} from '@i18n';

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Login: undefined;
  ForgotPassword: undefined;
  Verfication: {Mobile: string; EncCode: string};
  ResetPassword: {Mobile: string; EncCode: string; Code: string};
  Demo: NavigatorScreenParams<DemoTabParamList>;
};

export type VerficationScreenRouteProp = RouteProp<
  AppStackParamList,
  'Verfication'
>;
export type ResetPasswordScreenRouteProp = RouteProp<
  AppStackParamList,
  'ResetPassword'
>;

export type LoginNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Login'
>;
export type ForgotPasswordNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'ForgotPassword'
>;
export type VerficationNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'Verfication'
>;
export type ResetPasswordNavigationProp = NativeStackNavigationProp<
  AppStackParamList,
  'ResetPassword'
>;
/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  // @demo remove-block-start
  const {
    authenticationStore: {
      isAuthenticated,
      setAccessToken,
      accessToken,
      setLocationPermission,
    },
  } = useStores();
  const queryClient = new QueryClient();
  const {isLoading, data, status, error, refetch} = useQuery(
    'getProfile',
    getProfile,
    {
      retry: 0,
      enabled: false,
    },
  );

  const requestLocation = useCallback(async () => {
    Platform.OS === 'android'
      ? request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(result => {
          if (result === 'granted') {
            setLocationPermission(true);
            Geolocation.setRNConfiguration({
              skipPermissionRequests: false,
              authorizationLevel: 'auto',
              locationProvider: 'auto',
            });
          }
          if (result !== 'granted') {
            Alert.alert(
              'Location disabled',
              translate('common.openLocation'),
              [
                {
                  text: translate('common.setting'),
                  onPress: () => {
                    Linking.openSettings();
                  },
                },
                {
                  text: translate('common.cancel'),
                  onPress: () => {},
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
          }
        })
      : request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(async result => {
          setLocationPermission(result !== 'blocked');
          if (result === 'blocked') {
            Alert.alert(
              'Location disabled',
              translate('common.openLocation'),
              [
                {
                  text: translate('common.setting'),
                  onPress: () => {
                    Linking.openURL('app-settings:');
                  },
                },
                {
                  text: translate('common.cancel'),
                  onPress: () => {},
                  style: 'destructive',
                },
              ],
              {cancelable: false},
            );
          } else {
            Geolocation.setRNConfiguration({
              skipPermissionRequests: false,
              authorizationLevel: 'auto',
              locationProvider: 'auto',
            });
          }
        });
  }, []);

  useEffect(() => {
    readAccessToken().then(accessToken => {
      if (accessToken) {
        setAxiosAccessToken(accessToken);
        setAccessToken(accessToken);
        refetch();
      }
    });
  }, [accessToken]);

  useEffect(() => {
    if (status === 'error') {
      setAccessToken('');
      setAxiosAccessToken('');
      remove('accessToken');
    }
  }, [status]);

  useEffect(() => {
    requestLocation();
  }, []);

  // @demo remove-block-end
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isAuthenticated ? 'Demo' : 'Login'}>
        {isAuthenticated ? (
          <Stack.Screen name="Demo" component={DemoNavigator} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen name="Verfication" component={VerficationScreen} />
            <Stack.Screen
              name="ResetPassword"
              component={ResetPasswordScreen}
            />
          </>
        )}
        {/* @demo remove-block-end */}
        {/** 🔥 Your screens go here */}
      </Stack.Navigator>
    </QueryClientProvider>
  );
});

interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(
  props: NavigationProps,
) {
  const colorScheme = useColorScheme();

  useBackButtonHandler(routeName => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
      {...props}>
      <AppStack />
    </NavigationContainer>
  );
});
