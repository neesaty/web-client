import "./asset-block.scss";

import classNames from "classnames";
import DetailsBlock, {
  DETAILS_BLOCK_TYPE
} from "components/details/details-block";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import Link, { ToType } from "components/link/link";
import { MutedText } from "components/muted-text/muted-text";
import DashboardHorizontalWindowList from "pages/dashboard/components/dashboard-block/dashboard-horizontal-window-list";
import { InvestAssetType } from "pages/invest/invest.types";
import React from "react";
import { useTranslation } from "react-i18next";
import { ListChildComponentProps } from "react-window";

const ASSET_WIDTH = 312;
const ASSET_HEIGHT = 390;
const OFFSET_WIDTH = 20;
const CELL_WIDTH = ASSET_WIDTH + OFFSET_WIDTH;
const CONTAINER_WIDTH = Math.round(CELL_WIDTH * 2.6);

export const AssetBlock: React.FC<Props> = ({
  buttonLabel,
  blockType,
  left,
  side,
  investLink,
  assets,
  renderCard,
  description,
  title
}) => {
  const [t] = useTranslation();
  return (
    <DetailsBlock
      wide
      type={blockType}
      className={classNames("asset-block", {
        "asset-block--left": left,
        "asset-block--side": side
      })}
    >
      <div
        className={classNames("asset-block__description-block", {
          "asset-block__description-block--side": side
        })}
      >
        <h2 className="asset-block__title">{title}</h2>
        <div
          className={classNames("asset-block__description", {
            "asset-block__description--side": side
          })}
        >
          <MutedText>{description}</MutedText>
        </div>
        <Link to={investLink}>
          <GVButton size={GV_BTN_SIZE.LARGE} color="primary">
            {buttonLabel || t("invest.invest-button")}
          </GVButton>
        </Link>
      </div>
      <div className="asset-block__assets-block">
        <DashboardHorizontalWindowList
          darkShadow={blockType === DETAILS_BLOCK_TYPE.TRANSPARENT}
          items={assets}
          height={ASSET_HEIGHT}
          itemWidth={CELL_WIDTH}
          width={CONTAINER_WIDTH}
          renderItem={renderCard}
        />
      </div>
    </DetailsBlock>
  );
};

interface Props {
  buttonLabel?: string;
  blockType?: DETAILS_BLOCK_TYPE;
  left?: boolean;
  side?: boolean;
  investLink: ToType;
  title: string;
  description: string;
  renderCard: React.FC<ListChildComponentProps>;
  assets: InvestAssetType[];
}
