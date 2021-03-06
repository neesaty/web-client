import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import { MutedText } from "components/muted-text/muted-text";
import { PopoverContentCardBlock } from "components/popover/popover-card.block";
import { PopoverContent } from "components/popover/popover-content";
import { Row } from "components/row/row";
import StatisticItemInner from "components/statistic-item/statistic-item-inner";
import { LevelInfo } from "gv-api-web";
import useIsOpen from "hooks/is-open.hook";
import { fetchInvestmentsLevels } from "pages/invest/programs/program-details/service/program-details.service";
import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

import AboutLevelsComponent from "./about-levels/about-levels";
import styles from "./investment-limits-popover.module.scss";

const _InvestmentLimitsPopover: React.FC<Props> = ({
  level,
  canLevelUp,
  currency,
  limit
}) => {
  const [t] = useTranslation();
  const [isOpen, setOpen, setClose] = useIsOpen();
  const [investmentsLimits, setInvestmentsLimits] = useState<
    LevelInfo[] | undefined
  >(undefined);
  useEffect(() => {
    fetchInvestmentsLevels(currency).then(setInvestmentsLimits);
  }, [currency]);
  return (
    <>
      <PopoverContent className={styles["popover-levels"]}>
        <PopoverContentCardBlock className={styles["popover-levels__block"]}>
          <Row>
            <h4>
              {t("program-details-page.popover.genesis-level")} {level}
            </h4>
          </Row>
          {canLevelUp && (
            <Row>
              <StatisticItemInner accent label={t("level-tooltip.level-up")}>
                {t("level-tooltip.top10")}
              </StatisticItemInner>
            </Row>
          )}
          <Row>
            <StatisticItemInner
              accent
              label={t("program-details-page.popover.invest-limit")}
            >
              <NumberFormat
                value={formatCurrencyValue(limit, currency)}
                thousandSeparator={" "}
                displayType="text"
                suffix={` ${currency}`}
              />
            </StatisticItemInner>
          </Row>
        </PopoverContentCardBlock>
        <PopoverContentCardBlock
          dark
          className={styles["popover-levels__block"]}
        >
          <Row>
            <MutedText noWrap={false}>
              {t("program-details-page.popover.text")}
            </MutedText>
          </Row>
          <Row>
            <GVButton
              size={GV_BTN_SIZE.BIG}
              noPadding
              variant="text"
              onClick={setOpen}
              color="secondary"
            >
              <>{t("program-details-page.popover.about-levels")} &#8250;</>
            </GVButton>
          </Row>
        </PopoverContentCardBlock>
      </PopoverContent>
      <AboutLevelsComponent
        condition={!!investmentsLimits}
        open={isOpen}
        onClose={setClose}
        currency={currency}
        investmentsLimits={investmentsLimits!}
      />
    </>
  );
};

interface Props {
  limit: number;
  currency: CurrencyEnum;
  level: number;
  canLevelUp: boolean;
  closePopover(): void;
}

const InvestmentLimitsPopover = React.memo(_InvestmentLimitsPopover);
export default InvestmentLimitsPopover;
