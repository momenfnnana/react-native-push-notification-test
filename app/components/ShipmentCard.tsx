import * as React from "react"
import { Pressable, StyleProp, TextStyle, useWindowDimensions, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { ContainerIcon, EnterIcon } from "@assets"

export interface ShipmentCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  containerName: string
  shipmentNo: number
  boxsNumber: number
  shipmentVolume: string
}

/**
 * Describe your component here
 */
export const ShipmentCard = observer(function ShipmentCard(props: ShipmentCardProps) {
  const { width } = useWindowDimensions()
  const { style, containerName, shipmentNo, boxsNumber, shipmentVolume } = props
  const $styles = [$container, { width: width - 32 }, style]

  return (
    <View style={$styles}>
      <View style={$header}>
        <View style={$orderTitleContainer}>
          <View style={$orderBoxContainer}>
            <ContainerIcon />
          </View>
          <Text style={$containerTitle}>{containerName}</Text>
        </View>
      </View>
      <View style={$content}>
        <View style={$column}>
          <Text style={$colTitle} tx={"common.shipmentNo"} />
          <Text style={$colValue}>{shipmentNo}</Text>
        </View>
        <View style={$column}>
          <Text style={$colTitle} tx={"common.shipmentVolume"} />
          <Text style={$colValue}>{shipmentVolume}</Text>
        </View>
      </View>
      <View style={$footer}>
        <View style={$column}>
          <Text style={$colTitle} tx={"common.boxsNumber"} />
          <Text style={$colValue}>{boxsNumber}</Text>
        </View>
        <Pressable>
          <EnterIcon />
        </Pressable>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.palette.neutral100,
  borderRadius: spacing.medium,
  marginTop: spacing.small,
  padding: spacing.small,
}

const $header: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: spacing.extraSmall,
  borderBottomWidth: 1,
  borderBottomColor: "#DBDBDB",
  marginBottom: spacing.small,
}

const $orderBoxContainer: ViewStyle = {
  padding: 10,
  backgroundColor: colors.background,
  borderRadius: spacing.small,
  marginRight: spacing.extraSmall,
}

const $orderTitleContainer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $column: ViewStyle = {
  // alignItems: "center",
  justifyContent: "center",
  flex: 1,
}

const $containerTitle: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
}

const $content: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: spacing.extraSmall,
}

const $footer: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}

const $colTitle: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
  color: "#707070",
}

const $colValue: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 15,
}
