import { WalletData } from "gv-api-web";
import TransferButton, {
  WALLET_BUTTON_TYPE
} from "modules/transfer/transfer-button";
import { TRANSFER_CONTAINER } from "modules/transfer/transfer.types";
import { fetchWallets } from "pages/wallet/services/wallet.services";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

import LineWalletButton from "./line-wallet-button";

export const _LineTransferButton: React.FC<Props> = ({ wallet }) => {
  const [t] = useTranslation();
  const profileCurrency = useSelector(currencySelector);
  const dispatch = useDispatch();
  const updateWalletInfo = useCallback(() => {
    dispatch(fetchWallets(profileCurrency));
  }, [profileCurrency]);
  return (
    <LineWalletButton title={t("wallet-page.buttons.internal-transfer")}>
      <TransferButton
        onApply={updateWalletInfo}
        type={WALLET_BUTTON_TYPE.SMALL}
        withIcon
        currentItem={wallet}
        currentItemContainer={TRANSFER_CONTAINER.SOURCE}
        sourceType={"Wallet"}
        destinationType={"Wallet"}
      />
    </LineWalletButton>
  );
};

interface Props {
  wallet: WalletData;
}

const LineTransferButton = _LineTransferButton;
export default LineTransferButton;
