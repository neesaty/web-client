import useApiRequest from "hooks/api-request.hook";
import useIsOpen from "hooks/is-open.hook";
import * as React from "react";
import { useCallback } from "react";

import { disableTFA } from "../services/2fa.service";
import DisableAuthForm, {
  IDisableAuthFormFormValues
} from "./disable-auth-form";
import DisableAuthSuccess from "./disable-auth-success";

const _DisableAuthContainer: React.FC<Props> = ({ onSubmit }) => {
  const [isSuccess, setSuccess, setFail] = useIsOpen();
  const { errorMessage, sendRequest } = useApiRequest({
    middleware: [setSuccess, onSubmit],
    request: disableTFA,
    catchCallback: setFail
  });
  const handleSubmit = useCallback(
    (model: IDisableAuthFormFormValues) => sendRequest(model),
    []
  );
  return isSuccess ? (
    <DisableAuthSuccess />
  ) : (
    <DisableAuthForm onSubmit={handleSubmit} errorMessage={errorMessage} />
  );
};

interface Props {
  onSubmit: () => void;
}

const DisableAuthContainer = _DisableAuthContainer;
export default DisableAuthContainer;
