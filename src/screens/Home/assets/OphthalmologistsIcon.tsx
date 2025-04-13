import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const OphthalmologistsIcon: FC<SvgProps> = props => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Path
        d="M2.375 19C2.375 19 7.3625 7.125 19 7.125C30.6375 7.125 35.625 19 35.625 19C35.625 19 30.6375 30.875 19 30.875C7.3625 30.875 2.375 19 2.375 19Z"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.25 19C14.25 20.2598 14.7504 21.468 15.6412 22.3588C16.532 23.2496 17.7402 23.75 19 23.75C20.2598 23.75 21.468 23.2496 22.3588 22.3588C23.2496 21.468 23.75 20.2598 23.75 19C23.75 17.7402 23.2496 16.532 22.3588 15.6412C21.468 14.7504 20.2598 14.25 19 14.25C17.7402 14.25 16.532 14.7504 15.6412 15.6412C14.7504 16.532 14.25 17.7402 14.25 19Z"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default OphthalmologistsIcon;
