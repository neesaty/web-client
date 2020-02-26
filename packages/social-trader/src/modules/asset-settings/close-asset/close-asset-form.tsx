import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import { DialogTop } from "components/dialog/dialog-top";
import GVButton from "components/gv-button";
import { GVHookFormField } from "components/gv-hook-form-field";
import GVTextField from "components/gv-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import { CloseableAssetType } from "modules/asset-settings/close-asset/close-asset";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { twoFactorValidator } from "utils/validators/validators";
import { object } from "yup";

enum FIELDS {
  twoFactorCode = "twoFactorCode"
}

const _CloseAssetForm: React.FC<Props> = ({
  errorMessage,
  asset,
  onCancel,
  twoFactorEnabled,
  onSubmit,
  assetName
}) => {
  const [t] = useTranslation();
  const form = useForm<ICloseAssetFormValues>({
    defaultValues: {
      [FIELDS.twoFactorCode]: ""
    },
    validationSchema: object().shape({
      [FIELDS.twoFactorCode]: twoFactorValidator(t, twoFactorEnabled)
    })
  });
  const {
    formState: { isSubmitting }
  } = form;

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <DialogTop
        title={t(
          `asset-settings.period-and-closing.close-confirm-title-${asset.toLowerCase()}`
        )}
        subtitle={assetName}
      />
      <DialogBottom>
        <DialogField>
          {t(
            `asset-settings.period-and-closing.close-confirm-notification-${asset.toLowerCase()}`
          )}
        </DialogField>
        {twoFactorEnabled && (
          <DialogField>
            <GVHookFormField
              wide
              type="tel"
              name={FIELDS.twoFactorCode}
              label={t("wallet-withdraw.two-factor-code-label")}
              autoComplete="off"
              component={GVTextField}
            />
          </DialogField>
        )}
        <DialogButtons>
          <SubmitButton isSuccessful={!errorMessage}>
            {t("buttons.confirm")}
          </SubmitButton>
          <GVButton
            color="secondary"
            variant="outlined"
            disabled={isSubmitting}
            onClick={onCancel}
          >
            {t("buttons.cancel")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </HookForm>
  );
};

interface Props {
  errorMessage?: string;
  assetName?: string;
  asset: CloseableAssetType;
  onCancel: () => void;
  twoFactorEnabled: boolean;
  onSubmit: (values: ICloseAssetFormValues) => void;
}

export interface ICloseAssetFormValues {
  [FIELDS.twoFactorCode]: string;
}

const CloseAssetForm = _CloseAssetForm;
export default CloseAssetForm;
