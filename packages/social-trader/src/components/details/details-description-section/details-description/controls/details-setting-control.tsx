import { SettingsIcon } from "components/icon/settings-icon";
import Link, { ToType } from "components/link/link";
import React from "react";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsSettingControl: React.FC<Props> = ({ to, text }) => {
  return (
    <DetailsDescriptionControl
      tag={Link}
      to={to}
      className="details-description-control--button"
      text={text}
    >
      <SettingsIcon className="details-description-control__icon" />
    </DetailsDescriptionControl>
  );
};

export interface Props {
  to: ToType;
  text: string;
}

const DetailsSettingControl = _DetailsSettingControl;
export default DetailsSettingControl;
