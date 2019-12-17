import "./public-select.scss";

import GVSwitch from "components/gv-selection/gv-switch";
import {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { isPublicInvestorSelector } from "reducers/header-reducer";

import { setPublicOff, setPublicOn } from "./public-select.service";

const _PublicSelect: React.FC<Props> = ({ isPublicProp }) => {
  const isPublicInvestor = useSelector(isPublicInvestorSelector);
  const [t] = useTranslation();
  const [isPublic, setPublic, setNotPublic, setPublicValue] = useIsOpen(
    isPublicInvestor
  );
  useEffect(() => {
    setPublicValue(isPublicInvestor);
  }, [isPublicInvestor]);
  const request = isPublic ? setPublicOff : setPublicOn;
  const setPublicMiddleware = () => {
    setPublicValue(!isPublic);
  };
  const { isPending, sendRequest } = useApiRequest({
    request,
    middleware: [setPublicMiddleware]
  });
  const handleSwitch = useCallback(() => sendRequest(), [request, isPublic]);
  return (
    <div className="public-select">
      <Tooltip
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        render={() => (
          <div className="public-select__tooltip">
            {t("profile-page.settings.public.text")}
          </div>
        )}
      >
        <div className="public-select__question">?</div>
      </Tooltip>
      <div className="public-select__label">
        {t("profile-page.settings.public.label")}
      </div>
      {isPublicInvestor !== undefined && (
        <GVSwitch
          name={"isPublic"}
          touched={false}
          className="public-select__switch"
          value={isPublic}
          disabled={isPending}
          color="primary"
          onChange={handleSwitch}
        />
      )}
    </div>
  );
};

interface Props {
  isPublicProp?: boolean;
}

const PublicSelect = React.memo(_PublicSelect);
export default PublicSelect;
