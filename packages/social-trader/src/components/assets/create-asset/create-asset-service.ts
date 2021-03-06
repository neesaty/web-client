import { CREATE_ASSET } from "constants/constants";
import {
  NewExchangeAccountRequest,
  NewFundRequest,
  NewTradingAccountRequest
} from "gv-api-web";
import { ICreateAccountSettingsFormValues } from "pages/create-account/components/create-account-settings/create-account-settings";
import { ICreateExchangeAccountSettingsFormValues } from "pages/create-account/components/create-exchange-account-settings/create-exchange-account-settings";
import { ICreateFundSettingsFormValues } from "pages/create-fund/components/create-fund-settings/create-fund-settings";
import { api } from "services/api-client/swagger-custom-client";
import filesService from "services/file-service";
import { sendEventToGA } from "utils/ga";

export type ICreateAssetSettingsFormValues =
  | ICreateExchangeAccountSettingsFormValues
  | ICreateFundSettingsFormValues
  | ICreateAccountSettingsFormValues;

export type NewAssetRequest =
  | NewExchangeAccountRequest
  | NewFundRequest
  | NewTradingAccountRequest;

export const createAsset = ({
  data,
  asset
}: {
  data: ICreateAssetSettingsFormValues;
  asset: CREATE_ASSET;
}): Promise<any> => {
  let promise = (Promise.resolve("") as unknown) as Promise<any>;
  if ("logo" in data && data.logo.image && data.logo.image.cropped) {
    promise = filesService.uploadFile(data.logo.image.cropped) as Promise<any>;
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
  const assetsApi = api.assets();
  switch (asset) {
    case CREATE_ASSET.EXCHANGE_ACCOUNT:
      return (request: NewAssetRequest) =>
        assetsApi.createExchangeAccount({
          body: request as NewExchangeAccountRequest
        });
    case CREATE_ASSET.ACCOUNT:
      return (request: NewAssetRequest) =>
        assetsApi.createTradingAccount({
          body: request as NewTradingAccountRequest
        });
    case CREATE_ASSET.FUND:
    default:
      return (request: NewAssetRequest) =>
        assetsApi.createFund({
          body: request as NewFundRequest
        });
  }
};
