import { FundInvestingDetailsList } from "gv-api-web";
import {
  fetchDashboardInvestmentsFundsAction,
  fetchDashboardInvestmentsTotalAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardFundCard from "pages/dashboard/components/dashboard-investing/dashboard-fund-card";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import { dashboardInvestmentsFundsSelector } from "pages/dashboard/reducers/dashboard-investments-funds.reducer";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardInvestingFunds: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const [t] = useTranslation();
  const handleUpdateItems = useCallback(
    updateItems => () => {
      dispatch(fetchDashboardInvestmentsTotalAction(currency));
      updateItems();
    },
    [currency]
  );
  return (
    <DashboardInvestingTable
      dataSelector={dashboardInvestmentsFundsSelector}
      action={fetchDashboardInvestmentsFundsAction}
      title={t("dashboard-page.investing.funds")}
      renderBodyCard={(
        fund: FundInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardFundCard
          updateRow={handleUpdateItems(updateRow)}
          updateItems={handleUpdateItems(updateItems!)}
          fund={fund}
        />
      )}
    />
  );
};

const DashboardInvestingFunds = _DashboardInvestingFunds;
export default DashboardInvestingFunds;
