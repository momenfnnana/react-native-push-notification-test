import * as React from "react"
import { StyleProp, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { OrderCardIcon, AccountCardIcon, StatusCardIcon, TotalCardIcon } from "../../assets/icons"

export interface StatisticsCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title: string
  value: string
  percentage?: number
  IconName: "order" | "account" | "total" | "status"
}

/**
 * Describe your component here
 */

export const StatisticsCard = observer(function StatisticsCard(props: StatisticsCardProps) {
  const { style, title, value, percentage, IconName } = props
  const isProgress = value.includes("%")
  const ispositive: boolean = percentage > 0 ? true : false
  const { width } = useWindowDimensions()
  const $styles = [$container, { width: width / 2 - 24 }, style]
  const CardIcons = () => {
    switch (IconName) {
      case "order":
        return <OrderCardIcon />
      case "account":
        return <AccountCardIcon />
      case "total":
        return <TotalCardIcon />
      case "status":
        return <StatusCardIcon />
    }
  }
  return (
    <View style={$styles}>
      <View style={$titleContainer}>
        <Text style={$title}>{title}</Text>
        {percentage && (
          <Text style={[$percentage, { color: ispositive ? colors.accepted : colors.rejected }]}>
            {Math.abs(percentage) + (ispositive ? "%+" : "%-")}
          </Text>
        )}
      </View>
      <View style={$valueContainer}>
        <View style={{ flex: 1, marginRight: spacing.tiny }}>
          <Text preset="default" style={$value}>
            {value}
          </Text>
          {isProgress && (
            <View
              style={{
                height: 3,
                width: "100%",
                borderRadius: 3,
                backgroundColor: "#4B5FD420",
                position: "relative",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 0,
                  height: "100%",
                  width: value,
                  backgroundColor: colors.primary,
                  borderRadius: spacing.tiny,
                }}
              />
            </View>
          )}
        </View>
        {CardIcons()}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  paddingHorizontal: spacing.small,
  paddingVertical: spacing.medium,
  borderRadius: spacing.small,
  backgroundColor: colors.palette.neutral100,
  marginBottom: spacing.medium - 1,
  marginRight: spacing.medium - 1,
}

const $titleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.tiny,
}

const $valueContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $title: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
  color: "#707070",
}

const $value: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 20,
  lineHeight: 34
}

const $percentage: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
}
