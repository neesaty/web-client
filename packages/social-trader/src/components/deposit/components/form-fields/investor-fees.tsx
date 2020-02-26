import { DialogList } from "components/dialog/dialog-list";
import { DialogListItem } from "components/dialog/dialog-list-item";
import Crashable from "decorators/crashable";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import {
  calculatePercentage,
  convertFromCurrency
} from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import { TFees } from "../deposit.types";

const _InvestorFees: React.FC<Props> = ({
  fees: { gvCommission, entryFee = 0 },
  amount,
  rate,
  hasEntryFee,
  currency,
  walletCurrency
}) => {
  const gvCommissionValue = calculatePercentage(amount, gvCommission);
  const entryFeeValue = calculatePercentage(
    amount - gvCommissionValue,
    entryFee
  );
  const investAmount =
    amount - gvCommissionValue - entryFeeValue * +hasEntryFee;
  const [t] = useTranslation();
  return (
    <DialogList>
      {hasEntryFee && (
        <DialogListItem label={t("deposit-asset.entry-fee")}>
          {entryFee} %
          <NumberFormat
            value={formatCurrencyValue(
              convertFromCurrency(entryFeeValue, rate),
              currency
            )}
            prefix=" ("
            suffix={` ${currency})`}
            displayType="text"
          />
        </DialogListItem>
      )}
      <DialogListItem label={t("deposit-asset.gv-commission")}>
        {gvCommission} %
        <NumberFormat
          value={formatCurrencyValue(gvCommissionValue, walletCurrency)}
          prefix={" ("}
          suffix={` ${walletCurrency})`}
          displayType="text"
        />
      </DialogListItem>
      <DialogListItem label={t("deposit-asset.investment-amount")}>
        <NumberFormat
          value={formatCurrencyValue(
            convertFromCurrency(investAmount, rate),
            currency
          )}
          prefix="≈ "
          suffix={` ${currency}`}
          displayType="text"
        />
      </DialogListItem>
    </DialogList>
  );
};

interface Props {
  fees: TFees;
  hasEntryFee: boolean;
  amount: number;
  rate: number;
  currency: CurrencyEnum;
  walletCurrency: CurrencyEnum;
}

export const InvestorFees = Crashable(_InvestorFees);
