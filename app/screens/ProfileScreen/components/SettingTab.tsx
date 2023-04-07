import {
  StyleSheet,
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  I18nManager,
} from "react-native"
import React from "react"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Devider, Text } from "@components"
import { TxKeyPath } from "@i18n"
import { spacing } from "@theme"

interface ISettingTab extends TouchableOpacityProps {
  label: TxKeyPath
  labelOption?: I18n.TranslateOptions
  behindArrow?: JSX.Element
  withDevider?: boolean
}

export const SettingTab = ({
  label,
  behindArrow,
  withDevider = true,
  labelOption,
  ...rest
}: ISettingTab) => {
  return (
    <>
      <TouchableOpacity style={styles.container} {...rest}>
        <Text tx={label} txOptions={labelOption} />
        <View style={styles.arrowContainer}>
          {behindArrow && behindArrow}
          <Ionicons
            style={[
              styles.arrowStyle,
              I18nManager.isRTL ? { transform: [{ rotateY: "180deg" }] } : {},
            ]}
            name="chevron-forward-outline"
          />
        </View>
      </TouchableOpacity>
      {withDevider && <Devider />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.medium - 1,
  },
  arrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowStyle: {
    marginLeft: spacing.small,
  },
})
