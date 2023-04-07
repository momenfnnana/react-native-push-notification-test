import * as React from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { spacing } from "../theme"

export interface ProfileContainerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  children?: JSX.Element
  header?: JSX.Element
}

/**
 * Describe your component here
 */
export const ProfileContainer = observer(function ProfileContainer(props: ProfileContainerProps) {
  const { style, children, header } = props

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>{header}</View>
      {children}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  header: {
    paddingHorizontal: spacing.medium + 4,
    bottom: -spacing.medium,
    zIndex: spacing.extraSmall,
  },
})
