import "./program-trades.scss";

import Profitability from "components/profitability/profitability";
import { TableCell, TableHeadCell, TableRow } from "modules/table/components";
import DateRangeFilter from "modules/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "modules/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableModule from "modules/table/components/table-module";
import { DEFAULT_PAGING } from "modules/table/reducers/table-paging.reducer";
import moment from "moment";
import { PROGRAM_DETAILS_ROUTE } from "pages/programs/programs.routes";
import React, { Component, Fragment } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { compose } from "redux";
import getParams from "utils/get-params";

import {
  PROGRAM_TRADES_COLUMNS,
  PROGRAM_TRADES_FILTERS,
  PROGRAM_TRADES_SORTING
} from "../../../program-details.constants";
import * as service from "../../../services/program-details.service";

const programTradesFiltering = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

class ProgramTrades extends Component {
  fetchProgramTrades = filters => {
    const { programId, currentCurrency } = this.props;

    return service.fetchProgramTrades({ programId, currentCurrency, filters });
  };

  render() {
    const { t } = this.props;
    const { fetchProgramTrades } = this;

    return (
      <TableModule
        defaultFilters={PROGRAM_TRADES_FILTERS}
        getItems={fetchProgramTrades}
        filtering={programTradesFiltering}
        sorting={PROGRAM_TRADES_SORTING}
        renderFilters={(updateFilter, filtering) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
            />
          </Fragment>
        )}
        paging={DEFAULT_PAGING}
        columns={PROGRAM_TRADES_COLUMNS}
        renderHeader={({ column, sortingName, isAsc }) => (
          <TableHeadCell
            key={column.name}
            className={`program-details-trades__head-cell program-details-trades__cell--${
              column.name
            }`}
            sortable={false}
            active={false}
          >
            {t(`program-details-page.history.trades.${column.name}`)}
          </TableHeadCell>
        )}
        renderBodyRow={trade => (
          <TableRow className="program-details-trades__row">
            <TableCell className="program-details-trades__cell program-details-trades__cell--direction">
              <Profitability
                isPositive={trade.direction === "Buy"}
                isNegative={trade.direction === "Sell"}
              >
                {trade.direction}
              </Profitability>
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--symbol">
              {trade.symbol}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--volume">
              <NumberFormat
                value={trade.volume}
                decimalScale={2}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--price">
              <NumberFormat
                value={trade.price}
                decimalScale={5}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--profit">
              <Profitability value={trade.profit}>
                <NumberFormat
                  value={Math.abs(trade.profit)}
                  decimalScale={2}
                  displayType="text"
                />
              </Profitability>
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--date">
              {moment(trade.date).format("DD-MM-YYYY, hh:mm a")}
            </TableCell>
            <TableCell className="program-details-trades__cell program-details-trades__cell--ticket">
              {trade.ticket}
            </TableCell>

            <TableCell className="program-details-trades__cell program-details-trades__cell--entry">
              {trade.entry}
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  const { routing, accountSettings } = state;

  return {
    programId: getParams(routing.location.pathname, PROGRAM_DETAILS_ROUTE)
      .programId,
    currentCurrency: accountSettings.currentCurrency
  };
};

export default compose(
  translate(),
  connect(mapStateToProps)
)(ProgramTrades);
