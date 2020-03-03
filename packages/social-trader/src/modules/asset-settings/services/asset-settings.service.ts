import { INewImage } from "components/form/input-image/input-image";
import { ProgramUpdate } from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import authService from "services/auth-service";
import filesService from "services/file-service";

export const editAsset = ({
  editAssetData,
  id
}: {
  id: string;
  editAssetData: IAssetEditFormValues;
}): Promise<Response> => {
  const authorization = authService.getAuthArg();
  let promise = Promise.resolve("");
  if (editAssetData.logo && editAssetData.logo.cropped)
    promise = filesService.uploadFile(
      editAssetData.logo.cropped,
      authorization
    );
  return promise.then(response => {
    const body = {
      ...editAssetData,
      logo: response || editAssetData.logo.src
    } as ProgramUpdate;
    return assetsApi.updateAsset(id, authorization, {
      body
    }); //TODO ask backend to change ProgramUpdate logo type
  });
};

export const closeProgram: TCloseAsset = ({ id, twoFactorCode }) => {
  return assetsApi.closeInvestmentProgram(id, authService.getAuthArg(), {
    body: { twoFactorCode: twoFactorCode! }
  });
};

export const closeFund: TCloseAsset = ({ id, twoFactorCode }) => {
  return assetsApi.closeFund(id, authService.getAuthArg(), {
    body: { twoFactorCode: twoFactorCode! }
  });
};

export const closeTradingAccount: TCloseAsset = ({ id }) => {
  return assetsApi.closeTradingAccount(id, authService.getAuthArg());
};

export type TCloseAsset = (opts: {
  id: string;
  twoFactorCode?: string;
}) => void;

export enum ASSET_EDIT_FIELDS {
  stopOutLevel = "stopOutLevel",
  title = "title",
  description = "description",
  logo = "logo",
  investmentLimit = "investmentLimit",
  hasInvestmentLimit = "hasInvestmentLimit"
}

export interface IAssetEditFormValues {
  [ASSET_EDIT_FIELDS.title]: string;
  [ASSET_EDIT_FIELDS.description]: string;
  [ASSET_EDIT_FIELDS.logo]: INewImage;
  [ASSET_EDIT_FIELDS.stopOutLevel]: number;
  [ASSET_EDIT_FIELDS.investmentLimit]: number | null;
}
