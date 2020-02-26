import "./fund-asset.scss";

import classNames from "classnames";
import { CurrencyItem } from "components/currency-item/currency-item";
import { Currency, FundAssetInfo } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";

export enum FUND_ASSET_TYPE {
  LARGE = "large",
  MIDDLE = "middle",
  SHORT = "short",
  TEXT = "text"
}

const _FundAsset: React.FC<Props> = ({
  bottomOffset = true,
  url,
  current: percent,
  target: mandatoryFundPercent,
  currency,
  type,
  last,
  removable,
  removeHandle,
  icon,
  className,
  asset: name,
  ...other
}) => {
  const currencyName =
    type === FUND_ASSET_TYPE.LARGE
      ? name
      : type !== FUND_ASSET_TYPE.SHORT
      ? currency
      : "";
  const currencyClassName =
    type === FUND_ASSET_TYPE.LARGE
      ? "fund-asset__currency-full"
      : type !== FUND_ASSET_TYPE.SHORT
      ? "fund-asset__currency-short"
      : "";
  switch (type) {
    case FUND_ASSET_TYPE.TEXT:
      return (
        <div {...other}>
          {currency}
          {!last && <span>,&nbsp;</span>}
        </div>
      );
    default:
      return (
        <div
          {...other}
          className={classNames(
            "fund-asset",
            "fund-asset--default",
            className,
            {
              "fund-asset--bottom-offset": bottomOffset,
              "fund-asset--large": type === FUND_ASSET_TYPE.LARGE
            }
          )}
        >
          <CurrencyItem
            url={url}
            logo={icon}
            small
            name={!!currency && currencyName}
            symbol={currency}
            className={classNames("fund-asset__currency", currencyClassName)}
          />
          <div className="fund-asset__percent">
            <NumberFormat value={percent} suffix="%" displayType="text" />
          </div>
          {percent > mandatoryFundPercent && removable && removeHandle && (
            <div
              className="fund-asset__remove-button"
              onClick={removeHandle(currency)}
            >
              +
            </div>
          )}
        </div>
      );
  }
};

interface Props extends FundAssetInfo {
  bottomOffset?: boolean;
  currency: Currency;
  type: FUND_ASSET_TYPE;
  last: boolean;
  removable?: boolean;
  removeHandle?: (
    currency: Currency
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const FundAsset = _FundAsset;
export default FundAsset;
