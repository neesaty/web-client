import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";

const _SignalInfo: React.FC<ISignalProgramInfoProps> = ({
  successFee,
  volumeFee
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t(
              "program-details-page.tooltip.success-fee-signal"
            )}
            labelText={t("program-details-page.description.successFee")}
          />
        }
        className="asset-details-description__short-statistic-item"
        accent
      >
        <NumberFormat value={successFee} displayType="text" suffix=" %" />
      </StatisticItem>
      <StatisticItem
        label={
          <TooltipLabel
            tooltipContent={t("program-details-page.tooltip.volume-fee")}
            labelText={t("program-details-page.description.volume-fee")}
          />
        }
        className="asset-details-description__short-statistic-item"
        accent
      >
        <NumberFormat value={volumeFee} displayType="text" suffix=" %" />
      </StatisticItem>
    </StatisticItemList>
  );
};

interface ISignalProgramInfoProps {
  successFee: number;
  volumeFee: number;
}

const SignalInfo = _SignalInfo;
export default SignalInfo; // TODO refactor
