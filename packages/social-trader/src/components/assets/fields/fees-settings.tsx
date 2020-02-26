import "./fields.scss";

import AssetFormField from "components/assets/asset-fields/asset-form-field";
import AssetRow from "components/assets/asset-fields/asset-row";
import { SimpleNumberField } from "components/simple-fields/simple-number-field";
import React from "react";
import { useTranslation } from "react-i18next";
import { allowPositiveValuesNumberFormat } from "utils/helpers";

import AssetField from "../asset-fields/asset-field";

const _FeesSettings: React.FC<Props> = ({
  title,
  entryFeeName,
  entryFeeDescription,
  secondFeeName,
  secondFeeLabel,
  secondFeeUnderText,
  secondFeeDescription
}) => {
  const { t } = useTranslation();
  return (
    <>
      {title && <div className="create-asset-settings__row-title">{title}</div>}
      <AssetRow>
        <AssetField>
          <AssetFormField
            wide
            name={entryFeeName}
            label={t("create-program-page.settings.fields.entry-fee")}
            adornment="%"
            component={SimpleNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={entryFeeDescription}
            hintContent={t("create-program-page.settings.hints.entry-fee")}
          />
        </AssetField>
        <AssetField>
          <AssetFormField
            wide
            name={secondFeeName}
            label={secondFeeLabel}
            adornment="%"
            component={SimpleNumberField}
            isAllowed={allowPositiveValuesNumberFormat(4)}
            hintTooltipContent={secondFeeDescription}
            hintContent={secondFeeUnderText}
          />
        </AssetField>
      </AssetRow>
    </>
  );
};

interface Props {
  entryFeeName: string;
  entryFeeDescription: string;
  secondFeeName: string;
  secondFeeLabel: string;
  secondFeeUnderText: string;
  secondFeeDescription: string;
  title?: string;
}

const FeesSettings = _FeesSettings;
export default FeesSettings;
