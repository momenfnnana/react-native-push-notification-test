import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  HomeScreen,
  DriverReachRestaurantScreen,
  OrderDetailsScreen,
  StartTripScreen,
  DriverReachCustomerScreen,
  EndTripScreen,
  MapScreen,
} from "@screens"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { OrderDetails } from "@services"
import { RouteProp } from "@react-navigation/native"

export type HomeStackNavigatorParamList = {
  Home: undefined
  OrderDetails: OrderDetails
  DriverReachRestaurant: OrderDetails
  StartTrip: OrderDetails
  DriverReachCustomer: OrderDetails
  EndTrip: OrderDetails
  Map: undefined
}

const Stack = createStackNavigator<HomeStackNavigatorParamList>()
export type HomeScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "Home"
>
export type DriverReachRestaurantScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "DriverReachRestaurant"
>
export type StartTripScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "StartTrip"
>
export type DriverReachCustomerScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "DriverReachCustomer"
>
export type EndTripScreenNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  "EndTrip"
>
export type OrderDetailsScreenRouteProp = RouteProp<HomeStackNavigatorParamList, "OrderDetails">
export type DriverReachRestaurantScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  "DriverReachRestaurant"
>
export type StartTripScreenRouteProp = RouteProp<HomeStackNavigatorParamList, "StartTrip">
export type DriverReachCustomerScreenRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  "DriverReachCustomer"
>
export type EndTripScreenRouteProp = RouteProp<HomeStackNavigatorParamList, "EndTrip">

export const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
      <Stack.Screen name="DriverReachRestaurant" component={DriverReachRestaurantScreen} />
      <Stack.Screen name="StartTrip" component={StartTripScreen} />
      <Stack.Screen name="DriverReachCustomer" component={DriverReachCustomerScreen} />
      <Stack.Screen name="EndTrip" component={EndTripScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  )
}
