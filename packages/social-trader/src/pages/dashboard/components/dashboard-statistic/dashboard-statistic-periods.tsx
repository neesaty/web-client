import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import Crashable from "decorators/crashable";
import { TDashboardTotalField } from "pages/dashboard/dashboard.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _DashboardStatisticPeriods: React.FC<Props> = ({
  currency,
  withProfitability,
  data: { day, week, month }
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.day")}
        item={day}
      />
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.week")}
        item={week}
      />
      <DashboardStatisticPeriodsItem
        currency={currency}
        withProfitability={withProfitability}
        label={t("dashboard-page.total.month")}
        item={month}
      />
    </StatisticItemList>
  );
};

interface Props {
  currency: CurrencyEnum;
  withProfitability?: boolean;
  data: {
    day: TDashboardTotalField;
    week: TDashboardTotalField;
    month: TDashboardTotalField;
  };
}

const _DashboardStatisticPeriodsItem: React.FC<{
  currency: CurrencyEnum;
  withProfitability?: boolean;
  item: TDashboardTotalField;
  label: string;
}> = ({ item: { profit, profitPercent }, label, currency }) => {
  return (
    <StatisticItem label={label}>
      <Profitability
        value={formatCurrencyValue(profit, currency)}
        prefix={PROFITABILITY_PREFIX.SIGN}
      >
        <NumberFormat
          value={formatCurrencyValue(profit, currency)}
          suffix={` ${currency}`}
          allowNegative={false}
          displayType="text"
        />
      </Profitability>
      {/*<ProfitabilityValuePercent
          currency={currency}
          percent={profitPercent}
          value={profit}
        />*/}
    </StatisticItem>
  );
};
export const DashboardStatisticPeriodsItem = React.memo(
  _DashboardStatisticPeriodsItem
);

const DashboardStatisticPeriods = React.memo(
  Crashable(_DashboardStatisticPeriods)
);
export default DashboardStatisticPeriods;
