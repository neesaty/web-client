import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { ISelectChangeEvent } from "components/select/select";
import {
  AbsoluteProfitChart,
  AccountChartStatistic,
  AccountProfitPercentCharts,
  BalanceChartPoint,
  FundBalanceChart,
  FundChartStatistic,
  FundProfitPercentCharts,
  PlatformCurrencyInfo,
  ProgramBalanceChart,
  ProgramChartStatistic,
  ProgramProfitPercentCharts,
  SimpleChart,
  SimpleChartPoint
} from "gv-api-web";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector";
import { FundBalanceChartDataType } from "pages/funds/fund-details/reducers/balance-chart.reducer";
import { ProgramBalanceChartDataType } from "pages/programs/program-details/program-details.types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { platformCurrenciesSelector } from "reducers/platform-reducer";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { TSelectorData } from "utils/selectors";
import { CurrencyEnum, HandlePeriodChangeType } from "utils/types";

import { TStatisticCurrencyAction } from "../reducers/statistic-currency.reducer";
import {
  StatisticPeriodState,
  TStatisticPeriodAction
} from "../reducers/statistic-period.reducer";
import { DETAILS_CHART_TABS } from "./details-chart-section/details-chart";

export type TStatisticCurrencySelector = (state: RootState) => CurrencyEnum;

export type TBalanceChartSelector = (
  state: RootState
) => TSelectorData<BalanceChartDataType>;

export type TProfitChartSelector = (
  state: RootState
) => TSelectorData<ProfitChartDataType>;

export type TAbsoluteProfitChartSelector = (
  state: RootState
) => TSelectorData<AbsoluteProfitChartDataType>;

export type TUseChartStateValuesOutput = {
  selectedCurrencies: TChartCurrency[];
  selectCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
};
export type TUseChartStateValues = (
  view: DETAILS_CHART_TABS
) => TUseChartStateValuesOutput;

export type TUseChartPeriod = () => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};

type TUseChartPeriodCreator = (
  selector: (state: RootState) => StatisticPeriodState,
  action: (period: ChartDefaultPeriod) => TStatisticPeriodAction
) => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};
export const useChartPeriodCreator: TUseChartPeriodCreator = (
  selector,
  action
) => {
  const period = useSelector(selector);
  const dispatch = useDispatch();
  const setPeriod = useCallback(period => {
    dispatch(action(period));
  }, []);
  return {
    period,
    setPeriod
  };
};

type TChartData<T> = {
  chart: T;
  selectedCurrencies: TChartCurrency[];
};

export const useChartData = <T>(
  chart: T,
  selectedCurrencies: TChartCurrency[]
): TChartData<T> => {
  const [chartData, setChartData] = useState<TChartData<T>>({
    chart,
    selectedCurrencies
  });
  useEffect(() => {
    setChartData({
      chart,
      selectedCurrencies: [...selectedCurrencies]
    });
  }, [chart, selectedCurrencies]);
  return chartData;
};

export interface TGetChartArgs {
  currencies: CurrencyEnum[];
  id: string;
  period?: ChartDefaultPeriod;
}

export type ProfitChartType =
  | FundProfitPercentCharts
  | ProgramProfitPercentCharts
  | AccountProfitPercentCharts;

export type AbsoluteProfitChartType = AbsoluteProfitChart;
export type ProfitChartDataType = ProfitChartType;
export type AbsoluteProfitChartDataType = AbsoluteProfitChartType;
export type StatisticDataType =
  | ProgramChartStatistic
  | FundChartStatistic
  | AccountChartStatistic;
export type ChartsDataType = Array<SimpleChart>;
export type ChartDataType = Array<SimpleChartPoint>;

export type BalanceChartElementType = Array<BalanceChartPoint>;
export type BalanceChartType = FundBalanceChart | ProgramBalanceChart;
export type BalanceChartDataType =
  | FundBalanceChartDataType
  | ProgramBalanceChartDataType;

export const convertToChartCurrency = ({
  name,
  color
}: PlatformCurrencyInfo): TChartCurrency => ({
  name: name as CurrencyEnum,
  color
});

export const platformChartCurrenciesSelector = createSelector<
  RootState,
  PlatformCurrencyInfo[],
  TChartCurrency[]
>(
  state => platformCurrenciesSelector(state),
  currencies => currencies.map(convertToChartCurrency)
);

export type TGetChartFunc = (
  props: TGetChartArgs
) => (dispatch: Dispatch) => void;

