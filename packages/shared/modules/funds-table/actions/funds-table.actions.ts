import { FundsList } from "gv-api-web";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import fundsApi from "shared/services/api-client/funds-api";
import { ApiAction } from "shared/utils/types";

export const FUNDS_TABLE = "FUNDS_TABLE";

export type TFetchFundsAction = ApiAction<FundsList>;
export const fetchFundsAction = (
  filters: ComposeFiltersAllType
): TFetchFundsAction => ({
  type: FUNDS_TABLE,
  payload: fundsApi.v10FundsGet(filters)
});
