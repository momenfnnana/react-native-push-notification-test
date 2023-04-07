import * as React from "react"
import {
  I18nManager,
  NativeSyntheticEvent,
  Platform,
  StyleProp,
  TextInput,
  TextInputSubmitEditingEventData,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing, typography } from "../theme"
import { Text } from "./Text"
import { translate, TxKeyPath } from "i18n"
import { SearchIcon } from "@assets"
import { useDebounce, useDebouncedCallback } from "use-debounce"

export interface SearchInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  placeholder: TxKeyPath
  onChangeText?: (text: string) => void
  value?: string
  onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void
}

/**
 * Describe your component here
 */
export const SearchInput = observer(function SearchInput(props: SearchInputProps) {
  const { style, placeholder, onChangeText, value, onSubmitEditing } = props
  const $styles = [$searchContainer, style]

  return (
    <View style={$styles}>
      <SearchIcon />
      <TextInput
        value={value}
        onEndEditing={onSubmitEditing}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeText}
        placeholder={translate(placeholder)}
        placeholderTextColor={"#32323250"}
        style={[$searchInput, I18nManager.isRTL && { textAlign: "right" }]}
      />
    </View>
  )
})

const $searchContainer: ViewStyle = {
  backgroundColor: colors.background,
  borderRadius: spacing.medium,
  paddingHorizontal: 20,
  paddingVertical: Platform.OS == "ios" ? 15 : 4,
  marginHorizontal: spacing.medium,
  flexDirection: "row",
  alignItems: "center",
  // marginBottom: spacing.large,
}

const $searchInput: TextStyle = {
  fontFamily: typography.primary.bold,
  fontSize: 15,
  flex: 1,
  lineHeight: 20,
  marginLeft: spacing.extraSmall,
}
