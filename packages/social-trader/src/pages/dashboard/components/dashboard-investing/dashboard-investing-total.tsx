import "./dashboard-investing.scss";

import { withBlurLoader } from "decorators/with-blur-loader";
import { DashboardInvestingCounts } from "pages/dashboard/components/dashboard-statistic/dashboard-investing-counts";
import DashboardStatisticPeriods from "pages/dashboard/components/dashboard-statistic/dashboard-statistic-periods";
import React from "react";
import { CurrencyEnum } from "utils/types";

import { TDashboardInvestingStatistic } from "../../dashboard.types";

const _DashboardInvestingTotal: React.FC<Props> = ({
  currency,
  data: { profits, equity, fundsCount, programsCount }
}) => {
  const hasProfits =
    Object.values(profits)
      .map(({ profit }) => profit)
      .reduce((prev, cur) => prev + cur, 0) !== 0;
  return (
    <div className="dashboard-investing__values">
      <DashboardInvestingCounts
        balance={equity}
        currency={currency}
        programs={programsCount}
        funds={fundsCount}
      />
      {hasProfits && (
        <DashboardStatisticPeriods
          data={profits}
          currency={currency}
          withProfitability
        />
      )}
    </div>
  );
};

interface Props {
  currency: CurrencyEnum;
  data: TDashboardInvestingStatistic;
}

const DashboardInvestingTotal = withBlurLoader(_DashboardInvestingTotal);
export default DashboardInvestingTotal;
