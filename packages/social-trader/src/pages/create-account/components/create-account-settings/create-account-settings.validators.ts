import { Broker } from "gv-api-web";
import { TFunction } from "i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { lazy, mixed, number, object } from "yup";

import {
  CREATE_ACCOUNT_FIELDS,
  ICreateAccountSettingsFormValues
} from "./create-account-settings";

const createAccountSettingsValidationSchema = ({
  rate,
  available,
  broker,
  t
}: {
  rate: number;
  available: number;
  t: TFunction;
  broker: Broker;
}) => {
  return lazy<ICreateAccountSettingsFormValues>(values => {
    const currency = values[CREATE_ACCOUNT_FIELDS.currency];
    const accountType = safeGetElemFromArray(
      broker.accountTypes,
      ({ id }) => values[CREATE_ACCOUNT_FIELDS.brokerAccountTypeId] === id
    );
    const minimumDepositAmount = accountType.minimumDepositsAmount[currency];
    const minDeposit = convertToCurrency(minimumDepositAmount, rate);
    const minDepositText = parseFloat(
      formatCurrencyValue(minDeposit, currency)
    );
    return object<ICreateAccountSettingsFormValues>().shape({
      [CREATE_ACCOUNT_FIELDS.depositAmount]: accountType.isDepositRequired
        ? number()
            .required(
              t("create-program-page.settings.validation.amount-required")
            )
            .min(
              minDeposit,
              t("create-program-page.settings.validation.amount-is-zero", {
                min: minDepositText
              })
            )
            .max(
              available,
              t("create-program-page.settings.validation.amount-is-large")
            )
        : mixed()
    });
  });
};

export default createAccountSettingsValidationSchema;
