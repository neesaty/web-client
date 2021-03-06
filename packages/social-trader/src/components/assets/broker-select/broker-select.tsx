import { BrokerCardType } from "components/assets/broker-select/broker-select.types";
import { DefaultBlock } from "components/default.block/default.block";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import { SIZES } from "constants/constants";
import { withBlurLoader } from "decorators/with-blur-loader";
import { BrokerAccountType } from "gv-api-web";
import * as React from "react";
import { useTranslation } from "react-i18next";

import {
  getBrokerAccountTypes,
  getBrokerState,
  getExchangeAccountTypes,
  getLeverageDescription
} from "../asset.helpers";
import BrokerCard from "./broker-card/broker-card";
import styles from "./broker-select.module.scss";
import NavigateToSettings from "./navigate-to-settings";

interface Props {
  data: BrokerCardType[];
  selectedBroker: BrokerCardType;
  selectBrokerHandle: (broker: string) => VoidFunction;
  isForexAllowed?: boolean;
  isKycConfirmed?: boolean;
  navigateToSettings: VoidFunction;
}

const _BrokerSelectBroker: React.FC<Props> = ({
  data,
  selectedBroker,
  selectBrokerHandle,
  isForexAllowed = true,
  isKycConfirmed = true,
  navigateToSettings
}) => {
  const [t] = useTranslation();
  return (
    <Row className={styles["broker-select"]}>
      <RowItem>
        <Row wrap wide className={styles["broker-select__list"]}>
          {data.map((broker, i) => (
            <RowItem bottomOffset key={i}>
              <BrokerCard
                logo={broker.logoUrl}
                brokerName={broker.name}
                isSelected={broker === selectedBroker}
                onSelect={selectBrokerHandle}
                cardState={getBrokerState(
                  broker.isKycRequired,
                  isForexAllowed,
                  isKycConfirmed
                )}
                tags={broker.tags}
              />
            </RowItem>
          ))}
        </Row>
        <Row className={styles["broker-select__navigation"]}>
          <NavigateToSettings
            isForex={selectedBroker.isKycRequired}
            isKycConfirmed={isKycConfirmed}
            navigateToSettings={navigateToSettings}
          />
        </Row>
      </RowItem>
      <DefaultBlock
        size={SIZES.LARGE}
        solid
        wide
        className={styles["broker-select__description"]}
      >
        <Row>
          <h3>{selectedBroker.name}</h3>
        </Row>
        <Row onlyOffset>
          <StatisticItem
            half
            label={t("create-program-page.broker-info.about")}
          >
            {selectedBroker.description}
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.broker-info.account-type")}
          >
            {"leverageMin" in selectedBroker
              ? getBrokerAccountTypes(
                  selectedBroker.accountTypes as BrokerAccountType[]
                )
              : getExchangeAccountTypes(selectedBroker.accountTypes)}
          </StatisticItem>
          <StatisticItem
            label={t("create-program-page.broker-info.trading-platform")}
          >
            {selectedBroker.accountTypes[0].type}
          </StatisticItem>
          <StatisticItem label={t("create-program-page.broker-info.terms")}>
            <a
              title={t("create-program-page.broker-info.read-terms")}
              href={selectedBroker.terms}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("create-program-page.broker-info.read-terms")}
            </a>
          </StatisticItem>
          {"leverageMin" in selectedBroker && (
            <StatisticItem
              label={t("create-program-page.broker-info.leverage")}
            >
              {getLeverageDescription(
                selectedBroker.leverageMin,
                selectedBroker.leverageMax
              )}
            </StatisticItem>
          )}
          <StatisticItem label={t("create-program-page.broker-info.assets")}>
            {selectedBroker.assets}
          </StatisticItem>
        </Row>
      </DefaultBlock>
    </Row>
  );
};

const BrokerSelect = withBlurLoader(React.memo(_BrokerSelectBroker));
export default BrokerSelect;
