import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { TxKeyPath } from "@i18n"

export interface HeadingSectionProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onDetails?: (props: any) => void
  title: TxKeyPath
}

export const HeadingSection = observer(function HeadingSection(props: HeadingSectionProps) {
  const { style, onDetails, title } = props
  const $styles = [$HeadingContainer, style]

  return (
    <View style={$styles}>
      <Text style={$Heading} tx={title} />
      {onDetails && <Text onPress={onDetails} style={$details} tx="common.moreDetails" />}
    </View>
  )
})

const $HeadingContainer: ViewStyle = {
  width: "100%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.medium,
}

const $Heading: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 18,
}

const $details: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 12,
  color: "#707070",
}
