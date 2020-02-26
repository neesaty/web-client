import { fetchDashboardInvestmentsTotalAction } from "pages/dashboard/actions/dashboard.actions";
import DashboardBlock from "pages/dashboard/components/dashboard-block/dashboard-block";
import DashboardInvestingTotal from "pages/dashboard/components/dashboard-investing/dashboard-investing-total";
import { getTotalLoaderData } from "pages/dashboard/dashboard.loaders-data";
import { dashboardInvestmentsTotalSelector } from "pages/dashboard/reducers/dashboard-investments-total.reducer";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { currencySelector } from "reducers/account-settings-reducer";

const _DashboardInvestingTotalContainer: React.FC = () => {
  const [t] = useTranslation();
  const title = t("dashboard-page.investing.title");
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const data = useSelector(dashboardInvestmentsTotalSelector);
  useEffect(() => {
    dispatch(fetchDashboardInvestmentsTotalAction(currency));
  }, []);
  return (
    <DashboardBlock label={title}>
      <DashboardInvestingTotal
        currency={currency}
        loaderData={getTotalLoaderData()}
        data={data!}
      />
    </DashboardBlock>
  );
};

const DashboardInvestingTotalContainer = _DashboardInvestingTotalContainer;
export default DashboardInvestingTotalContainer;
