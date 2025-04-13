import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const DentistsIcon: FC<SvgProps> = props => {
  return (
    <Svg width="38" height="38" viewBox="0 0 38 38" fill="none">
      <Path
        d="M29.8692 4.24302C25.5049 2.14753 22.3951 4.72755 19.0004 4.72755C15.6057 4.72755 12.4689 2.19627 8.20606 4.24302C2.04443 7.20146 2.04443 13.3807 2.04443 16.8953C2.04443 24.1885 8.44988 34.2432 11.846 34.5618C15.2422 34.8802 15.5247 30.416 19.0004 30.416C22.4761 30.416 22.7586 34.8802 26.1548 34.5618C29.9671 34.2041 35.9565 24.1885 35.9565 16.8953C35.9565 13.3807 35.9562 7.16576 29.8692 4.24302Z"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.9287 11.0188C18.1168 12.2441 19.887 12.2119 23.0716 11.0188"
        stroke={props.stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default DentistsIcon;
