import classNames from "classnames";
import ImageBaseElement from "components/avatar/image-base.element";
import LPButton from "pages/landing-page/components/lp-button/lp-button";
import { TInfoItem } from "pages/landing-page/static-data/info";
import React from "react";

const _InfoItem: React.FC<TInfoItem> = ({ texts, image, button }) => (
  <li
    className={classNames("info-list__item", {
      "info-list__item--bg-transparent": image
    })}
  >
    {image && (
      <ImageBaseElement
        src={image}
        alt="Trade"
        className="info-list__item-image"
      />
    )}
    {texts && (
      <div className="info-list__item-text">
        {texts.map((item, index) =>
          item.bold ? (
            <b key={index}>{item.text}</b>
          ) : (
            <span key={index}>{item.text}</span>
          )
        )}
      </div>
    )}
    {button && (
      <div className="info-list__item-btn">
        <LPButton href={button.link}>{button.text}</LPButton>
      </div>
    )}
  </li>
);
const InfoItem = _InfoItem;
export default InfoItem;
