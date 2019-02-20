import { GVButton, GVFormikField } from "gv-react-components";
import * as React from "react";
import { TranslationFunction, translate } from "react-i18next";

import GVNumberFiled from "../gv-number-field/gv-number-field";

export interface IInputAmountFieldProps {
  t: TranslationFunction;
  name: string;
  label: string;
  currency: string;
  isAllow: boolean | Function;
  setMax(): void;
}

class InputAmountField extends React.Component<IInputAmountFieldProps> {
  render() {
    const { t, name, label, currency, isAllow, setMax } = this.props;
    return (
      <GVFormikField
        name={name}
        label={label}
        component={GVNumberFiled}
        adornment={
          <GVButton
            onClick={setMax}
            variant="text"
            color="secondary"
            className="gv-btn--no-padding"
          >
            {t("Max")}
          </GVButton>
        }
        autoComplete="off"
        autoFocus
        suffix={` ${currency}`}
        allowNegative={false}
        isAllowed={isAllow}
      />
    );
  }
}

export default translate()(InputAmountField);
