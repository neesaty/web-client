import "shared/components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import DetailsStatisticSection from "shared/components/details/details-statistic-section/details-statistic-section";
import { formatCurrencyValue } from "shared/utils/formatter";

import { statisticDataLoaderData } from "../program-details.loader-data";
import { programBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { programStatusSelector } from "../reducers/description.reducer";
import { programProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import ProgramBalanceChart from "./program-details-chart-section/program-balance-chart-section/program-balance-chart";
import {
  useChartPeriod,
  useProgramChartStateValues
} from "./program-details-chart-section/program-details.chart.helpers";
import ProgramProfitChart from "./program-details-chart-section/program-profit-chart-section/program-profit-chart";
import ProgramDetailsStatisticsElements, {
  IProgramStatisticData
} from "./program-details-statistics/program-details-statistics-elements";

const _ProgramDetailsStatisticSection: React.FC = () => {
  const status = useSelector(programStatusSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  return (
    <DetailsStatisticSection
      balanceChartSelector={programBalanceChartSelector}
      profitChartSelector={programProfitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartStateValues={useProgramChartStateValues}
      useChartPeriod={useChartPeriod}
      renderProfitValue={({ statistic }) => {
        return (
          <NumberFormat
            value={formatCurrencyValue(
              "profit" in statistic ? statistic.profit : 0,
              statisticCurrency
            )}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${statisticCurrency}`}
          />
        );
      }}
      renderBalanceChart={({ color, currency, balanceChart }) => (
        <ProgramBalanceChart
          color={color}
          balanceChart={balanceChart}
          currency={currency}
        />
      )}
      renderProfitChart={({ profitChart, chartCurrencies }) => (
        <ProgramProfitChart charts={profitChart} colors={chartCurrencies} />
      )}
      renderDetailsStatisticsElements={({ period, statisticData }) => {
        return (
          <ProgramDetailsStatisticsElements
            loaderData={statisticDataLoaderData}
            status={status}
            data={statisticData! as IProgramStatisticData}
            period={period}
          />
        );
      }}
    />
  );
};

const ProgramDetailsStatisticSection = React.memo(
  _ProgramDetailsStatisticSection
);
export default ProgramDetailsStatisticSection;
