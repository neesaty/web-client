import { setTwoFactorRequirementAction } from "actions/2fa-actions";
import authActions from "actions/auth-actions";
import { Push } from "components/link/link";
import { NOT_FOUND_PAGE_ROUTE } from "components/not-found/not-found.routes";
import useApiRequest from "hooks/api-request.hook";
import useErrorMessage from "hooks/error-message.hook";
import Router from "next/router";
import { LOGIN_ROUTE_TWO_FACTOR_ROUTE } from "pages/auth/signin/signin.constants";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import authService from "services/auth-service";
import { AuthRootState, ReduxDispatch, ResponseError } from "utils/types";

import CaptchaContainer, { ValuesType } from "../captcha-container";
import { CODE_TYPE, storeTwoFactorAction } from "./signin.actions";
import { clearTwoFactorData, login } from "./signin.service";

const _SignInContainer: React.FC<Props> = ({
  className,
  renderForm,
  redirectFrom,
  type
}) => {
  const { errorMessage, setErrorMessage } = useErrorMessage();
  const dispatch = useDispatch<ReduxDispatch>();
  const successMiddleware = (value: string) => {
    if (!value) return;
    authService.storeToken(value);
    dispatch(authActions.updateTokenAction(true));
    if (type) dispatch(clearTwoFactorData());
    Router.push(redirectFrom);
  };

  const { email, password } = useSelector(
    (state: AuthRootState) => state.loginData.twoFactor
  );

  const { sendRequest } = useApiRequest({
    middleware: [successMiddleware],
    request: values => {
      return login({
        ...values,
        type,
        email: values.email || email,
        password: values.password || password
      }).catch((e: ResponseError) => {
        setErrorMessage(e);
        if (e.code === "RequiresTwoFactor") {
          dispatch(
            storeTwoFactorAction({
              email: values.email,
              password: values.password,
              from: redirectFrom
            })
          );
          dispatch(setTwoFactorRequirementAction(true));
          Push(LOGIN_ROUTE_TWO_FACTOR_ROUTE);
        }
      });
    }
  });

  useEffect(() => {
    if (type && (email === "" || password === ""))
      Router.replace(NOT_FOUND_PAGE_ROUTE);
  }, []);
  return (
    <div className={className}>
      <CaptchaContainer
        request={sendRequest}
        renderForm={handle => renderForm(handle, email, errorMessage)}
      />
    </div>
  );
};

interface Props {
  renderForm: (
    handle: (values: ValuesType) => void,
    email: string,
    errorMessage: string
  ) => JSX.Element;
  className: string;
  type?: CODE_TYPE;
  redirectFrom: string;
}

const SignInContainer = React.memo(_SignInContainer);
export default SignInContainer;
