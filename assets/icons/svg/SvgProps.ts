import { ColorValue, ViewProps } from "react-native"
import { GProps, NumberProp } from "react-native-svg"

export interface SvgProps extends GProps, ViewProps {
  width?: NumberProp
  height?: NumberProp
  viewBox?: string
  preserveAspectRatio?: string
  color?: ColorValue
  title?: string
  xmlns?: string
}
