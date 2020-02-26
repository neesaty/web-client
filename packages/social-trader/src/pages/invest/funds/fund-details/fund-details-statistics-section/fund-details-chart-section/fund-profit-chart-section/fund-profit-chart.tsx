import ProfitChart from "components/chart/profit-chart";
import {
  ChartAssetsType,
  ChartsDataType
} from "components/details/details-statistic-section/details.chart.types";
import Crashable from "decorators/crashable";
import { TChartCurrency } from "modules/chart-currency-selector/chart-currency-selector";
import * as React from "react";

import FundProfitTooltip from "./fund-profit-tooltip";

const _FundProfitChart: React.FC<Props> = ({
  assets,
  profitChart,
  chartCurrencies = []
}) => {
  const equityCharts = profitChart.map(chart => chart.chart);
  return (
    <ProfitChart
      equityCharts={equityCharts}
      tooltip={FundProfitTooltip}
      equities={[assets, ...equityCharts]}
      colors={[chartCurrencies[0], ...chartCurrencies]}
    />
  );
};

interface Props {
  assets: ChartAssetsType;
  profitChart: ChartsDataType;
  chartCurrencies?: TChartCurrency[];
}

const FundProfitChart = Crashable(_FundProfitChart);
export default FundProfitChart;
