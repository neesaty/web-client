import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object, ref, string } from "yup";

enum FIELDS {
  password = "password",
  confirmPassword = "confirmPassword"
}

const _RestorePassword: React.FC<Props> = ({ errorMessage, onSubmit }) => {
  const [t] = useTranslation();
  const form = useForm<IRestorePasswordFormValues>({
    defaultValues: {
      [FIELDS.password]: "",
      [FIELDS.confirmPassword]: ""
    },
    validationSchema: object().shape({
      [FIELDS.password]: string()
        .min(6, t("auth.password-restore.validators.password-weak"))
        .required(t("auth.password-restore.validators.password-required")),
      [FIELDS.confirmPassword]: string()
        .oneOf(
          [ref(FIELDS.password)],
          t("auth.password-restore.validators.password-dont-match")
        )
        .required(
          t("auth.password-restore.validators.confirm-password-required")
        )
    }),
    mode: "onChange"
  });

  return (
    <HookForm form={form} onSubmit={onSubmit}>
      <GVHookFormField
        type="password"
        name={FIELDS.password}
        label={t("auth.password-restore.new-password.password-field-text")}
        component={SimpleTextField}
      />
      <GVHookFormField
        type="password"
        name={FIELDS.confirmPassword}
        label={t(
          "auth.password-restore.new-password.password-confirm-field-text"
        )}
        component={SimpleTextField}
      />
      <FormError error={errorMessage} />
      <div className="password-restore__navigation">
        <SubmitButton id="passwordRestoreSubmit" isSuccessful={!errorMessage}>
          {t("auth.password-restore.new-password.confirm-button-text")}
        </SubmitButton>
      </div>
    </HookForm>
  );
};

interface Props {
  errorMessage?: string;
  onSubmit: (data: IRestorePasswordFormValues) => void;
}

export interface IRestorePasswordFormValues {
  password: string;
  confirmPassword: string;
}

const RestorePassword = _RestorePassword;
export default RestorePassword;
