import GVButton from "components/gv-button";
import Hint from "components/hint/hint";
import { useToLink } from "components/link/link.helper";
import { VERTICAL_POPOVER_POS } from "components/popover/popover";
import { TableCardActionsItem } from "components/table/components/table-card/table-card-actions";
import { BrokerTradeServerType, ProgramMinInvestAmount } from "gv-api-web";
import { TEvent } from "hooks/anchor.hook";
import useIsOpen from "hooks/is-open.hook";
import ConfirmContainer from "modules/confirm/confirm-container";
import { CONVERT_ASSET } from "pages/convert-asset/convert-asset.contants";
import { makeProgramLinkCreator } from "pages/convert-asset/convert-asset.routes";
import * as React from "react";
import { useTranslation } from "shared/i18n";
import { CurrencyEnum } from "utils/types";

export const MakeProgramButton: React.FC<{
  necessaryMoney: string;
  isEnoughMoney: boolean;
  id: string;
  clearAnchor: (event: TEvent) => void;
}> = React.memo(({ isEnoughMoney, id, clearAnchor, necessaryMoney }) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  const makeProgramLinkMethod = makeProgramLinkCreator({
    assetFrom: CONVERT_ASSET.ACCOUNT,
    assetTo: CONVERT_ASSET.PROGRAM
  });
  const makeProgramLink = linkCreator(makeProgramLinkMethod(id));
  const label = t("dashboard-page.trading.actions.make-program");
  return isEnoughMoney ? (
    <TableCardActionsItem to={makeProgramLink} onClick={clearAnchor}>
      {label}
    </TableCardActionsItem>
  ) : (
    <GVButton variant="text" color="secondary">
      <Hint
        content={label}
        className="dashboard-trading__disable-button"
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        tooltipContent={t(
          "dashboard-page.trading.tooltips.is-not-enough-money",
          { value: necessaryMoney }
        )}
      />
    </GVButton>
  );
});

export const ConfirmTFAButton: React.FC<{
  onApply: VoidFunction;
  id: string;
}> = React.memo(({ onApply, id }) => {
  const { t } = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <TableCardActionsItem onClick={setOpen}>
        {t("program-settings.buttons.two-factor-confirm")}
      </TableCardActionsItem>
      <ConfirmContainer
        open={isOpen}
        onClose={setClose}
        onApply={onApply}
        programId={id}
      />
    </>
  );
});

export const getMinDepositCreateProgram = (
  programMinDepositAmounts: ProgramMinInvestAmount[],
  brokerType: BrokerTradeServerType,
  curr: CurrencyEnum
) => {
  const broker = programMinDepositAmounts.find(
    ({ serverType }) => serverType === brokerType
  );
  const minDepositCreateAssetInCurr =
    !!broker &&
    broker.minDepositCreateAsset.find(({ currency }) => currency === curr);
  return minDepositCreateAssetInCurr ? minDepositCreateAssetInCurr.amount : 0;
};