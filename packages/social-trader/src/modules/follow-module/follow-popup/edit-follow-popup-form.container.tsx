import { SignalSubscription } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import FollowParams, {
  FollowParamsFormValues
} from "modules/follow-module/follow-popup/follow-popup-params";
import FollowTop from "modules/follow-module/follow-popup/follow-popup-top";
import React, { useCallback, useEffect } from "react";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

import { useGetRate } from "../follow-module-container.hooks";
import { updateAttachToSignal } from "../services/follow-module-service";

const DEFAULT_RATE_CURRENCY = "USD";

const _EditFollowModuleFormContainer: React.FC<Props> = ({
  tradingAccountId,
  id,
  signalSubscription,
  currency,
  onClose,
  onApply
}) => {
  const { sendRequest: submitChanges } = useApiRequest({
    request: updateAttachToSignal,
    successMessage: "follow-program.edit-success-alert-message",
    middleware: [onApply, onClose]
  });

  const { rate, getRate } = useGetRate();

  useEffect(() => {
    getRate({ from: DEFAULT_RATE_CURRENCY, to: currency });
  }, [currency]);

  const submit = useCallback(
    (values: FollowParamsFormValues, setSubmitting: SetSubmittingType) => {
      const requestParams = {
        ...values,
        tradingAccountId
      };
      submitChanges({ id, requestParams }, setSubmitting);
    },
    [id, tradingAccountId]
  );
  return (
    <>
      <FollowTop step={"params"} />
      <FollowParams
        rate={rate}
        currency={currency}
        paramsSubscription={signalSubscription}
        onSubmit={submit}
      />
    </>
  );
};

interface Props {
  tradingAccountId: string;
  onClose: () => void;
  onApply: () => void;
  currency: CurrencyEnum;
  id: string;
  signalSubscription?: SignalSubscription;
}

const EditFollowModuleFormContainer = React.memo(
  _EditFollowModuleFormContainer
);
export default EditFollowModuleFormContainer;
