import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {  OrderDetailsScreen } from "../screens"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

export type OrderNavigatorParamList = {
  Order: undefined
  OrderDetails: undefined
}
export type OrderScreenNavigationProp = NativeStackNavigationProp<OrderNavigatorParamList, "Order">

const Stack = createStackNavigator<OrderNavigatorParamList>()
export const OrderNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      {/* <Stack.Screen name="Order" component={OrderScreen} /> */}
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </Stack.Navigator>
  )
}
