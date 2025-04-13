import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const ExotologistsIcon: FC<SvgProps> = props => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Path
        d="M26.4219 8.60938C26.4219 6.08594 24.4922 4.15625 21.9688 4.15625C19.4453 4.15625 17.5156 6.08594 17.5156 8.60938C17.5156 9.79688 17.9609 10.8359 18.7031 11.5781H17.5156C11.7266 11.5781 7.125 16.1797 7.125 21.9688C7.125 25.2344 9.79688 27.9062 13.0625 27.9062"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M26.125 6.97653C26.5703 6.53122 27.0156 6.23434 27.6094 5.93747C29.8359 5.04684 32.5078 6.0859 33.3984 8.31247C34.2891 10.539 33.25 13.2109 31.0234 14.1015L33.3984 18.2578C33.6953 18.7031 33.6953 19.2968 33.6953 19.7422C33.3984 20.9297 32.3594 21.5234 31.1719 21.375C31.1719 21.375 28.7969 20.9297 27.1641 20.4843H26.4219C23.8984 20.4843 21.9688 22.414 21.9688 24.9375"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.7812 27.9062C21.3514 27.2689 21.726 26.4809 21.8603 25.6363C21.9945 24.7918 21.8828 23.9265 21.5384 23.1437C21.194 22.361 20.6315 21.694 19.9181 21.2224C19.2048 20.7508 18.3707 20.4946 17.5156 20.4844"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.4844 33.8438H7.125C6.33764 33.8438 5.58253 33.531 5.02578 32.9742C4.46903 32.4175 4.15625 31.6624 4.15625 30.875C4.15625 30.0876 4.46903 29.3325 5.02578 28.7758C5.58253 28.219 6.33764 27.9063 7.125 27.9062H24.9375"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M24.9375 14.5469H24.9523"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default ExotologistsIcon;
