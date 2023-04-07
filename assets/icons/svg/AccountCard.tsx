import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const AccountCardIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
    <G data-name="Group 68664">
      <Circle data-name="Ellipse 530" cx={20} cy={20} r={20} fill="#679afa" />
      <Path
        data-name={12429893491582806000}
        d="M23.617 10.728a2.563 2.563 0 0 1 3.219 2.478v.77a2.563 2.563 0 0 1 2.565 2.569v10.249a2.563 2.563 0 0 1-2.563 2.563H13.164a2.563 2.563 0 0 1-2.563-2.563V16.145a2.563 2.563 0 0 1 1.907-2.476Zm-5.594 3.249 6.031-1.6a.855.855 0 0 1 1.073.826v.771Zm8.814 1.709H13.164a.854.854 0 0 0-.854.859v10.249a.854.854 0 0 0 .854.854h13.672a.854.854 0 0 0 .854-.854v-2.563h-2.563a2.563 2.563 0 1 1 0-5.127h2.564v-2.559a.855.855 0 0 0-.855-.859Zm.854 5.127h-2.564a.855.855 0 1 0 0 1.709h2.564Z"
        fill="#fff"
        fillRule="evenodd"
      />
    </G>
  </Svg>
)

export default AccountCardIcon
