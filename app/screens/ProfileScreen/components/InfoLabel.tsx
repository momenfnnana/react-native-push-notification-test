import { StyleSheet, View } from "react-native"
import React from "react"
import { Devider, Text } from "@components"
import { TxKeyPath } from "i18n"
import { spacing } from "theme"

interface IInfoLabel {
  label?:
    | "name"
    | "email"
    | "location"
    | "mobile"
    | "orders"
    | "total-orders"
    | "balance"
    | "last-charge-status"
    | "vehicleType"
    | "modalHeading"
  value: string
  withDevider?: boolean
  customValue?: JSX.Element
}

export const InfoLabel = ({ label, value, withDevider = true, customValue }: IInfoLabel) => {
  const tx: TxKeyPath = `profileScreen.${label}`

  return (
    <>
      <View style={styles.container}>
        <Text tx={tx} preset="formHelper" size="sm" />
        {customValue ? customValue : <Text text={value} preset="formHelper" size="sm" />}
      </View>
      {withDevider && <Devider />}
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.small + 2,
  },
})
