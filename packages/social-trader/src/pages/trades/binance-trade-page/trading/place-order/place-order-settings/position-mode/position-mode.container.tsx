import useApiRequest from "hooks/api-request.hook";
import { PositionMode } from "pages/trades/binance-trade-page/trading/place-order/place-order-settings/position-mode/position-mode";
import { TerminalInfoContext } from "pages/trades/binance-trade-page/trading/terminal-info.context";
import { TerminalMethodsContext } from "pages/trades/binance-trade-page/trading/terminal-methods.context";
import { TerminalPlaceOrderContext } from "pages/trades/binance-trade-page/trading/terminal-place-order.context";
import { PositionModeType } from "pages/trades/binance-trade-page/trading/terminal.types";
import React, { useCallback, useContext, useEffect, useState } from "react";

const _PositionModeContainer: React.FC = () => {
  const { currentPositionMode, updatePositionMode } = useContext(
    TerminalPlaceOrderContext
  );
  const { changePositionMode } = useContext(TerminalMethodsContext);
  const { authData, symbol } = useContext(TerminalInfoContext);
  const { sendRequest: changePosition } = useApiRequest({
    request: changePositionMode!
  });
  const [mode, setMode] = useState<PositionModeType | undefined>(undefined);

  useEffect(() => {
    if (currentPositionMode !== undefined) setMode(currentPositionMode);
  }, [currentPositionMode]);

  const handleOnChange = useCallback(
    (dualSidePosition: PositionModeType) => {
      changePosition({
        authData,
        dualSidePosition
      }).then(() => {
        setMode(dualSidePosition);
        updatePositionMode();
      });
    },
    [symbol, authData]
  );
  return (
    <PositionMode
      loaderData={false}
      data={mode as PositionModeType}
      onChange={handleOnChange}
    />
  );
};

export const PositionModeContainer = React.memo(_PositionModeContainer);
