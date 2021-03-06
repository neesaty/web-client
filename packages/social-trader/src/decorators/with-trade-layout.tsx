import { changeLocationAction } from "actions/location.actions";
import platformActions from "actions/platform-actions";
import { TradeLayout } from "components/layouts/trade-layout/trade-layout";
import ServerErrorPage from "components/server-error-page/server-error-page";
import { ErrorViewModel, PlatformInfo } from "gv-api-web";
import { NextPage } from "next";
import React, { Component } from "react";
import { Dispatch } from "redux";
import { NextPageWithReduxContext } from "utils/types";

const withTradeLayout = (WrappedComponent: NextPage<any>) =>
  class extends Component<{
    info: PlatformInfo;
    ex: ErrorViewModel;
  }> {
    static async getInitialProps(ctx: NextPageWithReduxContext) {
      let componentProps = {};
      await ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
        await dispatch(changeLocationAction());
      });
      await Promise.all([
        WrappedComponent.getInitialProps &&
          WrappedComponent.getInitialProps(ctx),
        ctx.reduxStore.dispatch(async (dispatch: Dispatch) => {
          await dispatch(platformActions.fetchPlatformSettings());
        })
      ])
        .then(([data]) => {
          if (data) componentProps = data;
        })
        .catch(ex => {
          componentProps = { ex };
        });
      return {
        namespacesRequired: ["translations"],
        ...componentProps
      };
    }
    render() {
      const { ex, ...others } = this.props;
      return (
        <TradeLayout>
          {ex ? <ServerErrorPage ex={ex} /> : <WrappedComponent {...others} />}
        </TradeLayout>
      );
    }
  };

export default withTradeLayout;
