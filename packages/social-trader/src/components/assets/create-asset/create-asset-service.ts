import { CREATE_ASSET } from "constants/constants";
import { NewFundRequest, NewTradingAccountRequest } from "gv-api-web";
import { ICreateAccountSettingsFormValues } from "pages/create-account/components/create-account-settings/create-account-settings";
import { ICreateFundSettingsFormValues } from "pages/create-fund/components/create-fund-settings/create-fund-settings";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import filesService from "services/file-service";
import { sendEventToGA } from "utils/ga";

export type ICreateAssetSettingsFormValues =
  | ICreateFundSettingsFormValues
  | ICreateAccountSettingsFormValues;

export type NewAssetRequest = NewFundRequest | NewTradingAccountRequest;

export const createAsset = ({
  data,
  asset
}: {
  data: ICreateAssetSettingsFormValues;
  asset: CREATE_ASSET;
}): Promise<any> => {
  const authorization = authService.getAuthArg();
  let promise = (Promise.resolve("") as unknown) as Promise<any>;
  if ("logo" in data && data.logo && data.logo.cropped) {
    promise = filesService.uploadFile(
      data.logo.cropped,
      authorization
    ) as Promise<any>;
  }
  const method = getCreateMethod(asset);
  return promise
    .then(response =>
      method({
        ...data,
        logo: response
      } as NewAssetRequest)
    )
    .then(result => {
      if (result) {
        sendEventToGA({
          eventCategory: "Create",
          eventAction:
            asset === CREATE_ASSET.ACCOUNT
              ? data.depositAmount
                ? "CreateAccount"
                : "CreateDemoAccount"
              : "CreateFund"
        });
      }
      return result;
    });
};

const getCreateMethod = (
  asset: CREATE_ASSET
): ((request: NewAssetRequest) => Promise<any>) => {
  const authorization = authService.getAuthArg();
  switch (asset) {
    case CREATE_ASSET.ACCOUNT:
      return (request: NewAssetRequest) =>
        assetsApi.createTradingAccount(authorization, {
          body: request as NewTradingAccountRequest
        });
    case CREATE_ASSET.FUND:
    default:
      return (request: NewAssetRequest) =>
        assetsApi.createFund(authorization, {
          body: request as NewFundRequest
        });
  }
};
