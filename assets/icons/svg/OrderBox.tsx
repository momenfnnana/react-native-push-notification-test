import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const OrderBoxIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={18.898} height={20.379} {...props}>
    <G data-name="box (1)">
      <Path
        data-name="Path 2216"
        d="m9.449 20.379 9.449-5.095V5.095L9.449 0 0 5.095v10.19Z"
        fill="#c7aa92"
      />
      <Path
        data-name="Path 2217"
        d="m9.449 0 9.449 5.095-9.449 5.095v10.19L0 15.285V5.095Z"
        fill="#bd9475"
      />
      <Path data-name="Path 2218" d="M9.449 0v20.379L0 15.284V5.095Z" fill="#9e7957" />
      <Path data-name="Path 2219" d="M9.449 10.19v10.189L0 15.284V5.095Z" fill="#936c4c" />
      <Path
        data-name="Path 2220"
        d="M14.814 2.893 5.365 7.988l-1.282-.691 9.449-5.095Z"
        fill="#6174e6"
      />
      <Path data-name="Path 2221" d="M9.45 4.404v1.382l-4.083 2.2-1.282-.691Z" fill="#679afa" />
    </G>
  </Svg>
)

export default OrderBoxIcon
