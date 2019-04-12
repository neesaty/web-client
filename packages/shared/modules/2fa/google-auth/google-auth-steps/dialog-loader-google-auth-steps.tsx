import * as React from "react";
import { connect } from "react-redux";
import {
  DialogLoaderGoogleAuthDesktop,
  DialogLoaderGoogleAuthMobile
} from "shared/components/dialog/dialog-loader/dialog-loader-google-auth";
import RootState from "shared/reducers/root-reducer";
import { isTablet } from "shared/utils/breakpoints";

interface IDialogLoaderGoogleAuthStepsStateProps {
  innerWidth: number;
}

class DialogLoaderGoogleAuthSteps extends React.PureComponent<
  IDialogLoaderGoogleAuthStepsStateProps
> {
  render() {
    return isTablet(this.props.innerWidth) ? (
      <DialogLoaderGoogleAuthMobile />
    ) : (
      <DialogLoaderGoogleAuthDesktop />
    );
  }
}

const mapStateToProps = ({
  ui
}: RootState): IDialogLoaderGoogleAuthStepsStateProps => ({
  innerWidth: ui.innerWidth
});

export default connect(mapStateToProps)(DialogLoaderGoogleAuthSteps);
