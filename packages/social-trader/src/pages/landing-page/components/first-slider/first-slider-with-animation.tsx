import "./first-slider.scss";

import {
  SliderControls,
  SliderControlsWrapper,
  SliderImg,
  SliderImgWrapper,
  SliderInfo,
  SliderInfoWrapper,
  SliderMainWrapper,
  SliderText,
  SliderTitle
} from "pages/landing-page/components/first-slider/slider.blocks";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import { TSlide } from "pages/landing-page/static-data/slides";
import React, { useCallback, useState } from "react";
import { animated, useTransition } from "react-spring";

interface Props {
  className?: string;
  slidesItems: TSlide[];
}

const _FirstSliderWithAnimation: React.FC<Props> = ({
  className,
  slidesItems
}) => {
  const [index, setIndex] = useState(0);
  const transitions = useTransition(slidesItems[index], item => item.id, {
    initial: {
      opacity: 1,
      position: "static",
      transform: "translate3d(0,0px,0)"
    },
    from: {
      opacity: 0,
      position: "absolute",
      transform: "translate3d(0,20px,0)"
    },
    enter: {
      opacity: 1,
      position: "static",
      transform: "translate3d(0,0px,0)"
    },
    leave: {
      opacity: 0,
      position: "absolute",
      transform: "translate3d(0,20px,0)"
    }
  });
  const countsSlides = slidesItems.length;
  const onClickLeft = useCallback(
    () => setIndex(state => (state === 0 ? countsSlides - 1 : state - 1)),
    []
  );
  const onClickRight = useCallback(
    () => setIndex(state => (state + 1) % countsSlides),
    []
  );
  return (
    <SliderMainWrapper className={className}>
      <SliderImgWrapper>
        {transitions.map(({ item, props: { transform, ...rest }, key }) => (
          <animated.div
            key={key}
            className="slider__img-animate"
            style={rest as any}
          >
            <SliderImg item={item} />
          </animated.div>
        ))}
      </SliderImgWrapper>
      <SliderInfoWrapper>
        <SliderInfo>
          {transitions.map(({ item, props: { transform, ...rest }, key }) => (
            <animated.div
              className="slider__info-animate"
              key={key}
              style={rest as any}
            >
              <animated.div style={{ transform }}>
                <SliderTitle>{item.title}</SliderTitle>
              </animated.div>
              <animated.div style={{ transform }}>
                <SliderText>{item.text}</SliderText>
              </animated.div>
            </animated.div>
          ))}
        </SliderInfo>
        <SliderControlsWrapper>
          {transitions.map(({ item, props: { transform, ...rest }, key }) => (
            <animated.div key={key} style={rest as any}>
              <LPButton href={item.link}>Join</LPButton>
            </animated.div>
          ))}
          <SliderControls
            onClickLeft={onClickLeft}
            onClickRight={onClickRight}
          />
        </SliderControlsWrapper>
      </SliderInfoWrapper>
    </SliderMainWrapper>
  );
};

const FirstSliderWithAnimation = _FirstSliderWithAnimation;
export default FirstSliderWithAnimation;
