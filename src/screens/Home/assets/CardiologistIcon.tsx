import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const CardiologistIcon: FC<SvgProps> = props => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Path
        d="M2.38867 10.8571C4.10953 4.32924 11.7367 -0.276899 19.0001 8.63953C27.1972 -1.4169 35.8504 5.7271 35.9644 13.4302C35.9644 24.8981 22.2437 34.3112 19.0001 34.3112C17.0594 34.3112 11.373 30.9455 7.11424 25.7857"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M25.7857 17.6427H21.7142L17.6428 23.0713L12.2142 13.5713L8.14282 18.9999H1.52539"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default CardiologistIcon;
