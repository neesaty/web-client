import "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.scss";

import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import DetailsStatisticsElements from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics-elements";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { withBlurLoader } from "decorators/with-blur-loader";
import { ProgramChartStatistic } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue, formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _AccountDetailsStatisticsElements: React.FC<IAccountDetailsStatisticsElementsProps> = ({
  data: { statistic, statisticCurrency },
  period
}) => {
  const [t] = useTranslation();
  return (
    <DetailsStatisticsElements
      Current={() => (
        <StatisticItem
          label={
            <TooltipLabel
              tooltipContent={t("program-details-page.tooltip.equity")}
              labelText={t("program-details-page.statistics.equity")}
            />
          }
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(statistic.balance, statisticCurrency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${statisticCurrency}`}
          />
        </StatisticItem>
      )}
      Particular={() => (
        <>
          <div className="details-statistics__column">
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t("program-details-page.tooltip.trades")}
                  labelText={t("program-details-page.statistics.trades")}
                />
              }
              half
            >
              <NumberFormat
                value={statistic.trades !== undefined ? statistic.trades : "-"}
                thousandSeparator={" "}
                displayType="text"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.profit-factor"
                  )}
                  labelText={t("program-details-page.statistics.profit-factor")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.profitFactor !== undefined
                    ? formatValue(statistic.profitFactor, 2)
                    : "-"
                }
                displayType="text"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.max-drawdown"
                  )}
                  labelText={t("program-details-page.statistics.max-drawdown")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.maxDrawdown !== undefined
                    ? formatValue(statistic.maxDrawdown, 2)
                    : "-"
                }
                displayType="text"
                suffix="%"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.statistics.tooltip.trading-volume"
                  )}
                  labelText={t(
                    "program-details-page.statistics.trading-volume"
                  )}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.tradingVolume !== undefined
                    ? formatCurrencyValue(
                        statistic.tradingVolume,
                        statisticCurrency
                      )
                    : "-"
                }
                displayType="text"
                suffix={` ${statisticCurrency}`}
              />
            </StatisticItem>
          </div>
          <div className="details-statistics__column">
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.success-trades"
                  )}
                  labelText={t(
                    "program-details-page.statistics.success-trades"
                  )}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.successTradesPercent !== undefined
                    ? formatValue(statistic.successTradesPercent, 2)
                    : "-"
                }
                displayType="text"
                suffix="%"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.sharpe-ratio"
                  )}
                  labelText={t("program-details-page.statistics.sharpe-ratio")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.sharpeRatio !== undefined
                    ? formatValue(statistic.sharpeRatio, 2)
                    : "-"
                }
                displayType="text"
              />
            </StatisticItem>
            <StatisticItem
              label={
                <TooltipLabel
                  tooltipContent={t(
                    "program-details-page.tooltip.sortino-ratio"
                  )}
                  labelText={t("program-details-page.statistics.sortino-ratio")}
                />
              }
              half
            >
              <NumberFormat
                value={
                  statistic.sortinoRatio !== undefined
                    ? formatValue(statistic.sortinoRatio, 2)
                    : "-"
                }
                displayType="text"
              />
            </StatisticItem>
          </div>
        </>
      )}
      periodType={period.type}
    />
  );
};

export interface IAccountStatisticData {
  statisticCurrency: CurrencyEnum;
  statistic: ProgramChartStatistic;
}

export interface IAccountDetailsStatisticsElementsProps {
  status: string;
  period: ChartDefaultPeriod;
  data: IAccountStatisticData;
}

const AccountDetailsStatisticsElements = withBlurLoader(
  _AccountDetailsStatisticsElements
);
export default AccountDetailsStatisticsElements;
