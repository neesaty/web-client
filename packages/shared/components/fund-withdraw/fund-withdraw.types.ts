import { FundWithdrawInfo, WalletBaseData } from "gv-api-web";

export type FundWithdrawalInfoResponse = {
  withdrawalInfo: FundWithdrawInfo;
  wallets: WalletBaseData[];
  rate: number;
};

export type FundWithdraw = {
  percent: number;
  currency: string;
};
