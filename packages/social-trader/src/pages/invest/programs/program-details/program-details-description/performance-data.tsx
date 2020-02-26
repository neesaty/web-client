import ImageBase from "components/avatar/image-base";
import Leverage from "components/leverage/leverage";
import PieContainerSmall from "components/pie-container/pie-container-small";
import ProgramPeriodPie from "components/program-period/program-period-pie/program-period-pie";
import { StatisticItemList } from "components/statistic-item-list/statistic-item-list";
import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipLabel } from "components/tooltip-label/tooltip-label";
import { STATUS } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import {
  BrokerDetails,
  LevelsParamsInfo,
  ProgramDetailsFull
} from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { CurrencyEnum } from "utils/types";

const _PerformanceData: React.FC<Props> = ({
  leverageMin,
  leverageMax,
  currency,
  programDetails,
  brokerDetails,
  status,
  data: levelsParameters
}) => {
  const [t] = useTranslation();
  return (
    <StatisticItemList className="asset-details-description__performance-data">
      <StatisticItem label={t("program-details-page.description.broker")}>
        <ImageBase
          alt={brokerDetails.name}
          className={"asset-details-description__broker"}
          src={brokerDetails.logo}
        />
      </StatisticItem>
      {currency && (
        <StatisticItem label={t("program-details-page.description.currency")}>
          {currency}
        </StatisticItem>
      )}
      {!!leverageMin && !!leverageMax && (
        <StatisticItem label={t("program-details-page.description.leverage")}>
          <Leverage min={leverageMin} max={leverageMax} />
        </StatisticItem>
      )}
      {programDetails && (
        <>
          <StatisticItem label={t("program-details-page.description.period")}>
            <ProgramPeriodPie
              condition={status !== STATUS.CLOSED}
              loader={t("program-period.program-closed")}
              start={programDetails.periodStarts}
              end={programDetails.periodEnds}
            />
          </StatisticItem>
          <StatisticItem label={t("program-details-page.description.age")}>
            <PieContainerSmall
              end={levelsParameters.programAgeMax}
              value={programDetails.ageDays}
              suffix={"days"}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.genesis-ratio")}
                labelText={t("program-details-page.description.genesis-ratio")}
              />
            }
          >
            <PieContainerSmall
              start={levelsParameters.genesisRatioMin}
              end={levelsParameters.genesisRatioMax}
              value={programDetails.genesisRatio}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t(
                  "program-details-page.tooltip.investment-scale"
                )}
                labelText={t(
                  "program-details-page.description.investment-scale"
                )}
              />
            }
          >
            <PieContainerSmall
              start={levelsParameters.investmentScaleMin}
              end={levelsParameters.investmentScaleMax}
              value={programDetails.investmentScale}
            />
          </StatisticItem>
          <StatisticItem
            label={
              <TooltipLabel
                tooltipContent={t("program-details-page.tooltip.volume-scale")}
                labelText={t("program-details-page.description.volume-scale")}
              />
            }
          >
            <PieContainerSmall
              start={levelsParameters.volumeScaleMin}
              end={levelsParameters.volumeScaleMax}
              value={programDetails.volumeScale}
            />
          </StatisticItem>
        </>
      )}
    </StatisticItemList>
  );
};

interface Props {
  leverageMin: number;
  leverageMax: number;
  currency?: CurrencyEnum;
  data: LevelsParamsInfo;
  status: string;
  brokerDetails: BrokerDetails;
  programDetails?: ProgramDetailsFull;
}

const PerformanceData = withBlurLoader(_PerformanceData);
export default PerformanceData;
