import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { SvgProps } from "./SvgProps"

const EditIcon = (props: SvgProps) => {
  const color = props.color || "#679afa"
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={14.399} height={14.399} {...props}>
      <Path
        data-name="Path 110"
        d="M7.338 2.769 2.215 8.03 0 14.4l6.369-2.077L11.492 7.2Zm6.507-.415-1.8-1.8a1.679 1.679 0 0 0-2.492 0L8.03 2.077l4.154 4.292 1.661-1.661a1.755 1.755 0 0 0 .555-1.247 1.709 1.709 0 0 0-.554-1.107Z"
        fill={color}
      />
    </Svg>
  )
}

export default EditIcon
