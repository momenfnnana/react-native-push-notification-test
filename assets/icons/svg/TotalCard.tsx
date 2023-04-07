import * as React from "react"
import Svg, { G, Circle, Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const TotalCardIcon = (props: SvgProps) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} {...props}>
    <G data-name="Group 69116">
      <Circle data-name="Ellipse 530" cx={20} cy={20} r={20} fill="#ff9158" />
      <Path
        data-name="Icon material-attach-money"
        d="M20.452 18.726c-2.628-.683-3.473-1.389-3.473-2.489 0-1.262 1.169-2.142 3.126-2.142 2.061 0 2.825.984 2.894 2.431h2.558a4.615 4.615 0 0 0-3.716-4.411V9.58h-3.473v2.5c-2.246.486-4.052 1.945-4.052 4.18 0 2.674 2.211 4.006 5.442 4.782 2.894.695 3.473 1.714 3.473 2.79 0 .8-.567 2.072-3.126 2.072-2.385 0-3.323-1.065-3.45-2.431h-2.548c.139 2.536 2.038 3.96 4.261 4.434v2.513h3.473v-2.489c2.258-.428 4.052-1.737 4.052-4.11 0-3.288-2.813-4.411-5.441-5.095Z"
        fill="#fff"
      />
    </G>
  </Svg>
)

export default TotalCardIcon
