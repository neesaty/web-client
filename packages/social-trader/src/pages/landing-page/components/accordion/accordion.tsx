import "./accordion.scss";

import classNames from "classnames";
import { useNetworkStatusInWindow } from "hooks/network-status";
import dynamic from "next/dynamic";
import AccordionContent, {
  TAccordionContent
} from "pages/landing-page/components/accordion-content/accordion-content";
import { Arrow } from "pages/landing-page/components/common-icons/arrow";
import React, { useCallback, useState } from "react";

const AccordionContentWithAnimation = dynamic(() =>
  import(
    "pages/landing-page/components/accordion-content/accordion-content-with-animation"
  )
);

export type TAccordion = {
  id: string | number;
  title: string;
  content?: JSX.Element;
  contents?: TAccordionContent[];
};

interface Props {
  className?: string;
  accordion: TAccordion;
}

const _Accordion: React.FC<Props> = ({ accordion, className }) => {
  const { effectiveConnectionType } = useNetworkStatusInWindow();
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = useCallback(() => setIsVisible(!isVisible), [isVisible]);

  const renderAccordionContent = useCallback(() => {
    switch (effectiveConnectionType) {
      case "4g":
        return (
          <AccordionContentWithAnimation
            content={accordion.content}
            isVisible={isVisible}
          />
        );
      default:
        return (
          <AccordionContent content={accordion.content} isVisible={isVisible} />
        );
    }
  }, [effectiveConnectionType, isVisible]);

  return (
    <div className="accordion" id={String(accordion.id)}>
      <header className="accordion__header" onClick={handleClick}>
        <span
          className={classNames("accordion__arrow", {
            "accordion__arrow--up": isVisible
          })}
        >
          <Arrow />
        </span>
        <span className="accordion__title">{accordion.title}</span>
      </header>
      {renderAccordionContent()}
    </div>
  );
};

const Accordion = React.memo(_Accordion);
export default Accordion;
