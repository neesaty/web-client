import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _StopOutField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetField>
      <AssetFormField
        wide
        name={name}
        label={t("create-program-page.settings.fields.stop-out-level")}
        adornment="%"
        component={SimpleTextField}
        type="number"
        hintTooltipContent={t(
          "create-program-page.settings.hints.stop-out-level-description"
        )}
        hintContent={t("create-program-page.settings.hints.stop-out-level")}
      />
    </AssetField>
  );
};

interface Props {
  name: string;
}

const StopOutField = _StopOutField;
export default StopOutField;
