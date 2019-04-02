import { FundWithdrawInfo, WalletBaseData } from "gv-api-web";
import React, { Component, Fragment } from "react";
import { rateApi } from "shared/services/api-client/rate-api";
import { convertFromCurrency } from "shared/utils/currency-converter";
import { ResponseError } from "shared/utils/types";

import { DialogLoader } from "../dialog/dialog-loader/dialog-loader";
import FundWithdrawAmountForm from "./fund-withdraw-amount-form";
import FundWithdrawConfirmForm from "./fund-withdraw-confirm-form";
import FundWithdrawTop from "./fund-withdraw-top";
import FundWithdrawWallet from "./fund-withdraw-wallet";
import {
  FundWithdraw,
  FundWithdrawalInfoResponse
} from "./fund-withdraw.types";

enum FUND_WITHDRAW_FORM {
  ENTER_AMOUNT = "ENTER_AMOUNT",
  CONFIRM = "CONFIRM"
}

class FundWithdrawPopup extends Component<IFundWithdrawPopupProps, State> {
  state: State = {
    step: FUND_WITHDRAW_FORM.ENTER_AMOUNT,
    isPending: false,
    rate: 1,
    withdrawalInfo: undefined,
    wallets: undefined,
    errorMessage: undefined,
    wallet: undefined,
    percent: undefined
  };

  componentDidMount() {
    const { fetchInfo, accountCurrency } = this.props;
    this.setState({ isPending: true });
    fetchInfo()
      .then(data => {
        const { wallets, withdrawalInfo, rate } = data;
        const wallet =
          wallets.find(x => x.currency === accountCurrency) || wallets[0];
        this.setState({
          wallets,
          wallet,
          rate,
          withdrawalInfo,
          isPending: false
        });
      })
      .catch((e: ResponseError) =>
        this.setState({ errorMessage: e.errorMessage, isPending: false })
      );
  }

  fetchRate = (currencyFrom: string): void => {
    rateApi.v10RateByFromByToGet("GVT", currencyFrom).then(rate => {
      this.setState({ rate });
    });
  };

  handleSubmit = () => {
    const { withdraw } = this.props;
    const { percent, wallet } = this.state;
    this.setState({ isPending: true });

    if (!percent || !wallet) return;
    return withdraw({
      percent: percent,
      currency: wallet.currency
    }).catch((e: ResponseError) => {
      this.setState({ isPending: false, errorMessage: e.errorMessage });
    });
  };

  handleEnterAmountSubmit = (percent?: number) => {
    this.setState({
      step: FUND_WITHDRAW_FORM.CONFIRM,
      percent: percent || 0
    });
  };

  goToEnterAmountStep = () => {
    this.setState({
      step: FUND_WITHDRAW_FORM.ENTER_AMOUNT,
      errorMessage: undefined
    });
  };

  handleWalletChange = (walletCurrency: string) => {
    const { wallets } = this.state;
    const wallet = wallets!.find(x => x.currency === walletCurrency);
    this.fetchRate(walletCurrency);
    this.setState({ wallet });
  };

  render() {
    const {
      withdrawalInfo,
      wallets,
      wallet,
      rate,
      percent,
      errorMessage,
      isPending,
      step
    } = this.state;

    if (!withdrawalInfo || !wallets || !wallet) return <DialogLoader />;
    const availableToWithdraw = convertFromCurrency(
      withdrawalInfo.availableToWithdraw,
      rate
    );
    return (
      <Fragment>
        <FundWithdrawTop
          title={withdrawalInfo.title}
          availableToWithdraw={availableToWithdraw}
          currency={wallet.currency}
        />
        <div className="dialog__bottom">
          {step === FUND_WITHDRAW_FORM.ENTER_AMOUNT && (
            <Fragment>
              <FundWithdrawWallet
                wallets={wallets}
                value={wallet.currency}
                onChange={this.handleWalletChange}
              />
              <FundWithdrawAmountForm
                wallets={wallets}
                wallet={wallet}
                availableToWithdraw={availableToWithdraw}
                exitFee={withdrawalInfo.exitFee}
                percent={percent}
                onSubmit={this.handleEnterAmountSubmit}
              />
            </Fragment>
          )}
          {step === FUND_WITHDRAW_FORM.CONFIRM && percent && (
            <FundWithdrawConfirmForm
              errorMessage={errorMessage}
              isPending={isPending}
              availableToWithdraw={availableToWithdraw}
              percent={percent}
              currency={wallet.currency}
              exitFee={withdrawalInfo.exitFee}
              onSubmit={this.handleSubmit}
              onBackClick={this.goToEnterAmountStep}
            />
          )}
        </div>
      </Fragment>
    );
  }
}

export default FundWithdrawPopup;

export interface IFundWithdrawPopupProps {
  accountCurrency: string;
  fetchInfo(): Promise<FundWithdrawalInfoResponse>;
  withdraw(value: FundWithdraw): Promise<void>;
}

interface State {
  withdrawalInfo?: FundWithdrawInfo;
  wallets?: WalletBaseData[];
  isPending: boolean;
  errorMessage?: string;
  step: FUND_WITHDRAW_FORM;
  rate: number;
  wallet?: WalletBaseData;
  percent?: number;
}
