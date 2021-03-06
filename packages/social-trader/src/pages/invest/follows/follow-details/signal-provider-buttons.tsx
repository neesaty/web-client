import { DetailsStatisticContainer } from "components/details/details-description-section/details-description/details-structure-blocks";
import Crashable from "decorators/crashable";
import { AssetGuestActions, BrokerTradeServerType } from "gv-api-web";
import * as React from "react";
import { useCallback } from "react";
import { CurrencyEnum } from "utils/types";

import FollowButton from "./follow-button";

const _SignalProviderButtons: React.FC<Props> = ({
  onApply,
  guestActions: {
    canSubscribeToExternalSignalCommonAccount,
    canSubscribeToExternalSignalPrivateAccount,
    canSubscribeToInternalSignal
  } = {},
  leverage,
  brokerId,
  broker,
  id,
  currency
}) => {
  const updateInfo = useCallback(() => {
    onApply();
  }, [id]);

  const isExternal = !!canSubscribeToExternalSignalPrivateAccount;
  return (
    <DetailsStatisticContainer>
      <FollowButton
        canFollow={
          canSubscribeToExternalSignalCommonAccount ||
          canSubscribeToExternalSignalPrivateAccount ||
          canSubscribeToInternalSignal
        }
        onApply={updateInfo}
        leverage={leverage}
        brokerId={brokerId}
        isExternal={isExternal}
        broker={broker}
        id={id}
        currency={currency}
      />
    </DetailsStatisticContainer>
  );
};

interface Props {
  onApply: VoidFunction;
  guestActions?: AssetGuestActions;
  leverage: number;
  brokerId: string;
  broker: BrokerTradeServerType;
  id: string;
  currency: CurrencyEnum;
}

const SignalProviderButtons = React.memo(Crashable(_SignalProviderButtons));
export default SignalProviderButtons;
