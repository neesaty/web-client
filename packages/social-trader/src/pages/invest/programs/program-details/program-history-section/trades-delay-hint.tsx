import { MutedText } from "components/muted-text/muted-text";
import { HORIZONTAL_POPOVER_POS } from "components/popover/popover";
import Tooltip from "components/tooltip/tooltip";
import { TooltipContent } from "components/tooltip/tooltip-content";
import { TradesDelay } from "gv-api-web";
import { DELAYS_LABELS } from "pages/invest/programs/program-details/program-history-section/program-open-positions/program-open-positions.helpers";
import React from "react";
import { useTranslation } from "react-i18next";

const _TradesDelayHint: React.FC<{ delay: TradesDelay }> = ({ delay }) => {
  const [t] = useTranslation();
  if (delay === "None") return null;
  const label = DELAYS_LABELS[delay];
  return (
    <>
      <div className="details-trades__delay-hint">
        <MutedText>
          {label} {t("program-details-page.history.open-positions.delay")}
        </MutedText>
      </div>
      <Tooltip
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        render={() => (
          <TooltipContent>
            {t("program-details-page.history.open-positions.delay-tooltip", {
              delay: label
            })}
          </TooltipContent>
        )}
      >
        <div className="details-trades__delay-question">?</div>
      </Tooltip>
    </>
  );
};
export const TradesDelayHint = _TradesDelayHint;
