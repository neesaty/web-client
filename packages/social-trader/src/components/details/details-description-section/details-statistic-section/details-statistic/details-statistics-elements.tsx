import classNames from "classnames";
import {
  ChartPeriodType,
  TChartPeriod
} from "components/chart/chart-period/chart-period.helpers";
import styles from "components/details/details-description-section/details-statistic-section/details-statistic/details-statistics.module.scss";
import { Row } from "components/row/row";
import * as React from "react";
import { useTranslation } from "react-i18next";

const _DetailsStatisticsElements: React.FC<Props> = ({
  Current,
  Particular,
  periodType
}) => {
  const [t] = useTranslation();
  return (
    <>
      <Row onlyOffset>
        <h5>{t("program-details-page.statistics.current")}</h5>
        <Row
          wrap
          className={classNames(
            styles["details-statistics__particular-information"],
            styles["details-statistics__particular-information--current"]
          )}
        >
          <Current />
        </Row>
      </Row>
      <Row large onlyOffset>
        <h5>
          {t("program-details-page.statistics.for")}{" "}
          {t(`chart-period.${ChartPeriodType[periodType]}`)}
        </h5>
        <Row
          wrap
          className={styles["details-statistics__particular-information"]}
        >
          <Particular />
        </Row>
      </Row>
    </>
  );
};

interface Props {
  Current: React.ComponentType;
  Particular: React.ComponentType;
  periodType: TChartPeriod;
}

const DetailsStatisticsElements = React.memo(_DetailsStatisticsElements);
export default DetailsStatisticsElements;
