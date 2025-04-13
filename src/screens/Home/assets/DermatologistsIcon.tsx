import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const DermatologistsIcon: FC<SvgProps> = props => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Path
        d="M29.3906 23.4531V18.9072C29.3906 15.6793 26.7738 13.0625 23.5459 13.0625H14.4541C11.2261 13.0625 8.60938 15.6793 8.60938 18.9072V23.4531C8.60938 29.1917 13.2614 33.8438 19 33.8438C24.7386 33.8438 29.3906 29.1917 29.3906 23.4531Z"
        stroke={props.stroke}
        strokeWidth="3"
      />
      <Path
        d="M25.6797 13.8047V12.3203C25.6797 8.63122 22.6891 5.64062 19 5.64062C15.3109 5.64062 12.3203 8.63122 12.3203 12.3203V13.8047"
        stroke={props.stroke}
        strokeWidth="3"
      />
      <Path
        d="M29.3906 21.9688H33.8438"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M8.60938 21.9688H4.15625"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M22.7109 6.38281L26.4219 4.15625"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M15.2891 6.38281L11.5781 4.15625"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M31.6172 30.8752L28.6484 29.6877"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M31.6172 13.0623L28.6484 14.2498"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M6.38281 30.8752L9.35156 29.6877"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M6.38281 13.0623L9.35156 14.2498"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Path
        d="M19 33.1016V23.4531"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default DermatologistsIcon;
