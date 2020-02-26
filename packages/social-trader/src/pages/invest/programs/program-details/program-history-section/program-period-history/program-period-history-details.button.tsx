import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { MutedText } from "components/muted-text/muted-text";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER
} from "components/popover/popover";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import withLoader from "decorators/with-loader";
import { ProgramPeriodViewModel } from "gv-api-web";
import useAnchor, { TAnchor } from "hooks/anchor.hook";
import React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _ProgramPeriodHistoryPopupItem: React.FC<{
  label: string;
  value: number;
  currency: CurrencyEnum;
}> = ({ label, value, currency }) => (
  <PopoverContentListItem>
    <div className="details-trades__history-popup-item">
      <div className="details-trades__history-popup-item-name">
        <MutedText>{label}</MutedText>
      </div>
      <div className="details-trades__history-popup-item-value">
        {value} {currency}
      </div>
    </div>
  </PopoverContentListItem>
);
const ProgramPeriodHistoryPopupItem = withLoader(
  _ProgramPeriodHistoryPopupItem
);

const ProgramPeriodHistoryPopup: React.FC<ProgramPeriodHistoryPopupProps> = ({
  anchor,
  onClose,
  period,
  currency
}) => {
  const [t] = useTranslation();
  return (
    <Popover
      ownWidth
      anchorEl={anchor}
      onClose={onClose}
      horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
      orientation={ORIENTATION_POPOVER.LEFT}
    >
      <PopoverContent type={"list"}>
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsDeposit}
          label={t(
            "program-details-page.history.period-history.investors-deposit"
          )}
          value={period.investorsDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsWithdraw}
          label={t(
            "program-details-page.history.period-history.investors-withdraw"
          )}
          value={period.investorsWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerDeposit}
          label={t(
            "program-details-page.history.period-history.manager-deposit"
          )}
          value={period.managerDeposit}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerWithdraw}
          label={t(
            "program-details-page.history.period-history.manager-withdraw"
          )}
          value={period.managerWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.investorsProfitWithdraw}
          label={t(
            "program-details-page.history.period-history.investors-profit-withdraw"
          )}
          value={period.investorsProfitWithdraw}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.platformSuccessFee}
          label={t(
            "program-details-page.history.period-history.platform-success-fee"
          )}
          value={period.platformSuccessFee}
          currency={currency}
        />
        <ProgramPeriodHistoryPopupItem
          condition={!!period.managerCommissionRebate}
          label={t(
            "program-details-page.history.period-history.manager-commission-rebate"
          )}
          value={period.managerCommissionRebate}
          currency={currency}
        />
      </PopoverContent>
    </Popover>
  );
};

interface ProgramPeriodHistoryPopupProps
  extends IProgramPeriodHistoryDetailsButtonProps {
  anchor: TAnchor;
  onClose: () => void;
}

const _ProgramPeriodHistoryDetailsButton: React.FC<IProgramPeriodHistoryDetailsButtonProps> = ({
  period,
  currency
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const [t] = useTranslation();
  return (
    <>
      <GVButton size={GV_BTN_SIZE.SMALL} color="secondary" onClick={setAnchor}>
        {t("program-details-page.history.my-history.details")}
      </GVButton>
      <ProgramPeriodHistoryPopup
        period={period}
        currency={currency}
        anchor={anchor}
        onClose={clearAnchor}
      />
    </>
  );
};

interface IProgramPeriodHistoryDetailsButtonProps {
  currency: CurrencyEnum;
  period: ProgramPeriodViewModel;
}

export const ProgramPeriodHistoryDetailsButton = _ProgramPeriodHistoryDetailsButton;
