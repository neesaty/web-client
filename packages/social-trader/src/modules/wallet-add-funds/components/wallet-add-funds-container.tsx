import "./wallet-add-funds-form.scss";

import { walletsSelector } from "pages/wallet/reducers/wallet.reducers";
import * as React from "react";
import { useSelector } from "react-redux";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

import WalletAddFundsForm from "./wallet-add-funds-form";

const _WalletAddFundsContainer: React.FC<Props> = ({ currentCurrency }) => {
  const wallets = useSelector(walletsSelector);
  const currentWallet = safeGetElemFromArray(
    wallets,
    ({ currency }) => currency === currentCurrency
  );
  return (
    <WalletAddFundsForm
      condition={!!wallets.length && !!currentWallet}
      wallets={wallets.filter(wallet => wallet.isDepositEnabled)}
      currentWallet={currentWallet}
    />
  );
};

interface Props {
  currentCurrency: CurrencyEnum;
}

const WalletAddFundsContainer = _WalletAddFundsContainer;
export default WalletAddFundsContainer;
