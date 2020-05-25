import { MutedText } from "components/muted-text/muted-text";
import { TradeTable } from "pages/trades/binance-trade-page/trading/components/trade-table/trade-table";
import { TradingInfoContext } from "pages/trades/binance-trade-page/trading/trading-info.context";
import { FundsRow } from "pages/trades/binance-trade-page/trading/trading-tables/funds/funds-row";
import {
  FUNDS_TABLE_COLUMNS,
  FUTURES_FUNDS_TABLE_COLUMNS
} from "pages/trades/binance-trade-page/trading/trading-tables/funds/funds.helpers";
import { AssetBalance } from "pages/trades/binance-trade-page/trading/trading.types";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

import styles from "./funds.module.scss";

interface Props {
  items: AssetBalance[];
}

const _Funds: React.FC<Props> = ({ items }) => {
  const [t] = useTranslation();
  const { terminalType } = useContext(TradingInfoContext);
  const columns =
    terminalType === "spot" ? FUNDS_TABLE_COLUMNS : FUTURES_FUNDS_TABLE_COLUMNS;
  return (
    <TradeTable
      className={styles["funds__table"]}
      items={items}
      columns={columns}
      renderHeaderCell={({ name }) => (
        <th>
          <MutedText>{t(name)}</MutedText>
        </th>
      )}
      renderRow={({ asset, free, locked }: AssetBalance) => (
        <FundsRow asset={asset} available={free} locked={locked} />
      )}
    />
  );
};

export const Funds = React.memo(_Funds);