import { DialogButtons } from "components/dialog/dialog-buttons";
import { Row } from "components/row/row";
import { SubmitButton } from "components/submit-button/submit-button";
import {
  OrderSide,
  TerminalCurrency
} from "pages/trades/binance-trade-page/trading/terminal.types";
import React from "react";

interface Props {
  isSuccessful?: boolean;
  side: OrderSide;
  asset: TerminalCurrency;
}

const _PlaceOrderSubmitButton: React.FC<Props> = ({
  isSuccessful,
  side,
  asset
}) => {
  return (
    <Row>
      <SubmitButton
        checkDirty={false}
        isSuccessful={isSuccessful}
        color={side === "SELL" ? "danger" : "primary"}
        wide
      >
        <>
          {side} {asset}
        </>
      </SubmitButton>
    </Row>
  );
};

export const PlaceOrderSubmitButton = React.memo(_PlaceOrderSubmitButton);
