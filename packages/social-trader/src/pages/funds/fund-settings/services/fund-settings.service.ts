import { push } from "connected-react-router";
import Router from "next/router";
import { Dispatch } from "redux";
import {
  FUND_DETAILS_ROUTE,
  FUNDS_ROUTE,
  FUNDS_SLUG_URL_PARAM_NAME
} from "shared/routes/funds.routes";
import getParams from "shared/utils/get-params";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

export const redirectToFund = () => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const fundSlugUrl = getParams(Router.pathname, FUND_DETAILS_ROUTE)[
    FUNDS_SLUG_URL_PARAM_NAME
  ];
  dispatch(push(`${FUNDS_ROUTE}/${fundSlugUrl}`));
};
