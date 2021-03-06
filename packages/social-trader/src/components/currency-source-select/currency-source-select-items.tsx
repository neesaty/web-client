import { CurrencyItemWithAmount } from "components/currency-item/currency-item-with-amount";
import { AssetDetails } from "gv-api-web";
import React from "react";
import { CurrencyEnum } from "utils/types";

export const getCurrencySourceSelectItems = (
  items: CurrencySourceSelectItemsType
): JSX.Element[] =>
  items.map(({ logoUrl, currency, title, id, available, asset }) => {
    const name = asset
      ? asset.title
      : `${title ? `${title} | ` : ""}${currency}`;
    const logo = asset ? asset.logoUrl : logoUrl;
    return (
      <option value={id} key={id}>
        <CurrencyItemWithAmount
          available={available}
          symbol={currency}
          logo={logo}
          name={name}
          small
          clickable={false}
        />
      </option>
    );
  });

export type CurrencySourceSelectItemsType = Array<CurrencySourceSelectItemType>;
export interface CurrencySourceSelectItemType {
  asset?: AssetDetails;
  available?: number;
  id: string;
  currency: CurrencyEnum;
  logoUrl?: string;
  title?: string;
}
