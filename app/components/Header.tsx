import * as React from "react"
import {
  StyleProp,
  StyleSheet,
  Image,
  View,
  ViewStyle,
  TouchableOpacity,
  I18nManager,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "@theme"
import { Text } from "./Text"
import { TxKeyPath } from "@i18n"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { BackIcon } from "@assets"

export interface HeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title?: TxKeyPath
  dynamicTitle?: string
  rightComponent?: JSX.Element
}

/**
 * Describe your component here
 */
export const Header = observer(function Header(props: HeaderProps) {
  const { style, title, dynamicTitle, rightComponent } = props
  const { top } = useSafeAreaInsets()
  const { goBack, canGoBack } = useNavigation()

  return (
    <View style={[styles.container, { paddingTop: top }, style]}>
      {canGoBack && (
        <TouchableOpacity onPress={goBack} style={styles.backIcon}>
          <BackIcon transform={[I18nManager.isRTL && { rotate: "180deg" }]} />
        </TouchableOpacity>
      )}
      <Text tx={title} text={dynamicTitle} preset="bold" style={{ fontSize: 20 }} />
      <View style={{ position: "absolute", right: 0, top }}>{rightComponent}</View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.extraSmall + 1,
    width: "100%",
  },
  backIcon: {
    width: spacing.extraLarge + 8,
    height: spacing.extraLarge + 8,
    marginRight: spacing.extraLarge - 2,
    resizeMode: "contain",
    borderRadius: spacing.extraSmall,
    backgroundColor: colors.palette.neutral200,
    justifyContent: "center",
    alignItems: "center",
  },
})
