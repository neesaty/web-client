import "./advantages-list.scss";

import classNames from "classnames";
import { TAdvantages } from "pages/landing-page/static-data/advantages";
import React from "react";

import AdvantageItem from "./advantage-item";

interface Props {
  className?: string;
  advantagesItems: TAdvantages[];
  lastItem?: JSX.Element;
}

const _AdvantagesList: React.FC<Props> = ({
  className,
  advantagesItems,
  lastItem
}) => (
  <ul className={classNames("advantages-list", className)}>
    {advantagesItems.map((item, index) => (
      <AdvantageItem
        key={index}
        title={item.title}
        text={item.text}
        image={item.image}
      />
    ))}
    {lastItem && (
      <li className="advantages-list__item advantages-list__item--last">
        {lastItem}
      </li>
    )}
  </ul>
);

const AdvantagesList = _AdvantagesList;
export default AdvantagesList;
