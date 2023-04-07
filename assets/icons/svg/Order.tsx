import * as React from "react"
import Svg, { G, Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const OrderIcon = (props: SvgProps) => {
  const color = props.color || "#4b5fd4"
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={24.316} height={18.763} {...props}>
      <G data-name={18050335951552993000}>
        <G
          data-name="Group 69110"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.2}
        >
          <Path
            data-name="Path 39418"
            d="M6.997 4.216v10.331l8.265 3.616 8.265-3.616V4.216"
            fill="rgba(0,0,0,0)"
          />
          <Path
            data-name="Path 39419"
            d="m6.997 4.216 8.265 3.616 8.265-3.616"
            fill="rgba(0,0,0,0)"
          />
          <Path data-name="Path 39420" d="m11.129 2.408 8.265 3.65v3.326" fill="rgba(0,0,0,0)" />
          <Path data-name="Path 39421" d="M6.997 4.216 15.262.6l8.265 3.616" fill="rgba(0,0,0,0)" />
          <Path data-name="Path 39422" d="m.798 10.572.049.023 4.084 1.886" fill="rgba(0,0,0,0)" />
          <Path data-name="Line 211" fill="none" d="M1.527 7.293 4.93 8.865" />
          <Path data-name="Line 212" fill="none" d="M2.208 3.992 4.93 5.249" />
          <Path data-name="Line 213" fill="none" d="M15.262 7.832v10.331" />
        </G>
      </G>
    </Svg>
  )
}

export default OrderIcon
