import { replace } from "connected-react-router";
import * as React from "react";
import { connect } from "react-redux";
import { NOT_FOUND_PAGE_ROUTE } from "shared/components/not-found/not-found.routes";

import RecoveryCodeForm from "./recovery-code-form";
import { ROLE } from "shared/constants/constants";
import {
  CODE_TYPE,
  loginUserInvestor,
  loginUserManager
} from "../login.actions";
import * as loginService from "../login.service";
import { LoginService, SetSubmittingFuncType } from "../login.service";
import { ManagerRootState } from "manager-web-portal/src/reducers";
import { InvestorRootState } from "investor-web-portal/src/reducers";
import { bindActionCreators, Dispatch } from "redux";
import * as authService from "../../auth.service";
import { CaptchasType, CounterType } from "../../auth.service";
import Pow from "../../captcha/pow";
import { ILoginFormFormValues } from "../login/login-form";

class _RecoveryCodeContainer extends React.PureComponent<Props, State> {
  state = {
    pow: undefined,
    geeTest: undefined,
    id: "",
    email: "",
    password: "",
    setSubmitting: (val: boolean) => {},
    code: ""
  };
  componentDidMount() {
    const { email, password, service } = this.props;
    if (email === "" || password === "") {
      service.showNotFoundPage();
    }
  }

  componentWillUnmount() {
    this.props.service.clearLoginData();
  }

  handlePow = (prefix: number) => {
    const { service, role } = this.props;
    const method = role === ROLE.MANAGER ? loginUserManager : loginUserInvestor;
    service.twoFactorLogin({
      ...this.state,
      type: CODE_TYPE.RECOVERY,
      method,
      prefix
    });
    this.setState({ pow: undefined });
  };

  handleSubmit = (
    code: string,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, password } = this.props;
    authService.getCaptcha(email).then(res => {
      this.setState({ ...res, email, password, setSubmitting, code });
    });
  };

  render() {
    const { pow, id, email } = this.state;
    return (
      <>
        <RecoveryCodeForm
          onSubmit={this.handleSubmit}
          error={this.props.errorMessage}
        />
        {pow && (
          <Pow {...pow} id={id} email={email} handleSuccess={this.handlePow} />
        )}
      </>
    );
  }
}

const mapStateToProps = (
  state: ManagerRootState | InvestorRootState
): StateProps => {
  const { errorMessage } = state.loginData.login;
  const { email, password } = state.loginData.twoFactor;
  return { errorMessage, email, password };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  service: bindActionCreators(
    {
      ...(loginService as LoginService),
      showNotFoundPage: () => dispatch(replace(NOT_FOUND_PAGE_ROUTE))
    },
    dispatch
  )
});

interface State extends ILoginFormFormValues, CaptchasType {
  setSubmitting: SetSubmittingFuncType;
  code: string;
  id?: string;
}

interface StateProps extends ILoginFormFormValues {
  errorMessage: string;
}

interface DispatchProps {
  service: LoginService & { showNotFoundPage: () => void };
}

interface OwnProps {
  role: ROLE;
}

interface Props extends OwnProps, StateProps, DispatchProps {}

const RecoveryCodeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(_RecoveryCodeContainer);
export default RecoveryCodeContainer;
