import {
  dashboardInvestmentsFundsReducer,
  TInvestmentsFundsState
} from "pages/dashboard/reducers/dashboard-investments-funds.reducer";
import {
  dashboardInvestmentsMostProfitableReducer,
  TInvestmentsMostProfitableState
} from "pages/dashboard/reducers/dashboard-investments-most-profitable.reducer";
import {
  dashboardInvestmentsProgramsReducer,
  TInvestmentsProgramsState
} from "pages/dashboard/reducers/dashboard-investments-programs.reducer";
import {
  dashboardInvestmentsTotalReducer,
  TInvestmentsTotalState
} from "pages/dashboard/reducers/dashboard-investments-total.reducer";
import { combineReducers } from "redux";

export type DashboardInvestmentsState = {
  total: TInvestmentsTotalState;
  funds: TInvestmentsFundsState;
  programs: TInvestmentsProgramsState;
  mostProfitable: TInvestmentsMostProfitableState;
};

const dashboardInvestmentsReducer = combineReducers<DashboardInvestmentsState>({
  total: dashboardInvestmentsTotalReducer,
  funds: dashboardInvestmentsFundsReducer,
  programs: dashboardInvestmentsProgramsReducer,
  mostProfitable: dashboardInvestmentsMostProfitableReducer
});

export default dashboardInvestmentsReducer;
