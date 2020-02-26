import "components/details/details-description-section/details-statistic-section/details-history/trades.scss";

import BaseProfitability from "components/profitability/base-profitability";
import Profitability from "components/profitability/profitability";
import { PROFITABILITY_PREFIX } from "components/profitability/profitability.helper";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UpdateItemsFuncType } from "components/table/components/table.types";
import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import { OrderSignalModel, TradesViewModel } from "gv-api-web";
import { ClosePositionButton } from "pages/invest/programs/program-details/program-history-section/program-open-positions/closePositionButton";
import React from "react";
import NumberFormat from "react-number-format";
import { formatDate } from "utils/dates";
import { formatValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

const _ProgramOpenPositionsRow: React.FC<Props> = ({
  updateItems,
  position,
  data: { showDate, showDirection, showPrice, showPriceOpen, showProfit }
}) => (
  <TableRow stripy>
    {showDate && <TableCell>{formatDate(position.date)}</TableCell>}
    <TableCell>{position.symbol}</TableCell>
    {showDirection && (
      <TableCell>
        <BaseProfitability
          isPositive={position.direction === "Buy"}
          isNegative={position.direction === "Sell"}
        >
          {position.direction}
        </BaseProfitability>
      </TableCell>
    )}
    <TableCell>
      <NumberFormat
        value={formatValue(position.volume, DEFAULT_DECIMAL_SCALE / 2)}
        displayType="text"
        thousandSeparator=" "
      />
    </TableCell>
    {showPrice && (
      <TableCell>
        <NumberFormat
          value={formatValue(position.price, DEFAULT_DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
    )}
    {showPriceOpen && (
      <TableCell>
        <NumberFormat
          value={formatValue(position.priceCurrent, DEFAULT_DECIMAL_SCALE)}
          displayType="text"
          thousandSeparator=" "
        />
      </TableCell>
    )}
    {showProfit && (
      <TableCell className="details-trades__cell--profit">
        <Profitability
          value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
          prefix={PROFITABILITY_PREFIX.SIGN}
        >
          <NumberFormat
            value={formatValue(position.profit, DEFAULT_DECIMAL_SCALE)}
            thousandSeparator=" "
            displayType="text"
            allowNegative={false}
            suffix={` ${position.profitCurrency}`}
          />
        </Profitability>
        <ClosePositionButton
          onApplyCancelRequest={updateItems}
          volume={position.volume}
          symbol={position.symbol}
          id={position.id}
        />
      </TableCell>
    )}
  </TableRow>
);

interface Props {
  updateItems?: UpdateItemsFuncType;
  data: TradesViewModel;
  currency: CurrencyEnum;
  position: OrderSignalModel;
}

const ProgramOpenPositionsRow = _ProgramOpenPositionsRow;
export default ProgramOpenPositionsRow;
