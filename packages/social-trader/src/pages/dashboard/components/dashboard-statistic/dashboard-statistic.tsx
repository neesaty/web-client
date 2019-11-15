import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import DashboardStatisticTable from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-table";
import React from "react";
import { StatisticItemList } from "shared/components/statistic-item-list/statistic-item-list";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import { CurrencyEnum } from "shared/utils/types";

import {
  TDashboardInvestingStatistic,
  TDashboardTradingStatistic
} from "../../dashboard.types";

const _DashboardStatistic: React.FC<Props> = ({
  EmptyBlock,
  renderValues,
  data,
  currency
}) => {
  const {
    events,
    profits,
    assetsUnderManagement,
    programsCount,
    fundsCount
  } = data;
  const hasNotInvesting =
    programsCount !== undefined && fundsCount !== undefined
      ? !(programsCount && fundsCount)
      : true;
  const hasNotTrading =
    assetsUnderManagement !== undefined ? !assetsUnderManagement : true;
  const hasNotAssets = hasNotInvesting && hasNotTrading;
  if (hasNotAssets) return <EmptyBlock />;
  return (
    <div>
      <div className="dashboard-statistic__values">
        <StatisticItemList>{renderValues(data)}</StatisticItemList>
        <DashboardStatisticPeriods currency={currency} data={profits} />
      </div>
      <DashboardStatisticTable currency={currency} data={events.items} />
    </div>
  );
};

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  EmptyBlock: React.ComponentType;
  currency: CurrencyEnum;
  data: TDashboardTradingStatistic & TDashboardInvestingStatistic;
  renderValues: (
    statistic: TDashboardTradingStatistic & TDashboardInvestingStatistic
  ) => JSX.Element;
}

const DashboardStatistic = withBlurLoader(React.memo(_DashboardStatistic));
export default DashboardStatistic;
