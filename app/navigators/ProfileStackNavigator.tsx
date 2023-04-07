import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  ProfileScreen,
  ProfileDetailsScreen,
  ContactUsScreen,
  AboutUsScreen,
  ChangeVehicleTypeScreen,
  ChangePasswordScreen,
} from "@screens"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { UserStoreSnapshot } from "models"
import { RouteProp } from "@react-navigation/native"

export type ProfileStackNavigatorParamList = {
  Profile: undefined
  ProfileDetails: { mobile: string; name: string; carNumber: string; profilePhoto?: string }
  ContactUsScreen: undefined
  AboutUsScreen: undefined
  ChangeVehicleScreen: undefined
  ChangePasswordScreen: undefined
}

export type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  "Profile"
>

export type ProfileDetailsScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  "ProfileDetails"
>
export type ProfileScreenDetailsRouteProp = RouteProp<
  ProfileStackNavigatorParamList,
  "ProfileDetails"
>
const Stack = createStackNavigator<ProfileStackNavigatorParamList>()
export const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
      initialRouteName="Profile"
    >
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetailsScreen} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="ChangeVehicleScreen" component={ChangeVehicleTypeScreen} />
      <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
    </Stack.Navigator>
  )
}
