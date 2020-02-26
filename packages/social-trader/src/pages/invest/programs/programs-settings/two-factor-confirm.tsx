import FormTextField from "components/assets/fields/form-text-field";
import GVButton from "components/gv-button";
import SettingsBlock from "components/settings-block/settings-block";
import withLoader from "decorators/with-loader";
import useIsOpen from "hooks/is-open.hook";
import ConfirmContainer from "modules/confirm/confirm-container";
import { dispatchProgramDescription } from "pages/invest/programs/program-details/service/program-details.service";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _TwoFactorConfirm: React.FC<Props> = ({ id }) => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const [isOpen, setOpen, setClose] = useIsOpen();
  const handleOnApply = useCallback(() => {
    dispatch(dispatchProgramDescription());
    setClose();
  }, []);
  return (
    <SettingsBlock label={t("program-settings.two-factor-confirm.title")}>
      <FormTextField>
        {t("program-settings.two-factor-confirm.text")}
      </FormTextField>
      <GVButton color="primary" onClick={setOpen}>
        {t("program-settings.buttons.two-factor-confirm")}
      </GVButton>
      <ConfirmContainer
        open={isOpen}
        onClose={setClose}
        onApply={handleOnApply}
        programId={id}
      />
    </SettingsBlock>
  );
};
interface Props {
  id: string;
}

const TwoFactorConfirm = withLoader(_TwoFactorConfirm);
export default TwoFactorConfirm;
