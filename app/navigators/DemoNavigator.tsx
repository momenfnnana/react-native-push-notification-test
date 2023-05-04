import {
  BottomTabScreenProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  getFocusedRouteNameFromRoute,
  Route,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, Platform, TextStyle, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '@components';
import {translate} from '@i18n';
import {colors, spacing, typography} from '@theme';
import {AppStackParamList, AppStackScreenProps} from './AppNavigator';
import {
  ProfileStackNavigator,
  ProfileStackNavigatorParamList,
} from './ProfileStackNavigator';
import {DriverIcon, HomeBottom, OrderIcon, UserIcon} from '@assets';
import {
  HomeStackNavigator,
  HomeStackNavigatorParamList,
} from './HomeStackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CaptainList} from '@screens';
import Geolocation from '@react-native-community/geolocation';
import {useMutation} from 'react-query';
import {updateLocation} from '@services';
import {useStores} from '@models';
import Snackbar from 'react-native-snackbar';
// import BackgroundFetch from 'react-native-background-fetch';

export type DemoTabParamList = {
  DemoCommunity: undefined;
  DemoShowroom: {queryIndex?: string; itemIndex?: string};
  DemoDebug: undefined;
  DemoPodcastList: undefined;
  ProfileStackNavigator: ProfileStackNavigatorParamList;
  ProfileScreen: undefined;
  HomeStack: HomeStackNavigatorParamList;
  CaptainList: undefined;
};

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<DemoTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
  >;
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  DemoTabParamList,
  'HomeStack'
>;
export type CaptainListScreenNavigationProp = NativeStackNavigationProp<
  DemoTabParamList,
  'CaptainList'
>;

const Tab = createBottomTabNavigator<DemoTabParamList>();

export function DemoNavigator() {
  const {bottom} = useSafeAreaInsets();
  const [subscriptionId, setSubscriptionId] = useState<number>(0);
  const {mutate} = useMutation(updateLocation);
  // const {
  //   authenticationStore: {locationPermission},
  // } = useStores();

  // const watchPosition = useCallback(() => {
  //   try {
  //     const watchID = Geolocation.watchPosition(
  //       position => {
  //         const latitude = position.coords.latitude.toString();
  //         const longitude = position.coords.longitude.toString();
  //         mutate({
  //           latitude,
  //           longitude,
  //         });
  //         Snackbar.show({
  //           text: translate('common.updateLocationMsg', {latitude, longitude}),
  //           duration: Snackbar.LENGTH_LONG,
  //           backgroundColor: colors.palette.greenPalette.green,
  //           numberOfLines: 7,
  //         });
  //       },
  //       error => {
  //         Alert.alert(
  //           'Location disabled',
  //           translate('common.openLocation'),
  //           [
  //             {
  //               text: translate('common.setting'),
  //               onPress: () => {
  //                 Platform.OS === 'android'
  //                   ? Linking.openSettings()
  //                   : Linking.openURL('app-settings:');
  //               },
  //             },
  //             {
  //               text: translate('common.cancel'),
  //               onPress: () => {},
  //               style: 'destructive',
  //             },
  //           ],
  //           {cancelable: false},
  //         );
  //       },
  //       {
  //         timeout: 500,
  //         enableHighAccuracy: false,
  //         maximumAge: 0,
  //         // interval:1,
  //         distanceFilter: 1,
  //       },
  //     );
  //     setSubscriptionId(watchID);
  //   } catch (error) {
  //     Alert.alert('WatchPosition Error', JSON.stringify(error));
  //   }
  // }, []);

  // const clearWatch = () => {
  //   subscriptionId !== null && Geolocation.clearWatch(subscriptionId);
  //   setSubscriptionId(0);
  // };

  // useEffect(() => {
  //   if (locationPermission) {
  //     watchPosition();
  //   }
  //   return () => {
  //     clearWatch();
  //   };
  // }, []);

  useEffect(() => {
    // BackgroundFetch.configure(
    //   {
    //     minimumFetchInterval: 1, // Minimum fetch interval in minutes
    //     stopOnTerminate: false, // Keep the app running in the background
    //     startOnBoot: true, // Start the background fetch on boot
    //     enableHeadless: true, // Enable headless mode for iOS
    //     requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
    //   },
    //   async taskId => {
    //     Geolocation.getCurrentPosition(position => {
    //       console.log(position);
    //       Alert.alert(JSON.stringify(position));
    //       BackgroundFetch.finish(taskId); // Signal that the fetch is complete
    //     });
    //   },
    //   error => {
    //     console.log('[BackgroundFetch] Error:', error);
    //   },
    // );

    const intervalId = setInterval(() => {
      Geolocation.getCurrentPosition(
        position => {
          const latitude = position.coords.latitude.toString();
          const longitude = position.coords.longitude.toString();
          mutate({
            latitude,
            longitude,
          });
          Snackbar.show({
            text: translate('common.updateLocationMsg', {latitude, longitude}),
            duration: Snackbar.LENGTH_LONG,
            backgroundColor: colors.palette.greenPalette.green,
            numberOfLines: 7,
          });
        },
        error => console.log(error),
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, {height: bottom + 70}],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.defult,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={({route}) => ({
          tabBarLabel: translate('demoNavigator.homeTap'),
          tabBarIcon: ({focused}) => (
            <HomeBottom color={focused ? colors.primary : colors.defult} />
          ),
          // tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" },
        })}
      />
      <Tab.Screen
        name="CaptainList"
        component={CaptainList}
        options={{
          tabBarLabel: translate('demoNavigator.toplist'),
          tabBarIcon: ({focused}) => (
            <DriverIcon color={focused ? colors.primary : colors.defult} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: translate('demoNavigator.profileTab'),
          tabBarIcon: ({focused}) => (
            <UserIcon color={focused ? colors.primary : colors.defult} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopColor: colors.transparent,
};

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
};

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
};

// @demo remove-file
