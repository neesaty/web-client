import DashboardValueItem from "pages/dashboard/components/dashboard-statistic/dashboard-value-item";
import React from "react";
import { useTranslation } from "react-i18next";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import { withBlurLoader } from "shared/decorators/with-blur-loader";

import { TTradingTotal } from "../../dashboard.types";

const _DashboardTradingTotal: React.FC<Props> = ({
  data: { equity, total, AUM }
}) => {
  const [t] = useTranslation();
  return (
    <div className="dashboard-trading__values">
      <StatisticItemList>
        <DashboardValueItem
          label={t("dashboard-page.statistic.total")}
          value={total}
          currency={"GVT"}
        />
        <DashboardValueItem
          label={t("dashboard-page.statistic.equity")}
          value={equity}
          currency={"GVT"}
        />
        <DashboardValueItem
          label={t("dashboard-page.statistic.AUM")}
          value={AUM}
          currency={"GVT"}
        />
      </StatisticItemList>
    </div>
  );
};

interface Props {
  data: TTradingTotal;
}

const DashboardTradingTotal = withBlurLoader(
  React.memo(_DashboardTradingTotal)
);
export default DashboardTradingTotal;