type TUseFundChartStateDataMethods = {
  statisticCurrencyAction: (currency: CurrencyEnum) => TStatisticCurrencyAction;
  platformCurrencies: TChartCurrency[];
  absoluteProfitChart?: AbsoluteProfitChartDataType;
  profitChart?: ProfitChartDataType;
  balanceChart?: BalanceChartType;
  selectedCurrencies: TChartCurrency[];
  setSelectedCurrencies: (currencies: TChartCurrency[]) => void;
};
type TUseFundChartStateData = () => TUseFundChartStateDataMethods;
export type TUseFundChartStateDataCreator = (props: {
  view: DETAILS_CHART_TABS;
  statisticCurrencyAction: (currency: CurrencyEnum) => TStatisticCurrencyAction;
  profitChartSelector: (state: RootState) => TSelectorData<ProfitChartDataType>;
  absoluteProfitChartSelector: (
    state: RootState
  ) => TSelectorData<AbsoluteProfitChartDataType>;
  balanceChartSelector: (state: RootState) => TSelectorData<BalanceChartType>;
  statisticCurrencySelector: (state: RootState) => CurrencyEnum;
  idSelector: (state: RootState) => string;
  statisticPeriodSelector: (state: RootState) => ChartDefaultPeriod;
  getBalanceChart: TGetChartFunc;
  getProfitChart: TGetChartFunc;
  getAbsoluteProfitChart: TGetChartFunc;
}) => TUseFundChartStateDataMethods;
export const useChartStateDataCreator: TUseFundChartStateDataCreator = ({
  view,
  statisticCurrencyAction,
  absoluteProfitChartSelector,
  profitChartSelector,
  balanceChartSelector,
  statisticCurrencySelector,
  idSelector,
  statisticPeriodSelector,
  getBalanceChart,
  getAbsoluteProfitChart,
  getProfitChart
}) => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);
  const period = useSelector(statisticPeriodSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const platformCurrencies = useSelector(platformChartCurrenciesSelector);
  const absoluteProfitChart = useSelector(absoluteProfitChartSelector);
  const profitChart = useSelector(profitChartSelector);
  const balanceChart = useSelector(balanceChartSelector);
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >(platformCurrencies.filter(({ name }) => name === statisticCurrency));
  useEffect(() => {
    setSelectedCurrencies([
      ...platformCurrencies.filter(({ name }) => name === statisticCurrency),
      ...selectedCurrencies.slice(1, selectedCurrencies.length)
    ]);
  }, [statisticCurrency]);
  useEffect(() => {
    if (!selectedCurrencies.length || !id || !period) return;
    const currencies = selectedCurrencies.map(({ name }) => name);
    const opts = {
      id,
      period,
      currencies
    };
    dispatch(getProfitChart(opts));
    switch (view) {
      case DETAILS_CHART_TABS.ABSOLUTE_PROFIT:
        dispatch(getAbsoluteProfitChart(opts));
        break;
      case DETAILS_CHART_TABS.BALANCE:
        dispatch(getBalanceChart(opts));
    }
  }, [period, id, selectedCurrencies]);
  return {
    absoluteProfitChart,
    statisticCurrencyAction,
    platformCurrencies,
    profitChart,
    balanceChart,
    selectedCurrencies,
    setSelectedCurrencies
  };
};

type TUseFundChartStateValuesCreator = (
  useFundChartStateData: TUseFundChartStateDataMethods
) => TUseChartStateValuesOutput;
export const useFundChartStateValuesCreator: TUseFundChartStateValuesCreator = useFundChartStateData => {
  const dispatch = useDispatch();
  const {
    statisticCurrencyAction,
    platformCurrencies,
    selectedCurrencies,
    setSelectedCurrencies
  } = useFundChartStateData;
  const [selectCurrencies, setSelectCurrencies] = useState<TChartCurrency[]>(
    []
  );
  useEffect(() => {
    setSelectCurrencies(
      platformCurrencies.filter(
        ({ name }) =>
          !selectedCurrencies.find(currency => currency.name === name)
      )
    );
  }, [platformCurrencies, selectedCurrencies]);

  const addCurrency = useCallback(
    currency => {
      setSelectedCurrencies([
        ...selectedCurrencies,
        selectCurrencies.find(({ name }) => name === currency)!
      ]);
    },
    [selectedCurrencies, selectCurrencies]
  );
  const removeCurrency = useCallback(
    (name: string) => {
      setSelectedCurrencies([
        ...selectedCurrencies.filter(item => item.name !== name)
      ]);
    },
    [selectedCurrencies]
  );
  const changeCurrency = useCallback(
    (i: number) => (event: ISelectChangeEvent) => {
      const newSelectedCurrencies = selectedCurrencies.filter(
        ({ name }) => name !== event.target.value
      );
      newSelectedCurrencies[i] = platformCurrencies.find(
        ({ name }) => name === event.target.value
      )!;
      setSelectedCurrencies([...newSelectedCurrencies]);
      dispatch(statisticCurrencyAction(newSelectedCurrencies[0].name));
    },
    [selectedCurrencies, platformCurrencies, dispatch]
  );
  return {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  };
};
