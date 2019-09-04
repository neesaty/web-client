import "shared/components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import { OrderModel } from "gv-api-web";
import moment from "moment";
import React from "react";
import NumberFormat from "react-number-format";
import BaseProfitability from "shared/components/profitability/base-profitability";
import Profitability from "shared/components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "shared/components/profitability/profitability.helper";
import TableCell from "shared/components/table/components/table-cell";
import TableRow from "shared/components/table/components/table-row";
import Tooltip from "shared/components/tooltip/tooltip";
import { DEFAULT_DECIMAL_SCALE } from "shared/constants/constants";
import { formatValue } from "shared/utils/formatter";

const _ProgramTradesRow: React.FC<Props> = ({
  trade,
  showSwaps,
  showTickets
}) => {
  const volume = +formatValue(trade.volume, DEFAULT_DECIMAL_SCALE / 2);
  return (
    <TableRow stripy>
      <TableCell className="details-trades__cell program-details-trades__cell--direction/entry">
        <BaseProfitability
          isPositive={trade.direction === "Buy"}
          isNegative={trade.direction === "Sell"}
        >
          {trade.direction}
        </BaseProfitability>
        {` / ${trade.entry}`}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--symbol">
        {trade.symbol}
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--volume">
        <Tooltip
          disable={trade.volume >= volume}
          render={() => <div>{trade.volume}</div>}
        >
          <span>{trade.volume < volume ? `< ${volume}` : volume}</span>
        </Tooltip>
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--price">
        <NumberFormat
          value={formatValue(trade.price, DEFAULT_DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--profit">
        <Profitability
          value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(trade.profit, DEFAULT_DECIMAL_SCALE)}
            thousandSeparator=" "
            allowNegative={false}
            displayType="text"
          />
        </Profitability>
      </TableCell>
      <TableCell className="details-trades__cell program-details-trades__cell--commission">
        <Tooltip
          render={() =>
            trade.showOriginalCommission ? (
              <div>
                {`${formatValue(
                  trade.originalCommission,
                  DEFAULT_DECIMAL_SCALE
                )} ${trade.originalCommissionCurrency}`}
              </div>
            ) : (
              <div>
                {`${formatValue(trade.commission, DEFAULT_DECIMAL_SCALE)} ${
                  trade.originalCommissionCurrency
                }`}
              </div>
            )
          }
        >
          <NumberFormat
            value={formatValue(trade.commission, DEFAULT_DECIMAL_SCALE)}
            displayType="text"
            thousandSeparator=" "
          />
        </Tooltip>
      </TableCell>
      {showSwaps && (
        <TableCell className="details-trades__cell program-details-trades__cell--swap">
          {trade.swap}
        </TableCell>
      )}
      <TableCell className="details-trades__cell program-details-trades__cell--date">
        {moment(trade.date).format()}
      </TableCell>
      {showTickets && (
        <TableCell className="details-trades__cell program-details-trades__cell--ticket">
          {trade.ticket}
        </TableCell>
      )}
    </TableRow>
  );
};

interface Props {
  trade: OrderModel;
  showSwaps: boolean;
  showTickets: boolean;
}

const ProgramTradesRow = React.memo(_ProgramTradesRow);
export default ProgramTradesRow;
