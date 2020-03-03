import authActions from "actions/auth-actions";
import { INewImage } from "components/form/input-image/input-image";
import { Dispatch } from "redux";
import authApi from "services/api-client/auth-api";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";
import filesService from "services/file-service";

export const updateProfileAvatar = ({ newImage }: { newImage: INewImage }) => {
  const authorization = authService.getAuthArg();
  let promise;
  if (!newImage) {
    promise = profileApi.removeAvatar(authorization);
  } else {
    promise = filesService
      .uploadFile(newImage!.cropped, authorization)
      .then(logoId => {
        return profileApi.updateAvatar(logoId, authorization);
      });
  }

  return promise;
};

export const logoutFromDevices = (dispatch: Dispatch) =>
  authApi.logoutFromAnotherDevices(authService.getAuthArg()).then(response => {
    authService.storeToken(response);
    dispatch(authActions.updateTokenAction(true));
  });
