import * as React from "react"
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface ProgressBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  value: number
}

/**
 * Describe your component here
 */
export const ProgressBar = observer(function ProgressBar(props: ProgressBarProps) {
  const { style, value } = props

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.activeBar, { width: `${value}%` }]} />
    </View>
  )
})

const barSharedStyle = {
  height: 6,
  borderRadius: 3,
} as ViewStyle
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.palette.neutral200,
    ...barSharedStyle,
  },
  activeBar: {
    backgroundColor: colors.palette.primary,
    zIndex: 10,
    ...barSharedStyle,
  },
})
