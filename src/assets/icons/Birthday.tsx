import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const Birthday: FC<SvgProps> = props => {
  return (
    <Svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <Path
        d="M29.4119 30.0001V20.5883C29.4119 19.9643 29.164 19.3658 28.7227 18.9245C28.2815 18.4833 27.683 18.2354 27.059 18.2354H12.9413C12.3173 18.2354 11.7188 18.4833 11.2775 18.9245C10.8363 19.3658 10.5884 19.9643 10.5884 20.5883V30.0001"
        stroke={props.stroke || "#8D7EFB"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.5883 24.1176C10.5883 24.1176 11.1765 22.9412 12.9412 22.9412C14.7059 22.9412 15.8824 25.2941 17.6471 25.2941C19.4118 25.2941 20.5883 22.9412 22.353 22.9412C24.1177 22.9412 25.2942 25.2941 27.0589 25.2941C28.8236 25.2941 29.4118 24.1176 29.4118 24.1176M8.23535 30H31.7648M14.1177 14.7059V17.0588M20.0001 14.7059V17.0588M25.8824 14.7059V17.0588M14.1177 10H14.1295M20.0001 10H20.0118M25.8824 10H25.8942"
        stroke={props.stroke || "#8D7EFB"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Birthday;
