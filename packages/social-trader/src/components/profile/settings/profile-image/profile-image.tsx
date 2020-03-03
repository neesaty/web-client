import "./profile-image.scss";

import { INewImage } from "components/form/input-image/input-image";
import imageValidationSchema from "components/form/input-image/input-image.validation";
import LogoField from "components/logo-field/logo-field";
import { SubmitButton } from "components/submit-button/submit-button";
import UserIcon from "media/user-avatar.svg";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { HookForm } from "utils/hook-form.helpers";
import { object } from "yup";

enum FIELDS {
  logo = "logo"
}

const _ProfileImage: React.FC<Props> = ({ onSubmit, avatar, errorMessage }) => {
  const [t] = useTranslation();
  const form = useForm<IProfileImageFormValues>({
    defaultValues: {
      [FIELDS.logo]: {
        src: avatar
      }
    },
    validationSchema: object().shape({
      [FIELDS.logo]: imageValidationSchema(t)
    }),
    mode: "onBlur"
  });

  return (
    <HookForm resetOnSuccess form={form} onSubmit={onSubmit}>
      <div className="profile-image">
        <LogoField name={FIELDS.logo} defaultImage={UserIcon} />
        <SubmitButton isSuccessful={!errorMessage}>
          {t("profile-page.settings.save-photo")}
        </SubmitButton>
      </div>
    </HookForm>
  );
};
const ProfileImage = React.memo(_ProfileImage);
export default ProfileImage;

interface Props {
  errorMessage?: string;
  avatar: string;
  onSubmit: (image: IProfileImageFormValues) => void;
}

export interface IProfileImageFormValues {
  logo: INewImage;
}
