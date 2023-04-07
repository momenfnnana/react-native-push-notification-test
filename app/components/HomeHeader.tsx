import * as React from "react"
import {
  I18nManager,
  Image,
  ImageStyle,
  Pressable,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "@theme"
import { Text } from "./Text"
import { useSafeAreaInsetsStyle } from "@utils"
import { BackIcon, QRIcon } from "@assets"
import { TxKeyPath } from "@i18n"
import { useNavigation } from "@react-navigation/native"
import { HomeScreenNavigationProp } from "@navigators"
import { profileImage } from "@assets"

export interface HomeHeaderProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title: TxKeyPath
  balance?: number
  hideBackIcon?: boolean
  RightComponent?: React.ReactElement[] | React.ReactElement
}

export const HomeHeader = observer(function HomeHeader(props: HomeHeaderProps) {
  const { style, title, balance, hideBackIcon, RightComponent } = props
  const $containerInsets = useSafeAreaInsetsStyle(["top"])
  const $styles = [$container, $containerInsets, style]
  const { navigate, goBack, canGoBack } = useNavigation<HomeScreenNavigationProp>()
  return (
    <View style={$styles}>
      <View style={$row}>
        {canGoBack() && !hideBackIcon && (
          <TouchableOpacity onPress={goBack} style={$backIcon}>
            <BackIcon transform={[I18nManager.isRTL && { rotate: "180deg" }]} />
          </TouchableOpacity>
        )}
        <Text style={$text} tx={title} />
      </View>
      {RightComponent ? (
        RightComponent
      ) : (
        <View style={[$accountContainer, { opacity: balance ? 1 : 0 }]}>
          <Text style={$accountText} text={balance + " NIS"} />
        </View>
      )}
    </View>
  )
})

const $container: ViewStyle = {
  paddingHorizontal: spacing.medium,
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 20,
}

const $accountContainer: ViewStyle = {
  padding: spacing.extraSmall,
  backgroundColor: colors.palette.angry300,
  borderRadius: spacing.extraSmall,
}

const $row: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}

const $backIcon: ViewStyle = {
  width: spacing.extraLarge + 8,
  height: spacing.extraLarge + 8,
  marginRight: spacing.small,
  borderRadius: spacing.extraSmall,
  backgroundColor: colors.palette.neutral200,
  justifyContent: "center",
  alignItems: "center",
}
const $text: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 24,
}

const $accountText: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
  marginBottom: -3,
  color: colors.primary,
}
