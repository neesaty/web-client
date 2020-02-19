import { Push } from "components/link/link";
import useApiRequest from "hooks/api-request.hook";
import { TErrorMessage } from "hooks/error-message.hook";
import { alertMessageActions } from "modules/alert-message/actions/alert-message-actions";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { TRADING_ROUTE } from "routes/dashboard.routes";
import { sendEventToGA } from "utils/ga";

import { TAssetFromTo } from "./convert-asset.types";
import {
  convertAsset,
  IConvertAssetSettingsFormValues
} from "./services/convert-asset.service";

type TUseConvertAssetSubmitProps = {
  id: string;
  condition?: (data: any | null) => boolean;
  fromTo: TAssetFromTo;
};

type TUseConvertAssetSubmitOutput = {
  handleCreate: (data: IConvertAssetSettingsFormValues) => void;
  errorMessage: TErrorMessage;
};

const useConvertAssetSubmit = ({
  id,
  condition,
  fromTo
}: TUseConvertAssetSubmitProps): TUseConvertAssetSubmitOutput => {
  const sendEventMiddleware = () => {
    if (fromTo.assetTo === CONVERT_ASSET.PROGRAM)
      sendEventToGA({
        eventCategory: "Create",
        eventAction: "ConvertToProgram"
      });
  };
  const dispatch = useDispatch();
  const checkConditionMiddleware = (data: any) => {
    if (!data || !condition || condition(data)) {
      dispatch(
        alertMessageActions.success(
          `convert-${fromTo.assetFrom.toLowerCase()}-${fromTo.assetTo.toLowerCase()}-page.notifications.create-success`,
          true
        )
      );
      Push(TRADING_ROUTE);
    }
  };
  const { sendRequest, errorMessage } = useApiRequest({
    middleware: [sendEventMiddleware, checkConditionMiddleware],
    request: convertAsset
  });
  const handleCreate = useCallback((data: IConvertAssetSettingsFormValues) => {
    return sendRequest({ data: { ...data, id }, fromTo });
  }, []);
  return { handleCreate, errorMessage };
};
export default useConvertAssetSubmit;
