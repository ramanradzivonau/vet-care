import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

export const CalendarIcon: FC<SvgProps> = props => {
  return (
    <Svg width="30" height="30" viewBox="0 0 30 30" fill={props.fill}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.2978 4.47412H9.7137C6.04284 4.47412 3.75 6.51904 3.75 10.2779V21.59C3.75 25.4079 6.04284 27.5001 9.7137 27.5001H20.2863C23.9687 27.5001 26.25 25.4434 26.25 21.6845V10.2779C26.2615 6.51904 23.9803 4.47412 20.2978 4.47412Z"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3.86578 11.7554H26.1457"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.5526 16.6372H20.5642H20.5526ZM15.0058 16.6372H15.0173H15.0058ZM9.44736 16.6372H9.45894H9.44736ZM20.5526 21.4954H20.5642H20.5526ZM15.0058 21.4954H15.0173H15.0058ZM9.44736 21.4954H9.45894Z"
      />
      <Path
        d="M9.44736 21.4954H9.45894M20.5526 16.6372H20.5642H20.5526ZM15.0058 16.6372H15.0173H15.0058ZM9.44736 16.6372H9.45894H9.44736ZM20.5526 21.4954H20.5642H20.5526ZM15.0058 21.4954H15.0173H15.0058Z"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M20.0547 2.5V6.61347"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.95688 2.5V6.61347"
        stroke={props.stroke}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
