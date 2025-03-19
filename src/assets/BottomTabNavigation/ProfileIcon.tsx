import { FC } from "react";
import { Svg, Path, Circle, SvgProps } from "react-native-svg";

export const ProfileIcon: FC<SvgProps> = props => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill={props.fill}>
      <Path
        d="M8.65075 19.6801C10.2532 18.6283 12.4405 17.9521 14.8057 17.9521C17.1581 17.9521 19.345 18.6217 20.9504 19.6667C22.5514 20.7088 23.6114 22.1526 23.6114 23.7073C23.6114 24.4893 23.3427 25.1355 22.8603 25.6557C22.3834 26.1701 21.7079 26.5506 20.906 26.8313C19.3054 27.3914 17.1312 27.5772 14.8057 27.5772C12.4931 27.5772 10.3192 27.3982 8.71575 26.8449C7.91253 26.5678 7.23452 26.1907 6.75535 25.6788C6.27063 25.1609 6 24.5158 6 23.7331C6 22.1793 7.05261 20.7291 8.65075 19.6801Z"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="14.75"
        cy="8.75"
        r="5.75"
        stroke={props.stroke}
        strokeWidth="2"
      />
    </Svg>
  );
};
