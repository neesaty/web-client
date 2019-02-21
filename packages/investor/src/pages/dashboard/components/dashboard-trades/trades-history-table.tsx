import { OpenSignalTrade, OrderSignalSlaveModel } from "gv-api-web";
import { GVButton } from "gv-react-components";
import moment from "moment";
import React, { Component, ComponentType, Fragment } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Action, Dispatch, bindActionCreators, compose } from "redux";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import ProfileAvatar from "shared/components/avatar/profile-avatar/profile-avatar";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { TableCell } from "shared/components/table/components";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "shared/components/table/components/table-container";
import TableRow from "shared/components/table/components/table-row";
import { Column } from "shared/components/table/components/table.types";
import { IUpdateFilterFunc } from "shared/components/table/components/table.types";
import { composeManagerDetailsUrl } from "shared/utils/compose-url";
import { formatValue } from "shared/utils/formatter";
import { formatPercent } from "shared/utils/formatter";

import { clearDashboardTradesTable } from "../../actions/dashboard.actions";
import { getDashboardTradesHistory } from "../../services/dashboard-trades.service";
import { DASHBOARD_TRADES_HISTORY_COLUMNS } from "./dashboard-trades.constants";
import { dashboardTradesHistoryTableSelector } from "./dashboard-trades.selectors";

interface ITradesHistoryTableOwnProps {
  title: string;
}

interface ITradesHistoryDispatchProps {
  service: {
    clearDashboardTradesTable(): void;
  };
}

class TradesHistoryTable extends Component<
  ITradesHistoryTableOwnProps &
    InjectedTranslateProps &
    ITradesHistoryDispatchProps
> {
  componentWillUnmount() {
    this.props.service.clearDashboardTradesTable();
  }
  render() {
    const { t, title } = this.props;
    return (
      <TableContainer
        getItems={getDashboardTradesHistory}
        dataSelector={dashboardTradesHistoryTableSelector}
        isFetchOnMount={true}
        columns={DASHBOARD_TRADES_HISTORY_COLUMNS}
        renderFilters={(updateFilter: IUpdateFilterFunc, filtering: any) => (
          <Fragment>
            <DateRangeFilter
              name={DATE_RANGE_FILTER_NAME}
              value={filtering[DATE_RANGE_FILTER_NAME]}
              onChange={updateFilter}
              startLabel={t("filters.date-range.program-start")}
            />
          </Fragment>
        )}
        renderHeader={(column: Column) =>
          t(`investor.dashboard-page.trades-history-header.${column.name}`)
        }
        renderBodyRow={(signalTrade: OrderSignalSlaveModel) => (
          <TableRow>
            {/* <TableCell className="programs-table__cell dashboard-programs__cell--title">
              <div className="dashboard-programs__cell--avatar-title">
                <Link
                  to={{
                    pathname: composeProgramDetailsUrl(signalTrade.programUrl),
                    state: `/ ${title}`
                  }}
                >
                  <AssetAvatar
                    url={signalTrade.programLogo}
                    alt={signalTrade.programTitle}
                    color={signalTrade.programColor}
                  />
                </Link>
                <Link
                  to={{
                    pathname: composeProgramDetailsUrl(signalTrade.programUrl),
                    state: `/ ${title}`
                  }}
                >
                  <GVButton variant="text" color="secondary">
                    {signalTrade.programTitle}
                  </GVButton>
                </Link>
              </div>
            </TableCell> */}
            <TableCell className="managers-table__cell--username">
              <ProfileAvatar
                url={signalTrade.manager.avatar}
                alt={signalTrade.manager.username}
              />
              <Link
                to={{
                  pathname: composeManagerDetailsUrl(signalTrade.manager.url),
                  state: `/ ${title}`
                }}
              >
                <GVButton variant="text" color="secondary">
                  {signalTrade.manager.username}
                </GVButton>
              </Link>
            </TableCell>
            <TableCell>
              <BaseProfitability
                isPositive={signalTrade.direction === "Buy"}
                isNegative={signalTrade.direction === "Sell"}
              >
                {signalTrade.direction}
              </BaseProfitability>
            </TableCell>
            {/* <TableCell>{moment(signalTrade.openDate).format("lll")}</TableCell>
            <TableCell>{moment(signalTrade.closeDate).format("lll")}</TableCell> */}
            <TableCell>{signalTrade.symbol}</TableCell>
            <TableCell>
              <NumberFormat
                value={formatValue(signalTrade.volume)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            {/* <TableCell>
              <NumberFormat
                value={formatValue(signalTrade.openPrice)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell>
            <TableCell>
              <NumberFormat
                value={formatValue(signalTrade.closePrice)}
                displayType="text"
                thousandSeparator=" "
              />
            </TableCell> */}
            <TableCell>
              <Profitability
                value={+formatValue(signalTrade.profit)}
                prefix="sign"
              >
                <NumberFormat
                  value={formatPercent(signalTrade.profit)}
                  thousandSeparator=" "
                  displayType="text"
                  suffix=" %"
                />
              </Profitability>
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  service: bindActionCreators({ clearDashboardTradesTable }, dispatch)
});

export default compose<ComponentType<ITradesHistoryTableOwnProps>>(
  translate(),
  connect(
    null,
    mapDispatchToProps
  )
)(TradesHistoryTable);
