import * as React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isTablet } from "shared/utils/breakpoints";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import GoogleAuthDesktop, {
  IGoogleAuthProps
} from "./google-auth-steps-desktop";
import GoogleAuthMobile from "./google-auth-steps-mobile";

const GoogleAuthSteps: React.FC<Props> = props =>
  isTablet(props.innerWidth) ? (
    <GoogleAuthMobile {...props} />
  ) : (
    <GoogleAuthDesktop {...props} />
  );

const mapStateToProps = ({ ui }: RootState) => ({
  innerWidth: ui.size.innerWidth
});

interface Props extends IGoogleAuthProps, StateProps {}

interface StateProps {
  innerWidth: number;
}

const GoogleAuthStepsContainer = compose<React.ComponentType<IGoogleAuthProps>>(
  connect(mapStateToProps),
  React.memo
)(GoogleAuthSteps);

export default GoogleAuthStepsContainer;
