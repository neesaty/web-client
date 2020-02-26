import "./chart-period.scss";

import classNames from "classnames";
import GVButton from "components/gv-button";
import { MutedText } from "components/muted-text/muted-text";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { localizedDate } from "utils/dates";
import { HandlePeriodChangeType } from "utils/types";

import {
  ChartDefaultPeriod,
  ChartPeriodType,
  ChartPeriodTypeValues,
  getPeriodStartDate,
  TChartPeriod
} from "./chart-period.helpers";

const _ChartPeriod: React.FC<Props> = ({ period, onChange }) => {
  const { type, start } = period;
  const { t } = useTranslation();
  const handleChangePeriod = useCallback(
    (newPeriodType: TChartPeriod) => () => {
      const start = getPeriodStartDate(newPeriodType);
      onChange({ type: newPeriodType, start });
    },
    []
  );
  return (
    <div className="chart-period">
      <MutedText>
        {ChartPeriodTypeValues.map(period => (
          <GVButton
            testId={t(`chart-period.${ChartPeriodType[period]}-short`)}
            noPadding
            key={period}
            className={classNames("chart-period__period-item", {
              "chart-period__period-item--active": type === period
            })}
            onClick={handleChangePeriod(period)}
            variant="text"
            color="secondary"
            disabled={type === period}
          >
            {t(`chart-period.${ChartPeriodType[period]}-short`)}
          </GVButton>
        ))}
      </MutedText>
      <MutedText bold>
        {type !== ChartPeriodType.all && (
          <ChartPeriodDateLabel start={start!} />
        )}
      </MutedText>
    </div>
  );
};

const ChartPeriodDateLabel: React.FC<{ start: Date }> = ({ start }) => {
  return (
    <span>
      {localizedDate(start)} - {localizedDate(new Date())}
    </span>
  );
};

interface Props {
  period: ChartDefaultPeriod;
  onChange: HandlePeriodChangeType;
}

const ChartPeriod = _ChartPeriod;
export default ChartPeriod;
