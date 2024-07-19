import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

const VerisurfIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    id="Layer_2"
    viewBox="0 0 32.25 32.25"
    {...props}
  >
    <Circle
      cx={16.12}
      cy={16.12}
      r={16}
      style={{
        stroke: "#000",
        strokeMiterlimit: 10,
        strokeWidth: ".25px",
        fill: "#b13034",
      }}
    />
    <Path
      d="m23.94 2.91-6.86 16.68-1.05-12.52a35.07 35.07 0 0 1-4.1 6.78l1.24 11.68h5.69L31.69 2.02l-7.74.89Z"
      style={{
        fill: "#fff",
      }}
    />
    <Path
      d="m23.94 2.91-6.86 16.68-1.05-12.52a35.07 35.07 0 0 1-4.1 6.78l1.24 11.68h5.69L31.69 2.02l-7.74.89Z"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={0.25}
      fill="none"
    />
    <Path
      d="m6.07 25.73 2.74.04-.9-7.04c-.84.74-1.71 1.44-2.62 2.09l.79 4.91Z"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={0.25}
    />
    <Path
      d="m6.14 25.73 2.74.04-.9-7.04c-.84.74-1.71 1.44-2.62 2.09l.79 4.91ZM8.92 17.85l.95 7.94h2.6v-.23l-.84-10.6c-.85 1.01-1.75 1.98-2.71 2.89Z"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={0.25}
    />
    <Path
      d="m5.52 25.73 2.74.04-.9-7.04c-.84.74-1.71 1.44-2.62 2.09l.79 4.91ZM8.35 17.85l.95 7.94h2.6v-.23l-.84-10.6c-.85 1.01-1.75 1.98-2.71 2.89Z"
      fill="#fff"
      stroke="#000"
      strokeMiterlimit={10}
      strokeWidth={0.25}
    />
  </Svg>
);

export default VerisurfIcon;
