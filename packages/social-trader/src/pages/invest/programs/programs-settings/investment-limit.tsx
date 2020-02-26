import InvestmentLimitField from "components/assets/fields/investment-limit-field";
import SettingsBlock from "components/settings-block/settings-block";
import { SubmitButton } from "components/submit-button/submit-button";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { CurrencyEnum } from "utils/types";
import { number, object } from "yup";

enum FIELDS {
  hasInvestmentLimit = "hasInvestmentLimit",
  investmentLimit = "investmentLimit"
}

const _InvestmentLimit: React.FC<Props> = ({
  editError,
  onSubmit,
  investmentLimit,
  currency
}) => {
  const [t] = useTranslation();

  const [hasInvestmentLimit, setHasInvestmentLimit] = useState(
    investmentLimit !== null
  );

  const form = useForm<InvesmentLimitFormValues>({
    defaultValues: {
      [FIELDS.investmentLimit]: investmentLimit
    },
    validationSchema: object().shape({
      [FIELDS.investmentLimit]: hasInvestmentLimit
        ? number()
            .min(
              0,
              t("create-program-page.settings.validation.investment-limit-min")
            )
            .lessThan(
              10000000000,
              "Investment Limit must be less than 10000000000"
            )
            .required(
              t(
                "create-program-page.settings.validation.investment-limit-required"
              )
            )
        : number()
    }),
    mode: "onChange"
  });

  const { setValue } = form;

  useEffect(() => {
    if (!hasInvestmentLimit) setValue(FIELDS.investmentLimit, undefined, true);
    else setValue(FIELDS.investmentLimit, investmentLimit, true);
  }, [hasInvestmentLimit]);

  const handleSubmit = useCallback(
    (values: InvesmentLimitFormValues) =>
      onSubmit({ ...values, hasInvestmentLimit }),
    [onSubmit, hasInvestmentLimit]
  );

  return (
    <SettingsBlock
      label={t("create-program-page.settings.fields.investment-limit")}
    >
      <HookForm resetOnSuccess form={form} onSubmit={handleSubmit}>
        <InvestmentLimitField
          setHasInvestmentLimit={setHasInvestmentLimit}
          checkboxName={"hasInvestmentLimit"}
          inputName={FIELDS.investmentLimit}
          hasInvestmentLimit={hasInvestmentLimit}
          currency={currency}
        />
        <SubmitButton
          className="invest-form__submit-button"
          isSuccessful={!editError}
        >
          {t("program-settings.buttons.save")}
        </SubmitButton>
      </HookForm>
    </SettingsBlock>
  );
};

export interface InvesmentLimitFormValues {
  [FIELDS.hasInvestmentLimit]: boolean;
  [FIELDS.investmentLimit]?: number;
}

interface Props {
  editError?: boolean;
  currency: CurrencyEnum;
  investmentLimit: number;
  onSubmit: (values: InvesmentLimitFormValues) => void;
}

const InvestmentLimit = _InvestmentLimit;
export default InvestmentLimit;
