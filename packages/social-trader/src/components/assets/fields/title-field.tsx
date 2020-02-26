import AssetFormField from "components/assets/asset-fields/asset-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import * as React from "react";
import { useTranslation } from "react-i18next";

import AssetField from "../asset-fields/asset-field";

const _TitleField: React.FC<Props> = ({ name }) => {
  const { t } = useTranslation();
  return (
    <AssetField>
      <AssetFormField
        wide
        type="text"
        name={name}
        label={t("create-program-page.settings.fields.name")}
        component={SimpleTextField}
        caption={t("create-program-page.settings.fields.name-requirements")}
      />
    </AssetField>
  );
};

interface Props {
  name: string;
}

const TitleField = _TitleField;
export default TitleField;
