import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps, getFocusedRouteNameFromRoute, Route } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { Alert, Linking, Platform, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "@components"
import { translate } from "@i18n"
import { colors, spacing, typography } from "@theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { ProfileStackNavigator, ProfileStackNavigatorParamList } from "./ProfileStackNavigator"
import { DriverIcon, HomeBottom, OrderIcon, UserIcon } from "@assets"
import { HomeStackNavigator, HomeStackNavigatorParamList } from "./HomeStackNavigator"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { CaptainList } from "@screens"
import Geolocation from "@react-native-community/geolocation"
import { useMutation } from "react-query"
import { updateLocation } from "@services"

export type DemoTabParamList = {
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
  ProfileStackNavigator: ProfileStackNavigatorParamList
  ProfileScreen: undefined
  HomeStack: HomeStackNavigatorParamList
  CaptainList: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>
export type HomeScreenNavigationProp = NativeStackNavigationProp<DemoTabParamList, "HomeStack">
export type CaptainListScreenNavigationProp = NativeStackNavigationProp<
  DemoTabParamList,
  "CaptainList"
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()
  const [subscriptionId, setSubscriptionId] = useState<number>(0)
  const { mutate } = useMutation(updateLocation)
  const getTabBarVisibility = (route: Partial<Route<string>>) => {
    const routeName = getFocusedRouteNameFromRoute(route)
    const hideOnScreens = ["OrderDetails"] // put here name of screen where you want to hide tabBar
    return hideOnScreens.indexOf(routeName) <= -1
  }

  const watchPosition = () => {
    try {
      const watchID = Geolocation.watchPosition(
        (position) => {
          mutate({
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString(),
          })
        },
        (error) => {
          Alert.alert(
            "Location disabled",
            translate("common.openLocation"),
            [
              {
                text: translate("common.setting"),
                onPress: () => {
                  Platform.OS === "android"
                    ? Linking.openSettings()
                    : Linking.openURL("app-settings:")
                },
              },
              {
                text: translate("common.cancel"),
                onPress: () => {},
                style: "destructive",
              },
            ],
            { cancelable: false },
          )
        },
        {
          timeout: 60000,
          // enableHighAccuracy: true,
          distanceFilter: 70,
        },
      )
      setSubscriptionId(watchID)
    } catch (error) {
      Alert.alert("WatchPosition Error", JSON.stringify(error))
    }
  }

  const clearWatch = () => {
    subscriptionId !== null && Geolocation.clearWatch(subscriptionId)
    setSubscriptionId(null)
  }

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        console.log(JSON.stringify(pos))
      },
      (error) => Alert.alert("GetCurrentPosition Error", JSON.stringify(error)),
      { enableHighAccuracy: true },
    )
  }

  useEffect(() => {
    watchPosition()
    return () => {
      clearWatch()
    }
  }, [])

  // const getCurrentPosition = () => {
  //   Geolocation.getCurrentPosition(
  //     (pos) => {
  //       Alert.alert("xxx: ", JSON.stringify(pos))
  //       mutate({
  //         latitude: pos.coords.latitude.toString(),
  //         longitude: pos.coords.longitude.toString(),
  //       })
  //     },
  //     (error) =>
  //       Alert.alert(
  //         "Location disabled",
  //         JSON.stringify(error),
  //         [
  //           {
  //             text: translate("common.setting"),
  //             onPress: () => {
  //               Platform.OS === "android"
  //                 ? Linking.openSettings()
  //                 : Linking.openURL("app-settings:")
  //             },
  //           },
  //           {
  //             text: translate("common.cancel"),
  //             onPress: () => {},
  //             style: "destructive",
  //           },
  //         ],
  //         { cancelable: false },
  //       ),
  //     { enableHighAccuracy: true },
  //   )
  // }

  // const watchPosition = useDebouncedCallback(() => {
  //   getCurrentPosition()
  // }, 7000)

  // const clearWatch = () => {
  //   subscriptionId !== null && Geolocation.clearWatch(subscriptionId)
  //   setSubscriptionId(null)
  // }

  // // debounced()
  // useEffect(() => {
  //   watchPosition()
  // })

  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 70 }],
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.defult,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={({ route }) => ({
          tabBarLabel: translate("demoNavigator.homeTap"),
          tabBarIcon: ({ focused }) => (
            <HomeBottom color={focused ? colors.primary : colors.defult} />
          ),
          // tabBarStyle: { display: getTabBarVisibility(route) ? "flex" : "none" },
        })}
      />
      <Tab.Screen
        name="CaptainList"
        component={CaptainList}
        options={{
          tabBarLabel: translate("demoNavigator.toplist"),
          tabBarIcon: ({ focused }) => (
            <DriverIcon color={focused ? colors.primary : colors.defult} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStackNavigator"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: translate("demoNavigator.profileTab"),
          tabBarIcon: ({ focused }) => (
            <UserIcon color={focused ? colors.primary : colors.defult} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.palette.neutral100,
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
