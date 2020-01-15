import authActions from "actions/auth-actions";
import {
  PasswordModel,
  RecoveryCodesViewModel,
  TwoFactorAuthenticatorConfirm,
  TwoFactorCodeModel,
  TwoFactorCodeWithPassword
} from "gv-api-web";
import authApi from "services/api-client/auth-api";
import authService from "services/auth-service";
import { RootThunk } from "utils/types";

export const confirm2fa = (
  body: TwoFactorAuthenticatorConfirm
): RootThunk<Promise<RecoveryCodesViewModel>> => (
  dispatch
): Promise<RecoveryCodesViewModel> => {
  const authorization = authService.getAuthArg();
  return authApi
    .confirmTwoStepAuth(authorization, {
      body
    })
    .then(response => {
      authService.storeToken(response.authToken);
      dispatch(authActions.updateTokenAction(true));
      return response;
    });
};

export const sendPassword = (body: PasswordModel) =>
  authApi.createTwoStepAuthRecoveryCodes(authService.getAuthArg(), { body });

export const disableTFA = (body: TwoFactorCodeWithPassword) =>
  authApi.disableTwoStepAuth(authService.getAuthArg(), { body });

export const fetchTFAData = () =>
  authApi.createTwoStepAuth(authService.getAuthArg());
