import GVButton from "components/gv-button";
import useApiRequest from "hooks/api-request.hook";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { logoutFromDevices } from "../services/profile-settings.service";

const _LogoutButtonContainer: React.FC = () => {
  const [t] = useTranslation();
  const dispatch = useDispatch();
  const { isPending, sendRequest } = useApiRequest({
    request: () => dispatch(logoutFromDevices),
    successMessage: "auth.logout-from-another-devices.success-message"
  });
  const handleSubmit = useCallback(() => sendRequest(), []);
  return (
    <div className="logout-container">
      <GVButton onClick={handleSubmit} disabled={isPending}>
        {t("profile-page.settings.logout-from-another-devices")}
      </GVButton>
    </div>
  );
};

const LogoutButtonContainer = _LogoutButtonContainer;
export default LogoutButtonContainer;
