import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const SearchIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={17.448} height={17.829} {...props}>
    <G
      data-name="Search"
      fill="none"
      stroke="#323232"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      transform="translate(.75 .75)"
    >
      <Circle cx={7.49} cy={7.49} r={7.49} />
      <Path d="m12.7 13.089 2.937 2.929" />
    </G>
  </Svg>
)

export default SearchIcon
