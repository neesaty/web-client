import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { Text } from "components/text/text";
import useApiRequest from "hooks/api-request.hook";
import { TradeTable } from "pages/trades/binance-trade-page/trading/components/trade-table/trade-table";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { getSymbolFromState } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import {
  QueryOrderResult,
  TerminalAuthDataType
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext } from "react";
import { useTranslation } from "react-i18next";

import { OpenOrdersRow } from "./open-orders-row";
import { OPEN_ORDERS_TABLE_COLUMNS } from "./open-orders.helpers";
import styles from "./open-orders.module.scss";

interface Props {
  items?: QueryOrderResult[];
}

export const OpenOrders: React.FC<Props> = ({ items }) => {
  const { cancelAllOrders } = useContext(TerminalMethodsContext);
  const [t] = useTranslation();
  const { authData, symbol } = useContext(TerminalInfoContext);
  const { sendRequest, isPending } = useApiRequest({
    request: ({
      options,
      authData
    }: {
      options: { symbol: string; useServerTime?: boolean };
      authData: TerminalAuthDataType;
    }) => cancelAllOrders(options, authData)
  });
  const handleCancel = useCallback(() => {
    return sendRequest({
      options: { symbol: getSymbolFromState(symbol) },
      authData
    });
  }, [symbol, authData]);
  return (
    <TradeTable
      className={styles["open-orders__table"]}
      columns={OPEN_ORDERS_TABLE_COLUMNS}
      items={items}
      renderHeaderCell={({ name }) => (
        <th>
          {name === "cancel-all" ? (
            items?.length ? (
              <GVButton
                noPadding
                variant={"text"}
                disabled={isPending}
                isPending={isPending}
                size={GV_BTN_SIZE.SMALL}
                color={"danger"}
                onClick={handleCancel}
              >
                {t("Cancel all")}
              </GVButton>
            ) : (
              ""
            )
          ) : (
            <Text muted>{t(`${name}`)}</Text>
          )}
        </th>
      )}
      renderRow={({
        executedQty,
        origQty,
        orderId,
        time,
        symbol,
        type,
        side,
        price
      }: QueryOrderResult) => (
        <OpenOrdersRow
          orderId={orderId}
          time={time}
          symbol={symbol}
          type={type}
          side={side}
          price={price}
          origQty={origQty}
          filled={(+executedQty / +origQty) * 100}
          total={+origQty * +price}
        />
      )}
    />
  );
};
