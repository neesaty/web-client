import "./app-layout.scss";

import HeaderContainer from "modules/header/components/header-container";
import React, { Component } from "react";
import { connect } from "react-redux";
import authActions from "shared/actions/auth-actions";
import platformActions from "shared/actions/platform-actions";
import { initOnResizeEvent } from "shared/actions/ui-actions";
import NotificationsContainer from "shared/components/notifications/components/notifications-container";

class AppLayout extends Component {
  componentDidMount() {
    this.props.fetchPlatformSettings();
    this.props.initOnResizeEvent();
    this.props.updateToken();
  }

  render() {
    return (
      <div className="app__wrapper">
        <div className="app">
          <div className="app__header">
            <HeaderContainer />
          </div>
          <div className="app__main">{this.props.children}</div>
          <NotificationsContainer />
        </div>
        <div id="modal-root" />
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    fetchPlatformSettings: () =>
      dispatch(platformActions.fetchPlatformSettings),
    initOnResizeEvent: () => dispatch(initOnResizeEvent()),
    updateToken: () => dispatch(authActions.updateToken())
  }),
  null,
  { pure: false }
)(AppLayout);
