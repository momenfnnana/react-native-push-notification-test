import { View, StyleSheet, ViewStyle } from "react-native"
import React from "react"
import { InfoLabel } from "./InfoLabel"
import { colors, spacing } from "@theme"
import { Text } from "@components"

interface IInfoSection {
  children?: JSX.Element | JSX.Element[]
  rightIcon?: JSX.Element | JSX.Element[]
  data?: {
    name?: string
    email?: string
    location?: string
    mobile?: string
    orders?: string
    "total-orders"?: string
    balance?: string
    vehicleType?: string
    modalHeading?: string
  }
  containerStyle?: ViewStyle
}

export const InfoSection = ({ children, data, containerStyle, rightIcon }: IInfoSection) => {
  const extraStyle: ViewStyle = rightIcon
    ? { flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }
    : {}
  if (children)
    return (
      <View style={[styles.container, containerStyle, extraStyle]}>
        {rightIcon}
        {children}
      </View>
    )
  const {
    name,
    email,
    location,
    mobile,
    orders,
    "total-orders": totalOrders,
    balance,
    vehicleType,
    modalHeading,
  } = data
  return (
    <View style={[styles.container, containerStyle]}>
      {name ? <InfoLabel label={"name"} value={name} /> : null}
      {email ? <InfoLabel label={"email"} value={email} /> : null}
      {location ? <InfoLabel label={"location"} value={location} /> : null}
      {mobile ? <InfoLabel label={"mobile"} value={mobile} /> : null}
      {orders ? <InfoLabel label={"orders"} value={orders} /> : null}
      {totalOrders ? <InfoLabel label={"total-orders"} value={totalOrders} /> : null}
      {balance ? (
        <InfoLabel
          label={"balance"}
          value={balance}
          customValue={
            <View style={styles.balanceValueContainer}>
              <Text text={balance} style={styles.balanceValue} preset="bold" size="xxs" />
            </View>
          }
        />
      ) : null}
      {vehicleType ? <InfoLabel label={"vehicleType"} value={vehicleType} withDevider={false} /> : null}
      {modalHeading ? (
        <InfoLabel label={"modalHeading"} value={modalHeading} withDevider={false} />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingHorizontal: spacing.medium + 4,
    borderRadius: spacing.small + 2,
    marginBottom: spacing.medium + 4,
  },
  balanceValueContainer: {
    backgroundColor: colors.palette.pink,
    width: 93,
    height: 34,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  balanceValue: {
    color: colors.primary,
  },
})
