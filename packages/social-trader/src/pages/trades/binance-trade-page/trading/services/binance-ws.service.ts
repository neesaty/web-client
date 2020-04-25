import { TradeAuthDataType } from "pages/trades/binance-trade-page/binance-trade.helpers";
import {
  Depth,
  QueryOrderResult,
  Ticker,
  Trade,
  TradeCurrency
} from "pages/trades/binance-trade-page/trading/trading.types";
import { Observable } from "rxjs";
import { filter, map, switchMap } from "rxjs/operators";
import { ConnectSocketMethodType } from "services/websocket.service";

import { getUserStreamKey } from "./binance-http.service";
import {
  depthTransform,
  tickerTransform,
  tradeTransform
} from "./binance-ws.helpers";

export const BINANCE_WS_API_URL = "wss://stream.binance.com:9443";

export enum BINANCE_WS_API_TYPE {
  WS = "ws",
  STREAM = "stream"
}

export enum ORDER_STATUSES {
  PARTIALLY_FILLED = "PARTIALLY_FILLED",
  FILLED = "FILLED",
  NEW = "NEW",
  FAIL = "FAIL",
  PENDING = "PENDING",
  REJECTED = "REJECTED"
}

export const tradeSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TradeCurrency
): Observable<Trade> => {
  const socketName = `${symbol.toLowerCase()}@trade`;
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketName, url).pipe(map(tradeTransform));
};

export const depthSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  symbol: TradeCurrency
): Observable<Depth> => {
  const socketName = `${symbol.toLowerCase()}@depth`;
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketName, url).pipe(map(depthTransform));
};

export const marketTicketsSocket = (
  connectSocketMethod: ConnectSocketMethodType
): Observable<Ticker[]> => {
  const socketName = "!ticker@arr";
  const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${socketName}`;
  return connectSocketMethod(socketName, url).pipe(
    map(items => items.map(tickerTransform))
  );
};

export const getUserStreamSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
) => {
  const socketName = "accountInformation";
  return getUserStreamKey(authData).pipe(
    switchMap((key: any) => {
      const url = `${BINANCE_WS_API_URL}/${BINANCE_WS_API_TYPE.WS}/${key.listenKey}`;
      return connectSocketMethod(socketName, url);
    })
  );
};

export const getAccountInformationSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
) => {
  return getUserStreamSocket(connectSocketMethod, authData).pipe(
    filter(info => info.e === "outboundAccountInfo"),
    map(info => {
      return { ...info, balances: info.B };
    })
  );
};

export const getOpenOrdersSocket = (
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
): Observable<QueryOrderResult[]> => {
  return getUserStreamSocket(connectSocketMethod, authData).pipe(
    filter(info => info.e === "executionReport"),
    filter(
      item =>
        item.X !== ORDER_STATUSES.FILLED &&
        item.X !== ORDER_STATUSES.PARTIALLY_FILLED &&
        item.X !== ORDER_STATUSES.REJECTED
    )
  );
};

export const getAllOrdersSocket = (
  symbol: string,
  connectSocketMethod: ConnectSocketMethodType,
  authData: TradeAuthDataType
) => {
  return getUserStreamSocket(connectSocketMethod, authData).pipe(
    filter(info => info.e === "executionReport"),
    filter(
      item =>
        item.X === ORDER_STATUSES.FILLED ||
        item.X === ORDER_STATUSES.PARTIALLY_FILLED
    ),
    filter(info => info.s === symbol.toUpperCase())
  );
};
