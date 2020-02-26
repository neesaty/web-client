import { ISelectChangeEvent } from "components/select/select";
import TileFilterButton from "components/table/components/filtering/tile-filter-button";
import CurrencySelect from "modules/currency-select/components/currency-select";
import React from "react";
import { CurrencyEnum } from "utils/types";

import { TAddChartCurrency } from "./chart-currency-selector";

const _AddCurrencyButton: React.FC<Props> = ({ onAdd, currencies }) => {
  const onChange = ({ target: { value } }: ISelectChangeEvent) =>
    onAdd(value as CurrencyEnum);
  return (
    <TileFilterButton
      title={
        <CurrencySelect
          value={"ADD"}
          onChange={onChange}
          currencyValues={currencies}
        />
      }
    />
  );
};

interface Props {
  onAdd: TAddChartCurrency;
  currencies: CurrencyEnum[];
}

const AddCurrencyButton = _AddCurrencyButton;
export default AddCurrencyButton;
