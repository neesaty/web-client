import "./fund-asset-filter.scss";

import { CurrencyItem } from "components/currency-item/currency-item";
import { PlatformAsset } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { UpdateFilterFunc } from "../../table.types";
import TileFilter from "../tile-filter";
import TileFilterItem from "../tile-filter-item";
import FundAssetPopover from "./fund-asset-popover";

const _FundAssetFilter: React.FC<Props> = ({
  name,
  values,
  value,
  onChange
}) => {
  const [t] = useTranslation();
  const selectedAssets = values
    .filter(x => value.includes(x.asset))
    .map(asset => (
      <TileFilterItem key={asset.id} id={asset.asset}>
        <CurrencyItem
          className="fund-asset-filter__asset-name"
          logo={asset.icon}
          name={asset.asset}
          small
        />
      </TileFilterItem>
    ));
  const notSelectedAssets = values.filter(x => !value.includes(x.asset));
  return (
    <TileFilter
      name={name}
      value={value}
      updateFilter={onChange}
      buttonTitle={t("filters.fund-asset.add")}
      selectedTiles={selectedAssets}
    >
      <FundAssetPopover values={notSelectedAssets} />
    </TileFilter>
  );
};

const FundAssetFilter = _FundAssetFilter;
export default FundAssetFilter;

interface Props {
  name: string;
  value: string[];
  values: PlatformAsset[];
  onChange: UpdateFilterFunc;
}
