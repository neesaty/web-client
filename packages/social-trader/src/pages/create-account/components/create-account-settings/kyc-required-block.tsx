import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { KYC_ROUTE } from "components/profile/profile.constants";
import { Row } from "components/row/row";
import SettingsBlock from "components/settings-block/settings-block";
import React from "react";
import { useTranslation } from "react-i18next";

const _KycRequiredBlock: React.FC = () => {
  const [t] = useTranslation();
  const { linkCreator } = useToLink();
  return (
    <SettingsBlock
      label={t("create-account-page.settings.kyc-required")}
      withBorder={false}
    >
      <Row>
        <FormTextField>
          {t("create-account-page.settings.kyc-required-text-1")}
        </FormTextField>
      </Row>
      <Row>
        <FormTextField>
          {t("create-account-page.settings.kyc-required-text-2")}
        </FormTextField>
      </Row>
      <Row large wide>
        <Link to={linkCreator(KYC_ROUTE)}>
          <GVButton color="primary" variant="outlined">
            {t("buttons.verify")}
          </GVButton>
        </Link>
      </Row>
    </SettingsBlock>
  );
};

export const KycRequiredBlock = React.memo(_KycRequiredBlock);
