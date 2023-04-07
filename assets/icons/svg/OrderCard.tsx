import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const OrderCardIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
    <G data-name="Group 68665">
      <Circle data-name="Ellipse 530" cx={20} cy={20} r={20} fill="#13c9ca" />
      <G
        data-name="Group 68614"
        fill="none"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <Path
          data-name="Path 39396"
          d="M12.308 23.246v-6.837a1.709 1.709 0 0 1 .855-1.479l5.983-3.419a1.709 1.709 0 0 1 1.709 0l5.983 3.419a1.709 1.709 0 0 1 .855 1.479v6.838a1.709 1.709 0 0 1-.855 1.479l-5.983 3.419a1.709 1.709 0 0 1-1.709 0l-5.983-3.42a1.709 1.709 0 0 1-.855-1.479Z"
        />
        <Path data-name="Path 39397" d="M27.462 15.52 20 19.836l-7.461-4.316" />
        <Path data-name="Line 207" d="M20 28.442v-8.615" />
      </G>
    </G>
  </Svg>
)

export default OrderCardIcon
