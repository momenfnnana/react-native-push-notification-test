import * as React from "react"
import Svg, { Circle, Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const StatusCardIcon = (props: SvgProps) => (
  <Svg data-name="Group 68656" xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
    <Circle data-name="Ellipse 530" cx={20} cy={20} r={20} fill="#ffbc58" />
    <Path
      data-name="Path 39398"
      d="m12.096 19.584 15.807-7.488-7.488 15.807-1.663-6.656Z"
      fill="none"
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
)

export default StatusCardIcon
