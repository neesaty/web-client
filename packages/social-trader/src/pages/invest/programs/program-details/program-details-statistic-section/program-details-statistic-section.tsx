import "components/details/details-description-section/details-statistic-section/details-statistic-section.scss";

import DetailsStatisticSection from "components/details/details-statistic-section/details-statistic-section";
import dynamic from "next/dist/next-server/lib/dynamic";
import { programAbsoluteProfitChartSelector } from "pages/invest/programs/program-details/reducers/absolute-profit-chart.reducer";
import * as React from "react";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { formatCurrencyValue } from "utils/formatter";

import { statisticDataLoaderData } from "../program-details.loader-data";
import { programBalanceChartSelector } from "../reducers/balance-chart.reducer";
import { programStatusSelector } from "../reducers/description.reducer";
import { programProfitChartSelector } from "../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../reducers/statistic-currency.reducer";
import {
  useChartPeriod,
  useProgramChartStateValues
} from "./program-details-chart-section/program-details.chart.helpers";
import ProgramDetailsStatisticsElements, {
  IProgramStatisticData
} from "./program-details-statistics/program-details-statistics-elements";

const ProgramBalanceChart = dynamic(() =>
  import(
    "./program-details-chart-section/program-balance-chart-section/program-balance-chart"
  )
);
const ProgramAbsoluteProfitChart = dynamic(() =>
  import(
    "pages/invest/programs/program-details/program-details-statistic-section/program-details-chart-section/program-absolute-profit-chart-section/program-absolute-profit-chart"
  )
);
const ProgramProfitChart = dynamic(() =>
  import(
    "pages/invest/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-chart"
  )
);

const _ProgramDetailsStatisticSection: React.FC = () => {
  const status = useSelector(programStatusSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  return (
    <DetailsStatisticSection
      absoluteProfitChartSelector={programAbsoluteProfitChartSelector}
      balanceChartSelector={programBalanceChartSelector}
      profitChartSelector={programProfitChartSelector}
      statisticCurrencySelector={statisticCurrencySelector}
      useChartStateValues={useProgramChartStateValues}
      useChartPeriod={useChartPeriod}
      renderProfitValue={({ statistic }) => {
        return (
          <NumberFormat
            value={formatCurrencyValue(
              "profitPercent" in statistic ? statistic.profitPercent : 0,
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
      renderAbsoluteProfitChart={({ color, currency, chart }) => (
        <ProgramAbsoluteProfitChart
          color={color}
          chart={chart}
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

const ProgramDetailsStatisticSection = _ProgramDetailsStatisticSection;
export default ProgramDetailsStatisticSection;
