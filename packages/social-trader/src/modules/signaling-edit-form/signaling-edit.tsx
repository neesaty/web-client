import SignalsFeeFormPartial from "components/assets/fields/signals-fee-form.partial";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { SubmitButton } from "components/submit-button/submit-button";
import { FollowCreateAssetPlatformInfo } from "gv-api-web";
import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

import { SignalValidationSchema } from "./program-signal.validators";

enum FORM_FIELDS {
  successFee = "successFee",
  volumeFee = "volumeFee"
}
const _SignalingEdit: React.FC<Props> = ({
  editError,
  successFee,
  volumeFee,
  followInfo,
  inDialog,
  showFields,
  onSubmit
}) => {
  const [t] = useTranslation();

  const form = useForm<IProgramSignalFormValues>({
    defaultValues: {
      [FORM_FIELDS.successFee]: successFee,
      [FORM_FIELDS.volumeFee]: volumeFee
    },
    validationSchema: SignalValidationSchema({ followInfo, t }),
    mode: "onBlur"
  });

  const renderButton = () => (
    <SubmitButton wide={inDialog} isSuccessful={!editError}>
      {t("buttons.save")}
    </SubmitButton>
  );
  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      {showFields && (
        <SignalsFeeFormPartial
          volumeFeeFieldName={FORM_FIELDS.volumeFee}
          successFeeFieldName={FORM_FIELDS.successFee}
        />
      )}

      {inDialog ? (
        <DialogButtons>{renderButton()}</DialogButtons>
      ) : (
        renderButton()
      )}
    </HookForm>
  );
};

export interface IProgramSignalFormValues {
  [FORM_FIELDS.successFee]?: number;
  [FORM_FIELDS.volumeFee]?: number;
}

interface Props {
  editError?: boolean;
  followInfo: FollowCreateAssetPlatformInfo;
  inDialog?: boolean;
  showFields: boolean;
  successFee?: number;
  volumeFee?: number;
  onSubmit: (values: IProgramSignalFormValues) => void;
}

const SignalingEdit = _SignalingEdit;
export default SignalingEdit;
