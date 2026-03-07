import Svg, {Path} from 'react-native-svg';
import React from 'react';
import { ColorValue } from 'react-native';

export const IcTick = (props: {
  width: number;
  height: number;
  strokeColor: ColorValue;
  strokeWidth: number;
}) => (
  <Svg
    width={props.width}
    height={props.height}
    viewBox="0 0 22 16"
    fill="none"
  >
    <Path
      d="M1.8125 8.3125L7.9375 14.4375L20.1875 1.3125"
      stroke={props.strokeColor}
      strokeWidth={props.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
