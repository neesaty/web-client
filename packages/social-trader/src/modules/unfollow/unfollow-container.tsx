import Dialog, { IDialogProps } from "components/dialog/dialog";
import useApiRequest from "hooks/api-request.hook";
import dynamic from "next/dynamic";
import React, { useCallback } from "react";
import { postponeCallback } from "utils/hook-form.helpers";

import { IProgramUnfollowFormValues } from "./components/unfollow-form";
import {
  detachToSignalExternal,
  detachToSignalInternal
} from "./services/unfollow.service";

const UnfollowForm = dynamic(() => import("./components/unfollow-form"));

const _UnfollowContainer: React.FC<Props> = ({
  tradingAccountId,
  isExternal,
  open,
  onClose,
  onApply,
  id
}) => {
  const { sendRequest } = useApiRequest({
    request: getDetachMethod(isExternal),
    successMessage: "unfollow-program.success-alert-message",
    middleware: [
      postponeCallback(() => {
        onClose();
        onApply();
      })
    ]
  });
  const handleSubmit = useCallback(
    ({ mode }: IProgramUnfollowFormValues) => {
      return sendRequest({ id, model: { mode, tradingAccountId } });
    },
    [id, tradingAccountId]
  );
  return (
    <Dialog open={open} onClose={onClose}>
      <UnfollowForm isExternal={isExternal} onSubmit={handleSubmit} />
    </Dialog>
  );
};

const getDetachMethod = (isExternal: boolean) =>
  isExternal ? detachToSignalExternal : detachToSignalInternal;

interface Props extends IDialogProps {
  tradingAccountId: string;
  isExternal: boolean;
  id: string;
  onApply: () => void;
}

const UnfollowContainer = _UnfollowContainer;
export default UnfollowContainer;
