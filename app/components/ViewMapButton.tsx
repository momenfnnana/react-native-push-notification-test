import * as React from "react"
import { TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import Feather from "react-native-vector-icons/Feather"
import { colors, spacing } from "@theme"
import { Text } from "./Text"

export interface ViewMapButtonProps extends TouchableOpacityProps {
  /**
   * An optional style override useful for padding & margin.
   */
}

/**
 * Describe your component here
 */
export const ViewMapButton = observer(function ViewMapButton(props: ViewMapButtonProps) {
  const { style, ...rest } = props
  return (
    <TouchableOpacity style={[$container, style]} {...rest}>
      <Text style={$accountText} tx="orderDetailsScreen.restaurantMapLocation" />
      <Feather name="map-pin" color={colors.primary} style={{ marginLeft: 10 }} />
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  padding: spacing.extraSmall,
  backgroundColor: colors.palette.angry300,
  borderRadius: spacing.extraSmall,
  flexDirection: "row",
  alignItems: "center",
}
const $accountText: TextStyle = {
  fontSize: 15,
  marginBottom: -3,
  color: colors.primary,
}
