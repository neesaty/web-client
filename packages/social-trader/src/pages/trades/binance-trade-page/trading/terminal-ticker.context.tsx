import {
  filterTrading,
  normalizeMarketList,
  normalizeSymbolsList
} from "pages/trades/binance-trade-page/trading/market-watch/market-watch.helpers";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import {
  MergedTickerSymbolType,
  Symbol,
  Ticker
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import { map } from "rxjs/operators";
import { useSockets } from "services/websocket.service";

type TerminalTickerContextState = MergedTickerSymbolType[] | undefined;

export const TerminalTickerInitialState: TerminalTickerContextState = undefined;

export const TerminalTickerContext = createContext<TerminalTickerContextState>(
  TerminalTickerInitialState
);

export const TerminalTickerContextProvider: React.FC = ({ children }) => {
  const { getTickers, marketTicketsSocket } = useContext(
    TerminalMethodsContext
  );
  const [requestData, setRequestData] = useState<{
    [key: string]: Ticker;
  }>({});
  const [normalizedSymbols, setNormalizedSymbols] = useState<{
    [key: string]: Symbol;
  }>({});
  const [list, setList] = useState<{
    [key: string]: MergedTickerSymbolType;
  }>({});
  const [socketData, setSocketData] = useState<{
    [key: string]: Ticker;
  }>({});
  const { connectSocket } = useSockets();

  const { exchangeInfo } = useContext(TerminalInfoContext);

  useEffect(() => {
    if (exchangeInfo) {
      const normalizedSymbols = normalizeSymbolsList(exchangeInfo.symbols);
      setNormalizedSymbols(normalizedSymbols);
      setList(
        normalizedSymbols as {
          [key: string]: MergedTickerSymbolType;
        }
      );
      setRequestData({});
    }
  }, [exchangeInfo]);

  useEffect(() => {
    if (!Object.values(normalizedSymbols).length) return;
    const requestData = getTickers().pipe(map(normalizeMarketList));
    requestData.subscribe(setRequestData);
    const ticketsSocket = marketTicketsSocket(connectSocket).pipe(
      map(normalizeMarketList)
    );
    ticketsSocket.subscribe(setSocketData);
  }, [normalizedSymbols]);
  useEffect(() => {
    if (!Object.values(socketData).length) return;
    const updatedList = { ...list };
    Object.keys(socketData).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...socketData[name] };
    });
    setList(updatedList);
  }, [socketData]);

  useEffect(() => {
    if (!Object.values(requestData).length) return;
    const updatedList = { ...list };
    Object.keys(requestData).forEach(name => {
      updatedList[name] = { ...updatedList[name], ...requestData[name] };
    });
    setList(updatedList);
  }, [requestData]);
  const items = useMemo(() => Object.values(list).filter(filterTrading), [
    list
  ]);
  return (
    <TerminalTickerContext.Provider
      value={Object.values(requestData).length ? items : undefined}
    >
      {children}
    </TerminalTickerContext.Provider>
  );
};
