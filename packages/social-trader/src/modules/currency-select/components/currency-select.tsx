import "./currency-select.scss";

import classNames from "classnames";
import Select, { ISelectChangeEvent } from "components/select/select";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

const _CurrencySelect: React.FC<Props> = ({
  value,
  onChange,
  className,
  currencyValues
}) => (
  <Select
    data-test-id={value}
    name="currency"
    className={classNames("currency-select", className)}
    value={value}
    onChange={onChange}
  >
    {currencyValues.map(currency => (
      <option value={currency} key={currency}>
        {currency}
      </option>
    ))}
  </Select>
);

interface Props {
  value: CurrencyEnum | string;
  onChange: (event: ISelectChangeEvent, child: JSX.Element) => void;
  currencyValues: CurrencyEnum[];
  className?: string;
}

const CurrencySelect = withLoader(_CurrencySelect);
export default CurrencySelect;
