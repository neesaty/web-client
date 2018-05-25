import { translate } from "react-i18next";
import React from "react";
import { connect } from "react-redux";

import FilterItem from "../../../../../../filter-pane/components/filter-item/filter-item";
import { Range, Handle } from "rc-slider";
import { RANGE_FILTER_TYPE } from "../../../../../../filtering/filtering.constants";
import { TOTAL_PROFIT_FILTER_NAME } from "../../../../../programs.constants";
const pointsCount = 5;

const mPointFromSPoint = x => x - 1;
const sPointFromMPoint = x => x + 1;

const sPoints = new Array(pointsCount).fill(0).map((x, idx) => idx);
const mPoints = sPoints.map(mPointFromSPoint);

const mPointValue = x => {
  if (x === 0) return 0;
  const value = 100 * Math.pow(10, Math.abs(x));
  return x > 0 ? value : -value;
};
const mPointFromMPointValue = x => {
  if (x === 0) return 0;
  const value = Math.abs(Math.log10(Math.abs(x) / 100));
  return Math.sign(x) * value;
};

const sPointValue = x => {
  const gap = 100 / (pointsCount - 1);
  return x * gap;
};
const sPointFromSPointValue = x => {
  const gap = 100 / (pointsCount - 1);
  return x / gap;
};

const formatValue = value => {
  if (value === 0) return 0;
  const suffixes = ["", "k", "M"];
  const power = Math.floor(Math.log10(Math.abs(value)) / Math.log10(1000));
  let formattedValue = +(value / Math.pow(1000, power)).toFixed(2);
  formattedValue += suffixes[power];
  return formattedValue;
};

const mPointsValues = mPoints.reduce((prev, curr) => {
  prev[sPointValue(sPointFromMPoint(curr))] = formatValue(mPointValue(curr));
  return prev;
}, {});

const getSValue = mValue => {
  const minMPoint = Math.floor(mPointFromMPointValue(mValue));
  const minMPointValue = mPointValue(minMPoint);
  const maxMPointValue = mPointValue(minMPoint + 1);
  const rate =
    minMPoint === mValue
      ? 1
      : (mValue - minMPointValue) / (maxMPointValue - minMPointValue);

  const gap = 100 / (pointsCount - 1);
  const minSPoint = sPointFromMPoint(minMPoint);
  return sPointValue(minSPoint) + gap * rate;
};
const getMValue = sValue => {
  const sPoint = sPointFromSPointValue(sValue);
  const minMPoint = mPointFromSPoint(Math.floor(sPoint));
  const rate = sPoint % 1;
  const minMPointValue = mPointValue(minMPoint);
  const maxMPointValue = mPointValue(minMPoint + 1);

  return +(minMPointValue + (maxMPointValue - minMPointValue) * rate).toFixed(
    2
  );
};

const getMValues = ([min, max]) => {
  return [getMValue(min), getMValue(max)];
};

const getSValues = ([min, max] = [undefined, undefined]) => {
  if (min === undefined || max === undefined) return undefined;
  return [getSValue(min), getSValue(max)];
};

const AvgProfitFilter = ({
  t,
  filtering,
  onFilterChange,
  minValue,
  maxValue
}) => {
  const handleFilterChange = value => {
    const mValues = getMValues(value);
    return onFilterChange(TOTAL_PROFIT_FILTER_NAME, RANGE_FILTER_TYPE)(value);
  };
  return (
    <FilterItem
      name={t(`programs-filtering.${TOTAL_PROFIT_FILTER_NAME}.name`)}
      description={t(
        `programs-filtering.${TOTAL_PROFIT_FILTER_NAME}.description`
      )}
      value={filtering.filters[TOTAL_PROFIT_FILTER_NAME]}
      defaultValue={[minValue, maxValue]}
      onFilterChange={handleFilterChange}
    >
      {(value, onChange) => (
        <Range
          // marks={mPointsValues}
          value={value}
          onChange={onChange}
          min={minValue}
          max={maxValue}
          pushable
          handle={props => (
            <div key={props.index}>
              <span
                className="gv-hangle__text"
                style={{
                  left: `${props.offset - 5}%`
                }}
              >
                {`${formatValue(props.value)}GVT`}
              </span>
              <Handle {...props} dragging="false" />
            </div>
          )}
        />
      )}
    </FilterItem>
  );
};

const mapStateToProps = ({
  platformData: {
    settings: { data = {} }
  }
}) => ({
  minValue: data.programsMinTotalProfit,
  maxValue: data.programsMaxTotalProfit
});

export default connect(mapStateToProps)(translate()(AvgProfitFilter));
