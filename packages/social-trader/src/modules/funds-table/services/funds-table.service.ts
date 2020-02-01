import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { composeFilters } from "components/table/helpers/filtering.helpers";
import { calculateSkipAndTake } from "components/table/helpers/paging.helpers";
import { ItemsViewModelFundDetailsListItem } from "gv-api-web";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import * as qs from "qs";
import { FAVORITES_TAB_NAME } from "routes/invest.routes";
import fundsApi from "services/api-client/funds-api";
import authService from "services/auth-service";
import { getCookie } from "utils/cookie";
import { CurrencyEnum, NextPageWithReduxContext } from "utils/types";

import {
  DEFAULT_FUND_TABLE_FILTERS,
  DEFAULT_ITEMS_ON_PAGE,
  FUNDS_TABLE_FILTERS,
  SORTING_FILTER_VALUE
} from "../components/funds-table/funds-table.constants";

export type FetchFundsType = (
  filters: ComposeFiltersAllType
) => Promise<ItemsViewModelFundDetailsListItem>;
export const fetchFunds: FetchFundsType = filters => {
  if (authService.getAuthArg()) {
    filters.authorization = authService.getAuthArg();
  }
  return fundsApi.getFunds(filters);
};

export const getFiltersFromContext = (ctx: NextPageWithReduxContext) => {
  const showFavorites = ctx.pathname.includes(FAVORITES_TAB_NAME);
  const { asPath = "", pathname, reduxStore } = ctx;
  const {
    page,
    sorting = SORTING_FILTER_VALUE,
    dateRange = {},
    showIn,
    ...other
  } = qs.parse(asPath.slice(pathname.length + 1));
  const accountCurrency =
    (getCookie(ACCOUNT_CURRENCY_KEY, ctx) as CurrencyEnum) ||
    reduxStore.getState().accountSettings.currency;

  const skipAndTake = calculateSkipAndTake({
    itemsOnPage: DEFAULT_ITEMS_ON_PAGE,
    currentPage: page
  });

  return {
    ...composeFilters(FUNDS_TABLE_FILTERS, {
      ...DEFAULT_FUND_TABLE_FILTERS,
      ...other
    }),
    ...skipAndTake,
    dateFrom: dateRange.dateStart,
    dateTo: dateRange.dateEnd,
    showIn: showIn || accountCurrency,
    sorting,
    showFavorites
  };
};
