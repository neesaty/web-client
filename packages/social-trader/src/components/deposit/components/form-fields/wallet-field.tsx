import { ISelectChangeEvent } from "components/select/select";
import {
  HookFormWalletSelect,
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { safeGetElemFromArray } from "utils/helpers";

interface Props {
  label?: string;
  wallets: ItemsType;
  name: string;
  onChange: (wallet: WalletItemType) => void;
}

const _HookFormWalletField: React.FC<Props> = ({
  label,
  name,
  wallets,
  onChange
}) => {
  const [t] = useTranslation();
  const onChangeCurrencyFrom = useCallback(
    (event: ISelectChangeEvent): void => {
      const wallet = safeGetElemFromArray(
        wallets,
        wallet => wallet.id === event.target.value
      );
      onChange(wallet);
    },
    [wallets]
  );
  return (
    <HookFormWalletSelect
      name={name}
      label={label || t("follow-program.create-account.from")}
      items={wallets}
      onChange={onChangeCurrencyFrom}
    />
  );
};
export const HookFormWalletField = _HookFormWalletField;
