import ConfirmPopup from "components/confirm-popup/confirm-popup";
import React from "react";
import { useTranslation } from "react-i18next";

const _Unfollow: React.FC<IProgramUnfollowProps> = ({
  open,
  onClose,
  onApply
}) => {
  const [t] = useTranslation();
  return (
    <ConfirmPopup
      open={open}
      onClose={onClose}
      onCancel={onClose}
      onApply={onApply}
      header={t("unfollow-program.title")}
      body={t("unfollow-program.text")}
      applyButtonText={t("buttons.confirm")}
      className="dialog--wider"
    />
  );
};

export interface IProgramUnfollowProps {
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  onCancel?: () => void;
}

const Unfollow = _Unfollow;
export default Unfollow;
