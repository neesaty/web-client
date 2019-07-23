import React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { compose } from "redux";
import GVButton from "shared/components/gv-button";
import useIsOpen from "shared/hooks/is-open.hook";
import ChangePasswordTradingAccountPopup from "./change-password-trading-account-popup";

const _ChangePassword: React.FC<Props> = ({ id, t, title }) => {
  const [
    isChangePasswordOpen,
    setChangePasswordOpen,
    setChangePasswordClose
  ] = useIsOpen();
  return (
    <>
      <h3>{t("manager.program-settings.password.title")}</h3>
      <p className="program-edit__text">
        {t("manager.program-settings.password.text")}
      </p>
      <GVButton color="primary" onClick={setChangePasswordOpen}>
        {t("program-details-page.description.change-password")}
      </GVButton>
      <ChangePasswordTradingAccountPopup
        programName={title}
        open={isChangePasswordOpen}
        id={id}
        onClose={setChangePasswordClose}
      />
    </>
  );
};

interface Props extends OwnProps, WithTranslation {}

interface OwnProps {
  title: string;
  id: string;
}

const ChangePassword = compose<React.ComponentType<OwnProps>>(
  translate(),
  React.memo
)(_ChangePassword);
export default ChangePassword;
