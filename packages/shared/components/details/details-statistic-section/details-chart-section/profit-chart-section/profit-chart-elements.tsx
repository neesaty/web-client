import * as React from "react";
import { useSelector } from "react-redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { withBlurLoader } from "shared/decorators/with-blur-loader";
import ChartCurrencySelector, {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import {
  ChartsDataType,
  ProfitChartDataType,
  StatisticDataType,
  useChartData
} from "../../details.chart.helpers";

const _ProfitChartElements: React.FC<Props> = ({
  renderProfitChart,
  renderProfitValue,
  period,
  setPeriod,
  data,
  selectedCurrencies,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const chartData = useChartData<ProfitChartDataType>(data, selectedCurrencies);
  const platformCurrencies = useSelector(platformCurrenciesSelector);
  const { statistic, charts } = chartData.chart;
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem big accent>
          {renderProfitValue({ statistic })}
        </StatisticItem>
      </div>
      <ChartPeriod onChange={setPeriod} period={period} />
      <ChartCurrencySelector
        fullSelectCurrencies={platformCurrencies.map(
          ({ name }) => name as CurrencyEnum
        )}
        maxCharts={
          selectCurrencies.length + chartData.selectedCurrencies.length
        }
        selectCurrencies={selectCurrencies.map(({ name }) => name)}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div className="details-chart__profit">
        {charts.length &&
          renderProfitChart({
            profitChart: charts,
            chartCurrencies: chartData.selectedCurrencies
          })}
      </div>
    </>
  );
};

export type TRenderProfitValue = (props: {
  statistic: StatisticDataType;
}) => JSX.Element;

export type TRenderProfitChart = (props: {
  profitChart: ChartsDataType;
  chartCurrencies?: TChartCurrency[];
}) => JSX.Element;

interface OwnProps {
  renderProfitChart: TRenderProfitChart;
  renderProfitValue: TRenderProfitValue;
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  data: ProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const ProfitChartElements = withBlurLoader(React.memo(_ProfitChartElements));
export default ProfitChartElements;
