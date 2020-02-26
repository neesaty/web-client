import { GVHookFormField } from "components/gv-hook-form-field";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

import AssetField from "../asset-fields/asset-field";

const _Currency: React.FC<Props> = ({
  name,
  disabled,
  accountCurrencies,
  hide
}) => {
  const [t] = useTranslation();
  return (
    <AssetField hide={hide}>
      <GVHookFormField
        wide
        name={name}
        component={SimpleTextField}
        label={t("create-program-page.settings.fields.currency")}
        InputComponent={Select}
        disabled={disabled}
        disableIfSingle
      >
        {accountCurrencies.map(currency => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
      </GVHookFormField>
    </AssetField>
  );
};

interface Props {
  name: string;
  hide?: boolean;
  disabled?: boolean;
  accountCurrencies: CurrencyEnum[];
}

const Currency = _Currency;
export default Currency;
