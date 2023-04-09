import * as React from "react"
import {
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  ButtonProps,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "@theme"
import { Button } from "./Button"
import { Header } from "./Header"
import { TxKeyPath } from "@i18n"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"

export interface ScreenContainerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  header?: JSX.Element
  children?: JSX.Element | JSX.Element[]
  withSubmit?: boolean
  title: TxKeyPath
  onSubmit?: ButtonProps["onPress"]
  submiteTx?: TxKeyPath
  withScroll?: boolean
  rightComponent?: JSX.Element
  isSubmitLoading?: boolean
  withDismissKeyboard?: boolean
}
const KeyboardDismissView = ({ children }) => (
  <TouchableWithoutFeedback containerStyle={{ flex: 1 }} onPress={Keyboard.dismiss}>
    {children}
  </TouchableWithoutFeedback>
)
export const ScreenContainer = observer(function ScreenContainer(props: ScreenContainerProps) {
  const {
    style,
    children,
    title,
    withSubmit = true,
    onSubmit,
    withScroll,
    submiteTx,
    rightComponent,
    isSubmitLoading,
    withDismissKeyboard = true,
  } = props

  if (withScroll) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.palette.neutral100 }}>
        <View style={styles.header}>
          <Header title={title} rightComponent={rightComponent} />
        </View>
        <ScrollView
          style={[
            styles.container,
            style,
            { flex: undefined, backgroundColor: colors.palette.neutral200, overflow: "hidden" },
            styles.content,
          ]}
        >
          {children}
        </ScrollView>
        {withSubmit && (
          <View style={styles.buttonContainer}>
            <Button
              preset="filled"
              tx={submiteTx ? submiteTx : "common.submit"}
              isLoading={isSubmitLoading}
              onPress={onSubmit && onSubmit}
            />
          </View>
        )}
      </View>
    )
  }

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Header title={title} rightComponent={rightComponent} />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        {withDismissKeyboard ? <KeyboardDismissView children={children} /> : children}
      </KeyboardAvoidingView>
      {withSubmit && (
        <View style={styles.buttonContainer}>
          <Button
            preset="filled"
            tx={submiteTx ? submiteTx : "common.submit"}
            isLoading={isSubmitLoading}
            onPress={onSubmit && onSubmit}
          />
        </View>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.palette.neutral100,
  },
  header: {
    paddingHorizontal: spacing.medium + 4,
    marginBottom: spacing.medium + 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.palette.neutral200,
    borderTopRightRadius: spacing.extraLarge,
    borderTopLeftRadius: spacing.extraLarge,
    paddingHorizontal: spacing.medium + 4,
    paddingTop: spacing.large - 3,
  },
  buttonContainer: {
    backgroundColor: colors.palette.neutral100,
    paddingHorizontal: spacing.medium + 4,
    marginBottom: spacing.medium + 1,
    paddingTop: spacing.medium + 2,
  },
})
