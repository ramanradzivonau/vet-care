import { FC } from "react";
import { Svg, Path, SvgProps } from "react-native-svg";

const ArrowRight: FC<SvgProps> = props => {
  return (
    <Svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.9611 12.8159C20.9611 12.2636 20.5106 11.8159 19.955 11.8159H5.95497C5.39931 11.8159 4.94886 12.2636 4.94886 12.8159C4.94886 13.3682 5.39931 13.8159 5.95497 13.8159H19.955C20.5106 13.8159 20.9611 13.3682 20.9611 12.8159Z"
        fill={props.fill}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.246 5.10666C11.8519 5.49599 11.8499 6.12915 12.2416 6.52087L18.5367 12.8159L12.2416 19.111C11.8499 19.5027 11.8519 20.1358 12.246 20.5252C12.6401 20.9145 13.2771 20.9126 13.6688 20.5209L20.6688 13.5209C21.0589 13.1308 21.0589 12.501 20.6688 12.111L13.6688 5.11097C13.2771 4.71926 12.6401 4.71733 12.246 5.10666Z"
        fill={props.fill}
      />
    </Svg>
  );
};

export default ArrowRight;
