import { WalletBaseData } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import { useGetRate } from "hooks/get-rate.hook";
import { debounce } from "lodash";
import { fetchWalletsByCurrencyAvailableAction } from "pages/wallet/actions/wallet.actions";
import { walletsAvailableSelector } from "pages/wallet/reducers/wallet.reducers";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

type TUseAssetSectionProps = {
  assetCurrency: CurrencyEnum;
};

export type AssetSectionWalletType = WalletBaseData;

type TUseAssetSectionOutput = {
  rate: number;
  handleWalletChange: (walletId: string) => void;
  wallet: AssetSectionWalletType;
  wallets: AssetSectionWalletType[];
};

const useAssetSection = ({
  assetCurrency
}: TUseAssetSectionProps): TUseAssetSectionOutput => {
  const dispatch = useDispatch();
  const wallets = useSelector(walletsAvailableSelector);
  const accountCurrency = useAccountCurrency();
  const [wallet, setWallet] = useState<AssetSectionWalletType>(
    safeGetElemFromArray(wallets, ({ currency }) => currency === assetCurrency)
  );
  const { rate, getRate } = useGetRate();

  useEffect(() => {
    dispatch(fetchWalletsByCurrencyAvailableAction(accountCurrency));
  }, []);

  useEffect(() => {
    setWallet(
      safeGetElemFromArray(
        wallets,
        ({ currency }) => currency === assetCurrency
      )
    );
  }, [wallets, assetCurrency]);

  const fetchRate = useCallback(debounce(getRate, 100), []);

  useEffect(() => {
    if (wallet) fetchRate({ from: wallet.currency, to: assetCurrency });
  }, [assetCurrency, wallet]);

  const handleWalletChange = useCallback(
    (walletId: string) =>
      setWallet(safeGetElemFromArray(wallets, ({ id }) => id === walletId)),
    [wallets]
  );
  return { rate, handleWalletChange, wallet, wallets };
};
export default useAssetSection;
