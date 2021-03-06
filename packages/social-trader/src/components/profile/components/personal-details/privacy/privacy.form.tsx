import FormError from "components/form/form-error/form-error";
import { GVHookFormField } from "components/gv-hook-form-field";
import {
  IPrivacyData,
  PRIVACY_FORM_VALUES
} from "components/profile/components/personal-details/privacy/privacy.types";
import { Row } from "components/row/row";
import Select from "components/select/select";
import { SimpleTextField } from "components/simple-fields/simple-text-field";
import { SubmitButton } from "components/submit-button/submit-button";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";

export type IPrivacyFormValues = IPrivacyData;

interface Props {
  isPending: boolean;
  onSubmit: (values: IPrivacyFormValues) => void;
  data: IPrivacyData;
  errorMessage?: string;
}

const SELECT_VALUES = [
  {
    value: "AllUsers",
    label: "All users"
  },
  {
    value: "OnlyMe",
    label: "Only me"
  }
];

const PrivacySelect: React.FC<{
  name: string;
  title: string;
  label?: string;
}> = ({ label, name, title }) => {
  return (
    <div>
      <h5>{title}</h5>
      <GVHookFormField
        wide
        disableIfSingle
        name={name}
        component={SimpleTextField}
        label={label}
        InputComponent={Select}
      >
        {SELECT_VALUES.map(value => (
          <option value={value.value} key={value.value}>
            {value.label}
          </option>
        ))}
      </GVHookFormField>
    </div>
  );
};

const _PublicInfoForm: React.FC<Props> = ({
  data: { whoCanViewCommentsOnMyPosts, whoCanPostToMayWall },
  onSubmit,
  isPending,
  errorMessage
}) => {
  const [t] = useTranslation();
  const form = useForm<IPrivacyFormValues>({
    defaultValues: {
      [PRIVACY_FORM_VALUES.whoCanViewCommentsOnMyPosts]: whoCanViewCommentsOnMyPosts,
      [PRIVACY_FORM_VALUES.whoCanPostToMayWall]: whoCanPostToMayWall
    },
    mode: "onBlur"
  });

  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      <Row>
        <PrivacySelect
          title={t("profile-page.privacy.view")}
          name={PRIVACY_FORM_VALUES.whoCanViewCommentsOnMyPosts}
        />
      </Row>
      <Row large>
        <PrivacySelect
          title={t("profile-page.privacy.post")}
          name={PRIVACY_FORM_VALUES.whoCanPostToMayWall}
        />
      </Row>
      {errorMessage && (
        <Row>
          <FormError error={errorMessage} />
        </Row>
      )}
      <Row large>
        <SubmitButton isPending={isPending} isSuccessful={!errorMessage}>
          {t("buttons.save")}
        </SubmitButton>
      </Row>
    </HookForm>
  );
};

const PrivacyForm = React.memo(_PublicInfoForm);
export default PrivacyForm;
