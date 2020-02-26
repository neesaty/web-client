import { TableCardRow } from "components/table/components/table-card/table-card";
import { WalletItemType } from "components/wallet-select/wallet-select";
import { ASSET } from "constants/constants";
import { AssetTypeExt, PrivateTradingAccountType } from "gv-api-web";
import DepositButton from "modules/deposit/deposit.button";
import { DepositTransferButton } from "modules/transfer/deposit-transfer-button";
import { WithdrawTransferButton } from "modules/transfer/withdraw-transfer-button";
import WithdrawButton from "modules/withdraw/withdraw.button";
import React from "react";
import { CurrencyEnum } from "utils/types";

const _DepositWithdrawButtons: React.FC<Props> = ({
  accountType,
  transferableItem,
  canTransfer,
  title,
  onApply,
  canWithdraw,
  canInvest,
  ownAsset,
  entryFee,
  availableToInvest,
  broker,
  type,
  id,
  currency
}) => {
  return (
    <TableCardRow
      center={
        (!canWithdraw || !canInvest) && !(canTransfer && transferableItem)
      }
    >
      {canInvest && (
        <DepositButton
          title={title}
          onApply={onApply}
          ownAsset={ownAsset}
          entryFee={entryFee}
          availableToInvest={availableToInvest}
          broker={broker}
          type={type}
          id={id}
          currency={currency}
        />
      )}
      {canWithdraw && (
        <WithdrawButton
          onApply={onApply}
          type={type}
          id={id}
          currency={currency}
        />
      )}
      {canTransfer && transferableItem && (
        <>
          <DepositTransferButton
            onApply={onApply}
            currentItem={transferableItem}
            accountType={accountType}
          />
          <WithdrawTransferButton
            onApply={onApply}
            currentItem={transferableItem}
            accountType={accountType}
          />
        </>
      )}
    </TableCardRow>
  );
};

interface Props {
  accountType?: PrivateTradingAccountType | AssetTypeExt;
  transferableItem?: WalletItemType;
  canTransfer?: boolean;
  showInvest?: boolean;
  title: string;
  onApply: VoidFunction;
  canWithdraw?: boolean;
  canInvest?: boolean;
  ownAsset?: boolean;
  entryFee?: number;
  availableToInvest?: number;
  broker: string;
  type: ASSET;
  id: string;
  currency: CurrencyEnum;
}

const DepositWithdrawButtons = _DepositWithdrawButtons;
export default DepositWithdrawButtons;
