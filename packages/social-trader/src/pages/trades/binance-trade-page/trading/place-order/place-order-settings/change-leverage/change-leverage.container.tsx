import useApiRequest from "hooks/api-request.hook";
import { ChangeLeverage } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/change-leverage/change-leverage";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TerminalPlaceOrderContext } from "pages/trades/binance-trade-page/trading/terminal-place-order.context";
import { getSymbolFromState } from "pages/trades/binance-trade-page/trading/terminal.helpers";
import { ChangeLeverageResponse } from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext, useEffect } from "react";
import { safeGetElemFromArray } from "utils/helpers";

const _ChangeLeverageContainer: React.FC = () => {
  const {
    changeLeverage: changeLeverageMethod,
    getLeverageBrackets: getLeverageBracketsMethod
  } = useContext(TerminalMethodsContext);
  const { authData, symbol } = useContext(TerminalInfoContext);
  const { leverage, setLeverage } = useContext(TerminalPlaceOrderContext);

  const {
    sendRequest: getLeverageBrackets,
    data: leverageBrackets
  } = useApiRequest({
    request: getLeverageBracketsMethod!
  });
  const { sendRequest: changeLeverage } = useApiRequest({
    middleware: [
      ({ leverage }: ChangeLeverageResponse) => setLeverage(leverage)
    ],
    request: changeLeverageMethod!
  });

  useEffect(() => {
    if (authData?.privateKey)
      getLeverageBrackets({ authData, symbol: getSymbolFromState(symbol) });
  }, [authData, symbol]);

  const handleOnChange = useCallback(
    (leverage: number) => {
      changeLeverage({
        symbol: getSymbolFromState(symbol),
        authData,
        leverage
      });
    },
    [symbol, authData]
  );

  const symbolBrackets = leverageBrackets
    ? safeGetElemFromArray(
        leverageBrackets,
        brackets => brackets.symbol === getSymbolFromState(symbol)
      ).brackets.sort((a, b) => {
        return b.initialLeverage - a.initialLeverage;
      })
    : undefined;

  if (!symbolBrackets) return null;

  const maxLeverage = symbolBrackets[0].initialLeverage;

  return (
    <ChangeLeverage
      leverageBrackets={symbolBrackets}
      maxLeverage={maxLeverage}
      leverage={leverage}
      onChange={handleOnChange}
    />
  );
};

export const ChangeLeverageContainer = React.memo(_ChangeLeverageContainer);
