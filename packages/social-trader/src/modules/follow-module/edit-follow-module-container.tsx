import Dialog from "components/dialog/dialog";
import { SignalSubscription } from "gv-api-web";
import dynamic from "next/dynamic";
import React from "react";
import { CurrencyEnum } from "utils/types";

const EditFollowModuleFormContainer = dynamic(() =>
  import("modules/follow-module/follow-popup/edit-follow-popup-form.container")
);

const _EditFollowModuleContainer: React.FC<Props> = ({
  signalSubscription,
  tradingAccountId,
  id,
  currency,
  onClose,
  onApply,
  open
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <EditFollowModuleFormContainer
        signalSubscription={signalSubscription}
        tradingAccountId={tradingAccountId}
        onApply={onApply}
        onClose={onClose}
        id={id}
        currency={currency}
      />
    </Dialog>
  );
};

interface Props {
  signalSubscription: SignalSubscription;
  tradingAccountId: string;
  open: boolean;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
}

const EditFollowModuleContainer = _EditFollowModuleContainer;
export default EditFollowModuleContainer;
