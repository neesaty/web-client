import SliderPlugin, {
  Range as RangePlugin,
  RangeProps,
  SliderProps
} from "rc-slider";
import React from "react";

interface IRangeProps extends RangeProps {}

const _Range: React.FC<IRangeProps> = props => {
  return (
    <div className={"range"}>
      <RangePlugin {...props} />
    </div>
  );
};

export const Range = React.memo(_Range);

interface ISliderProps extends SliderProps {}

const _Slider: React.FC<ISliderProps> = props => {
  return (
    <div className={"range"}>
      <SliderPlugin {...props} />
    </div>
  );
};

export const Slider = React.memo(_Slider);
