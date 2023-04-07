import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const HomeIcon = (props: SvgProps) => {
  const color = props.color || "#4b5fd4"
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
      <Path d="M0 0h24v24H0Z" fill="none" />
      <Path
        data-name="Vector"
        d="m19 8.71-5.333-4.148a2.666 2.666 0 0 0-3.274 0L5.059 8.71a2.665 2.665 0 0 0-1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.2A2.666 2.666 0 0 0 19 8.71Z"
        fill="rgba(255,255,255,0)"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
      <Path
        data-name="Vector"
        d="M16 15a8.5 8.5 0 0 1-8 0"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </Svg>
  )
}

export default HomeIcon
