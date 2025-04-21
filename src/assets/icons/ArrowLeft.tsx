import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const ArrowLeft: FC<SvgProps> = props => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.94937 12.8159C4.94937 13.3682 5.39982 13.8159 5.95549 13.8159H19.9555C20.5112 13.8159 20.9616 13.3682 20.9616 12.8159C20.9616 12.2636 20.5112 11.8159 19.9555 11.8159H5.95549C5.39982 11.8159 4.94937 12.2636 4.94937 12.8159Z"
        fill={props.fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.6645 20.5252C14.0586 20.1358 14.0605 19.5027 13.6688 19.111L7.37377 12.8159L13.6688 6.52087C14.0605 6.12915 14.0586 5.49599 13.6645 5.10666C13.2704 4.71733 12.6333 4.71926 12.2416 5.11097L5.24163 12.111C4.8516 12.501 4.8516 13.1308 5.24163 13.5209L12.2416 20.5209C12.6333 20.9126 13.2704 20.9145 13.6645 20.5252Z"
        fill={props.fill}
      />
    </Svg>
  );
};

export default ArrowLeft;
