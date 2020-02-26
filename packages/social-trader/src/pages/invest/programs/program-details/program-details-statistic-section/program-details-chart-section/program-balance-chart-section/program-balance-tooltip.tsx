import ChartTooltip from "components/chart/chart-tooltip/chart-tooltip";
import StatisticItem from "components/statistic-item/statistic-item";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { formatCurrencyValue } from "utils/formatter";

const _TooltipBody: React.FC<ITooltipBodyProps & WithTranslation> = ({
  t,
  managersFunds,
  investorsFunds
}) => (
  <>
    <StatisticItem
      label={t("program-details-page.statistics.tooltip.investors-funds")}
      accent
    >
      {investorsFunds}
    </StatisticItem>
    <StatisticItem
      label={t("program-details-page.statistics.tooltip.managers-funds")}
      accent
    >
      {managersFunds}
    </StatisticItem>
  </>
);
const TooltipBody = translate()(_TooltipBody);

const ProgramBalanceTooltip: React.FC<IProgramBalanceTooltipProps> = ({
  active,
  label,
  payload
}) => {
  if (!active || !payload[0]) return null;
  const dot = payload[0];
  const managersFunds = `${formatCurrencyValue(
    dot.payload.managerFunds,
    dot.unit
  )} ${dot.unit}`;
  const investorsFunds = `${formatCurrencyValue(
    dot.payload.investorsFunds,
    dot.unit
  )} ${dot.unit}`;

  return (
    <ChartTooltip
      heading="Equity"
      body={
        <TooltipBody
          managersFunds={managersFunds}
          investorsFunds={investorsFunds}
        />
      }
      date={new Date(label)}
      className="details-tooltip"
    />
  );
};

interface ITooltipBodyProps {
  managersFunds: string;
  investorsFunds: string;
}
interface IProgramBalanceTooltipProps {
  active: boolean;
  label: string;
  payload: any[];
}

export default ProgramBalanceTooltip;
