import { CurrencySourceSelectElement } from "components/currency-source-select/currency-source-select.element";
import { DialogBottom } from "components/dialog/dialog-bottom";
import { DialogButtons } from "components/dialog/dialog-buttons";
import { DialogField } from "components/dialog/dialog-field";
import GVButton from "components/gv-button";
import { ISelectChangeEvent } from "components/select/select";
import { TradingAccountDetails } from "gv-api-web";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const _FollowSelectAccount: React.FC<Props> = ({ accounts, onSelect }) => {
  const [account, setAccount] = useState(accounts[0].id);
  const [t] = useTranslation();
  const handleNext = useCallback(() => onSelect(account), [onSelect, account]);
  const onChange = useCallback(
    (event: ISelectChangeEvent) => {
      setAccount(event.target.value);
    },
    [setAccount]
  );
  return (
    <form id="follow-select-account">
      <DialogBottom>
        <DialogField>
          <CurrencySourceSelectElement
            wide
            value={account}
            name={""}
            label={t("follow-program.create-account.from")}
            items={accounts.map(item => ({ ...item, title: item.login }))}
            onChange={onChange}
          />
        </DialogField>
        <DialogButtons>
          <GVButton
            wide
            onClick={handleNext}
            className="invest-form__submit-button"
          >
            {t("follow-program.create-account.next")}
          </GVButton>
        </DialogButtons>
      </DialogBottom>
    </form>
  );
};

interface Props {
  accounts: TradingAccountDetails[];
  onSelect: (values: string) => void;
}

const FollowSelectAccount = _FollowSelectAccount;
export default FollowSelectAccount;
