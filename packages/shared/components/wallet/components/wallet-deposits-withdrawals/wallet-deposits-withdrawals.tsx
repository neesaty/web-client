import "./wallet-deposits-withdrawals.scss";

import React, { RefObject } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { compose } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import {
  DATE_RANGE_FILTER_NAME,
  DEFAULT_DATE_RANGE_FILTER_VALUE
} from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { composeDefaultDateRangeFilter } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.helpers";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TableModule from "shared/components/table/components/table-module";
import {
  GetItemsFuncType,
  RenderBodyItemFuncType
} from "shared/components/table/components/table.types";
import { FILTER_TYPE } from "shared/components/table/helpers/filtering.helpers";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { reduceFilters } from "shared/components/wallet/components/wallet-transactions/wallet-transaction-type-filter.helpers";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import RootState from "shared/reducers/root-reducer";

import { WalletLastUpdateState } from "../../reducers/wallet-last-update";
import { fetchMultiTransactionsExternal } from "../../services/wallet.services";
import { TRANSACTIONS_TYPE } from "../wallet-transactions/wallet-transactions.constants";

const TRANSACTIONS_FILTERS = {
  dateRange: DEFAULT_DATE_RANGE_FILTER_VALUE
};

const DEFAULT_FILTERS = [
  { ...composeDefaultDateRangeFilter() },
  {
    name: "type",
    type: FILTER_TYPE.GENERAL
  }
];

class _WalletDepositsWithdrawals extends React.PureComponent<Props> {
  ref: RefObject<TableModule> = React.createRef();

  componentDidUpdate(prevProps: Props) {
    if (this.props.timestamp !== prevProps.timestamp) {
      this.ref.current!.updateItems();
    }
  }

  fetchMultiTransactionsExternal: GetItemsFuncType = filters => {
    return fetchMultiTransactionsExternal(this.props.currency, filters);
  };

  render() {
    const { t, renderBodyRow, columns, typeFilterValues } = this.props;
    return (
      <div className="wallet-deposits-withdrawals">
        <TableModule
          ref={this.ref}
          defaultFilters={DEFAULT_FILTERS}
          paging={DEFAULT_PAGING}
          filtering={{
            ...TRANSACTIONS_FILTERS,
            type: typeFilterValues[0]
          }}
          getItems={this.fetchMultiTransactionsExternal}
          renderFilters={(updateFilter, filtering) => (
            <>
              <SelectFilter
                name={"type"}
                label="Type"
                value={filtering["type"] as SelectFilterType} //TODO fix filtering types
                values={reduceFilters(typeFilterValues)}
                onChange={updateFilter}
              />
              <DateRangeFilter
                name={DATE_RANGE_FILTER_NAME}
                value={filtering["dateRange"]}
                onChange={updateFilter}
                startLabel={t("filters.date-range.account-creation")}
              />
            </>
          )}
          columns={columns}
          renderHeader={column => (
            <span
              className={`wallet-deposits-withdrawals__cell wallet-deposits-withdrawals__cell--${
                column.name
              }`}
            >
              {t(`wallet-page.deposits-withdrawals.${column.name}`)}
            </span>
          )}
          renderBodyRow={renderBodyRow}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  timestamp: state.wallet.lastUpdate.timestamp
});

interface Props extends OwnProps, StateProps, InjectedTranslateProps {}

interface OwnProps {
  renderBodyRow: RenderBodyItemFuncType;
  columns: SortingColumn[];
  typeFilterValues: Array<TRANSACTIONS_TYPE | string>;
  currency?: CURRENCIES;
}

interface StateProps extends WalletLastUpdateState {}

const WalletDepositsWithdrawals = compose<React.ComponentType<OwnProps>>(
  translate(),
  connect(mapStateToProps)
)(_WalletDepositsWithdrawals);
export default WalletDepositsWithdrawals;
