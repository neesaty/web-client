import GlobalSearchInput from "components/global-search/components/global-search-result/global-search-input";
import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Select, { ISelectChangeEvent } from "components/select/select";
import { SORTING_DIRECTION } from "components/table/helpers/sorting.helpers";
import { MarketWatchHeaderCell } from "pages/trades/binance-trade-page/trading/market-watch/market-watch-header-cell";
import { MarketWatchRow } from "pages/trades/binance-trade-page/trading/market-watch/market-watch-row";
import {
  CHANGE_COLUMN,
  COLUMN_VALUES,
  filterForSearch,
  FILTERING_CURRENCIES,
  FilteringType,
  FilteringVariant,
  getFilteringFunction,
  SortingType,
  sortMarketWatchItems
} from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { MergedTickerSymbolType } from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useContext, useMemo, useState } from "react";

import styles from "./market-watch.module.scss";

interface Props {
  items: MergedTickerSymbolType[];
}

const _MarketWatch: React.FC<Props> = ({ items }) => {
  const { terminalType } = useContext(TerminalInfoContext);
  const [column, setColumn] = useState<string>(CHANGE_COLUMN);
  const [search, setSearch] = useState<string>("");
  const initFiltering = terminalType === "spot" ? "margin" : undefined;
  const [filteringType, setFilteringType] = useState<FilteringVariant>(
    initFiltering
  );
  const [sorting, setSorting] = useState<SortingType>({
    dataType: "string",
    direction: SORTING_DIRECTION.ASC,
    field: "symbol"
  });
  const [filtering, setFiltering] = useState<FilteringType>({
    field: "symbol",
    value: "BTC"
  });

  const filteringFunction = useMemo(
    () => getFilteringFunction(filteringType, filtering),
    [filteringType, filtering]
  );

  return (
    <>
      <Row small>
        <GlobalSearchInput
          autoFocus={false}
          size={"small"}
          query={search}
          onChange={setSearch}
          canClose={false}
        />
      </Row>
      {terminalType === "spot" && (
        <Row small>
          {FILTERING_CURRENCIES.map(currency => (
            <RowItem>
              <GVButton
                noPadding
                disabled={
                  filteringType === "symbol" && filtering.value === currency
                }
                variant={"text"}
                size={GV_BTN_SIZE.SMALL}
                onClick={() => {
                  setFilteringType("symbol");
                  setFiltering({ value: currency });
                }}
              >
                {currency}
              </GVButton>
            </RowItem>
          ))}
          <RowItem>
            <GVButton
              noPadding
              disabled={filteringType === "ALTS"}
              variant={"text"}
              size={GV_BTN_SIZE.SMALL}
              onClick={() => {
                setFilteringType("ALTS");
              }}
            >
              ALTS
            </GVButton>
          </RowItem>
          <RowItem>
            <GVButton
              noPadding
              disabled={filteringType === "FIATS"}
              variant={"text"}
              size={GV_BTN_SIZE.SMALL}
              onClick={() => {
                setFilteringType("FIATS");
              }}
            >
              FIATS
            </GVButton>
          </RowItem>
        </Row>
      )}
      <Row small>
        <Select
          fixedWidth={false}
          size={"small"}
          name="column"
          value={column}
          onChange={(e: ISelectChangeEvent) => setColumn(e.target.value)}
        >
          {COLUMN_VALUES.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </Select>
      </Row>
      <Row small className={styles["market-watch__header-container"]}>
        <table className={styles["market-watch__table"]}>
          <thead>
            <MarketWatchHeaderCell
              dataType={"string"}
              sorting={sorting}
              setSorting={setSorting}
              field={"symbol"}
            >
              Symbol
            </MarketWatchHeaderCell>
            <MarketWatchHeaderCell
              dataType={"number"}
              sorting={sorting}
              setSorting={setSorting}
              field={"lastPrice"}
            >
              Last price
            </MarketWatchHeaderCell>
            {column === CHANGE_COLUMN ? (
              <MarketWatchHeaderCell
                dataType={"number"}
                sorting={sorting}
                setSorting={setSorting}
                field={"priceChangePercent"}
              >
                Change
              </MarketWatchHeaderCell>
            ) : (
              <MarketWatchHeaderCell
                dataType={"number"}
                sorting={sorting}
                setSorting={setSorting}
                field={"volume"}
              >
                Volume
              </MarketWatchHeaderCell>
            )}
          </thead>
        </table>
      </Row>
      <div className={styles["market-watch__items-container"]}>
        <table className={styles["market-watch__table"]}>
          <tbody>
            {items
              .filter(filteringFunction)
              .filter(filterForSearch(search))
              .sort(sortMarketWatchItems(sorting))
              .map(
                ({
                  eventTime,
                  quoteAsset,
                  baseAsset,
                  volume,
                  symbol,
                  lastPrice,
                  priceChange,
                  priceChangePercent
                }) => (
                  <MarketWatchRow
                    eventTime={eventTime}
                    quoteAsset={quoteAsset}
                    baseAsset={baseAsset}
                    column={column}
                    volume={volume}
                    symbol={symbol}
                    lastPrice={lastPrice}
                    priceChange={priceChange}
                    priceChangePercent={priceChangePercent}
                  />
                )
              )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export const MarketWatch = React.memo(_MarketWatch);
