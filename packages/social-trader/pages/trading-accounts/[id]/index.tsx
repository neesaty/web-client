import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import { PrivateTradingAccountFull } from "gv-api-web";
import AccountDetailsPage from "pages/accounts/account-details/account-details.page";
import { statisticCurrencyAction } from "pages/accounts/account-details/actions/account-details.actions";
import {
  dispatchAccountDescription,
  dispatchAccountId
} from "pages/accounts/account-details/services/account-details.service";
import React from "react";
import { compose } from "redux";
import { getAccountCurrency } from "utils/account-currency";
import { NextPageWithRedux } from "utils/types";

const Page: NextPageWithRedux<{}> = () => {
  return <AccountDetailsPage />;
};

Page.getInitialProps = async ctx => {
  const { id } = ctx.query;
  const cookiesCurrency = getAccountCurrency(ctx);
  await Promise.all([
    ctx.reduxStore.dispatch(dispatchAccountId(id as string)),
    ctx.reduxStore.dispatch(dispatchAccountDescription(id as string)(ctx))
  ]).then(([_, descriptionResult]) => {
    const description = ((descriptionResult as unknown) as {
      value: PrivateTradingAccountFull;
    }).value;
    const statisticCurrency =
      description.tradingAccountInfo.currency || cookiesCurrency;
    ctx.reduxStore.dispatch(dispatch =>
      dispatch(statisticCurrencyAction(statisticCurrency))
    );
  });
  return {};
};

export default compose(withPrivateRoute, withDefaultLayout)(Page);
