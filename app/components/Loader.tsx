import React, { useMemo } from "react"
import { View, ActivityIndicator, ActivityIndicatorProps, ViewStyle } from "react-native"
import { colors } from "@theme"

interface ILoader extends ActivityIndicatorProps {
  containerStyle?: ViewStyle | ViewStyle[]
  isPageLoading?: boolean
  variant?: "screenContent"
}
export function Loader({ size, containerStyle, isPageLoading = false, variant, ...rest }: ILoader) {
  const customStyleContainer: ViewStyle | ViewStyle[] | undefined = useMemo(() => {
    if (variant === "screenContent") {
      return {
        backgroundColor: colors.palette.neutral900 + 40,
        justifyContent: "center",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1,
      }
    } else {
      return containerStyle
    }
  }, [variant])
  return (
    <View
      style={
        isPageLoading
          ? {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.palette.neutral100,
            }
          : customStyleContainer
      }
    >
      <ActivityIndicator color={colors.primary} size={size || "large"} {...rest} />
    </View>
  )
}
