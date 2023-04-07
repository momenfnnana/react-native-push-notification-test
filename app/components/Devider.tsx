import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface DeviderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Devider = observer(function Devider(props: DeviderProps) {
  const { style } = props
  return (
    <View
      style={[
        {
          height: 1,
          width: "100%",
          backgroundColor: colors.palette.neutral400 + 42,
        },
        style,
      ]}
    />
  )
})
