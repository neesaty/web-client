import { ProgramInvestingDetailsList } from "gv-api-web";
import { useAccountCurrency } from "hooks/account-currency.hook";
import {
  fetchDashboardInvestmentsProgramsAction,
  fetchDashboardInvestmentsTotalAction
} from "pages/dashboard/actions/dashboard.actions";
import DashboardInvestingTable from "pages/dashboard/components/dashboard-investing/dashboard-investing-table";
import DashboardProgramCard from "pages/dashboard/components/dashboard-investing/dashboard-program-card";
import { dashboardInvestmentsProgramsSelector } from "pages/dashboard/reducers/dashboard-investments-programs.reducer";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _DashboardInvestingPrograms: React.FC = () => {
  const dispatch = useDispatch();
  const currency = useAccountCurrency();
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
      dataSelector={dashboardInvestmentsProgramsSelector}
      action={fetchDashboardInvestmentsProgramsAction}
      title={t("dashboard-page.investing.programs")}
      renderBodyCard={(
        program: ProgramInvestingDetailsList,
        updateRow,
        updateItems
      ) => (
        <DashboardProgramCard
          updateRow={handleUpdateItems(updateRow)}
          updateItems={handleUpdateItems(updateItems)!}
          program={program}
        />
      )}
    />
  );
};

const DashboardInvestingPrograms = React.memo(_DashboardInvestingPrograms);
export default DashboardInvestingPrograms;
