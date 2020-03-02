import InfoList from "pages/landing-page/components/info-list/info-list";
import { TInfoList } from "pages/landing-page/static-data/info";
import React from "react";
import { animated, config, useTransition } from "react-spring";

interface Props {
  currentInfoList: TInfoList;
}

const _InfoListWrapperWithAnimation: React.FC<Props> = ({
  currentInfoList
}) => {
  const transitions = useTransition(currentInfoList, item => item.id, {
    from: { opacity: 0, position: "absolute" },
    enter: { opacity: 1, position: "static" },
    leave: { opacity: 0, position: "absolute" },
    config: config.slow
  });
  return (
    <>
      {transitions.map(({ item, props, key }) => (
        <animated.div
          className="info-container__tab-info info-container__tab-info--animation"
          key={key}
          style={props as any}
        >
          <InfoList id={item.id} listItems={item.listItems} />
        </animated.div>
      ))}
    </>
  );
};

const InfoListWrapperWithAnimation = React.memo(_InfoListWrapperWithAnimation);
export default InfoListWrapperWithAnimation;