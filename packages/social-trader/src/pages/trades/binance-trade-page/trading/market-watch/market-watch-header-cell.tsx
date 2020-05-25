import classNames from "classnames";
import { MutedText } from "components/muted-text/muted-text";
import {
  SORTING_DIRECTION,
  switchDirection
} from "components/table/helpers/sorting.helpers";
import { SortingType } from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useCallback } from "react";

import styles from "./market-watch.module.scss";

interface Props {
  dataType: "number" | "string";
  setSorting: (sorting: SortingType) => void;
  field: keyof MergedTickerSymbolType;
  sorting: SortingType;
}

export const MarketWatchHeaderCell: React.FC<Props> = React.memo(
  ({ dataType, field, sorting, children, setSorting }) => {
    const handleChangeSorting = useCallback(
      (field: keyof MergedTickerSymbolType) => () => {
        const direction =
          field !== sorting.field
            ? sorting.direction
            : switchDirection(sorting.direction);
        setSorting({ dataType, field, direction });
      },
      [setSorting, sorting, dataType]
    );
    const isSelected = field === sorting.field;
    return (
      <th
        className={classNames(styles["market-watch__th"])}
        onClick={handleChangeSorting(field)}
      >
        <span
          className={classNames({
            [styles["market-watch__th--asc"]]:
              isSelected && sorting.direction === SORTING_DIRECTION.ASC,
            [styles["market-watch__th--desc"]]:
              isSelected && sorting.direction === SORTING_DIRECTION.DESC
          })}
        >
          <MutedText small> {children}</MutedText>
        </span>
      </th>
    );
  }
);