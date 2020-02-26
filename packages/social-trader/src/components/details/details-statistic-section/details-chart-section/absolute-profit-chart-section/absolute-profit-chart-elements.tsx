import ChartPeriod from "components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import {
  AbsoluteProfitChartDataType,
  ChartDataType,
  StatisticDataType
} from "components/details/details-statistic-section/details.chart.types";
import StatisticItem from "components/statistic-item/statistic-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import ChartCurrencySelector, {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { platformCurrenciesSelector } from "reducers/platform-reducer";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, HandlePeriodChangeType } from "utils/types";

import { useChartData } from "../../details.chart.helpers";

export const ABSOLUTE_PROFIT_CHART_TEST_ID = "ABSOLUTE_PROFIT_CHART_TEST_ID";

const _AbsoluteProfitChartElements: React.FC<Props> = ({
  renderChart,
  period,
  setPeriod,
  data,
  selectedCurrencies,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const [t] = useTranslation();
  const chartData = useChartData<AbsoluteProfitChartDataType>(
    data,
    selectedCurrencies
  );
  const platformCurrencies = useSelector(platformCurrenciesSelector);
  const { name, color } = chartData.selectedCurrencies[0];
  const { chart, profit } = chartData.chart;
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem big accent label={t("details-page.chart.value")}>
          <NumberFormat
            value={formatCurrencyValue(profit, name)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${name}`}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={setPeriod} period={period} />
      <ChartCurrencySelector
        fullSelectCurrencies={platformCurrencies.map(
          ({ name }) => name as CurrencyEnum
        )}
        maxCharts={1}
        selectCurrencies={selectCurrencies.map(({ name }) => name)}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div
        data-test-id={ABSOLUTE_PROFIT_CHART_TEST_ID}
        className="details-chart__profit"
      >
        {chart.length &&
          renderChart({
            chart: chart,
            currency: name,
            color
          })}
      </div>
    </>
  );
};

export type TRenderAbsoluteProfitValue = (props: {
  statistic: StatisticDataType;
}) => JSX.Element;

export type TRenderAbsoluteProfitChart = (props: {
  color: string;
  chart: ChartDataType;
  currency: CurrencyEnum;
}) => JSX.Element;

interface OwnProps {
  renderChart: TRenderAbsoluteProfitChart;
  renderValue: TRenderAbsoluteProfitValue;
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  data: AbsoluteProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const AbsoluteProfitChartElements = withBlurLoader(
  _AbsoluteProfitChartElements
);
export default AbsoluteProfitChartElements;
