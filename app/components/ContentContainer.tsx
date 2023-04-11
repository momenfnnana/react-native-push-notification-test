import * as React from "react"
import { StyleProp, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { useSafeAreaInsets } from "react-native-safe-area-context"

export interface ContentContainerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children: React.ReactElement[] | React.ReactElement
}

/**
 * Describe your component here
 */
export const ContentContainer = observer(function ContentContainer(props: ContentContainerProps) {
  const { height, width } = useWindowDimensions()
  const { top, bottom } = useSafeAreaInsets()
  const { style, children } = props
  const $styles = [$container, { minHeight: height - (130 + top + bottom) }, style]

  return <View style={$styles}>{children}</View>
})

const $container: ViewStyle = {
  alignItems: "center",
  padding: spacing.medium,
  backgroundColor: colors.palette.neutral200,
  borderTopRightRadius: spacing.large,
  borderTopLeftRadius: spacing.large,
}
