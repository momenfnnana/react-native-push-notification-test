import React, { useState } from "react"
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import Fontisto from "react-native-vector-icons/Fontisto"
import { TxKeyPath } from "i18n"
import { Devider } from "./Devider"

export interface RadioProps extends TouchableOpacityProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label?: string
  labelTx?: TxKeyPath
  isActive?: boolean
  withDevider?: boolean
}

/**
 * Describe your component here
 */
export const Radio = observer(function Radio(props: RadioProps) {
  const { style, label, isActive, withDevider = true, labelTx } = props

  return (
    <>
      <TouchableOpacity style={[styles.container, style]} {...props}>
        <Fontisto
          name={isActive ? "radio-btn-active" : "radio-btn-passive"}
          color={isActive ? colors.primary : colors.text}
        />
        <Text text={label} tx={labelTx} style={styles.label} />
      </TouchableOpacity>
      {withDevider && <Devider />}
    </>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.small + 1,
    backgroundColor: "white",
    borderRadius: spacing.small + 2,
    paddingHorizontal: spacing.medium + 4,
  },
  label: {
    marginLeft: spacing.extraSmall + 2,
  },
})
