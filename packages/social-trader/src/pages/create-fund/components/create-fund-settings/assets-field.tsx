import { GVHookFormField } from "components/gv-hook-form-field";
import { MutedText } from "components/muted-text/muted-text";
import { Row } from "components/row/row";
import { ReallocateFieldWrapper } from "pages/invest/funds/fund-settings/reallocation/components/reallocate-field-wrapper";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { fundAssetsSelector } from "reducers/platform-reducer";

const _AssetsField: React.FC<{ name: string }> = ({ name }) => {
  const [t] = useTranslation();
  const assets = useSelector(fundAssetsSelector);
  return (
    <>
      <MutedText small>
        {t("create-fund-page.settings.fields.mandatory-assets")}
      </MutedText>
      <Row onlyOffset wide>
        <GVHookFormField
          name={name}
          component={ReallocateFieldWrapper}
          assets={assets}
        />
      </Row>
    </>
  );
};
export const AssetsField = React.memo(_AssetsField);
