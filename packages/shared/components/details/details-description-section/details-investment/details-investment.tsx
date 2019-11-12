import "./details-investment.scss";

import * as React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import DetailsBlock from "shared/components/details/details-block";
import GVTabs from "shared/components/gv-tabs";
import GVTab from "shared/components/gv-tabs/gv-tab";
import PortfolioEventsTable from "shared/components/portfolio-events-table/portfolio-events-table";
import {
  EVENT_LOCATION,
  getEvents
} from "shared/components/programs/program-details/services/program-details.service";
import { SelectFilterValue } from "shared/components/table/components/filtering/filter.type";
import { TableSelectorType } from "shared/components/table/components/table.types";
import { ASSET } from "shared/constants/constants";
import useTab from "shared/hooks/tab.hook";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import { CurrencyEnum, FeesType } from "shared/utils/types";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { InvestmentDetails } from "./details-investment.helpers";
import InvestmentContainer, {
  haveActiveInvestment,
  haveSubscription
} from "./investment-container";

const _DetailsInvestment: React.FC<Props> = ({
  fees,
  notice,
  asset,
  eventTypesSelector,
  selector,
  currency,
  dispatchDescription,
  id,
  personalDetails,
  WithdrawContainer,
  ReinvestingWidget
}) => {
  const { tab, setTab } = useTab<TABS>(TABS.INVESTMENT);
  const [t] = useTranslation();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const events = useSelector(selector);
  const eventTypeFilterValues = useSelector(eventTypesSelector);
  const dispatch = useDispatch();
  const [haveEvents, setHaveEvents] = useState<boolean>(false);
  useEffect(() => {
    isAuthenticated && id && dispatch(getEvents(id, EVENT_LOCATION.Asset)());
  }, [isAuthenticated, id]);
  useEffect(() => {
    isAuthenticated && setHaveEvents(events.itemsData.data.total > 0);
  }, [isAuthenticated, events]);
  const haveInvestment =
    asset !== ASSET.FOLLOW &&
    (haveActiveInvestment(personalDetails) ||
      haveSubscription(personalDetails));
  const showInvestment = haveEvents || haveInvestment;
  useEffect(() => {
    if (haveEvents && !haveInvestment) setTab(null, TABS.EVENTS);
  }, [haveInvestment, haveEvents]);
  if (!showInvestment) return null;
  return (
    <DetailsBlock table wide className="details-investment">
      <div className="details-investment__investment-tabs">
        <GVTabs value={tab} onChange={setTab}>
          <GVTab
            visible={haveInvestment}
            value={TABS.INVESTMENT}
            label={t(`fund-details-page.description.yourInvestment.${asset}`)}
          />
          <GVTab
            visible={haveEvents}
            value={TABS.EVENTS}
            label={t("program-details-page.history.tabs.events")}
          />
        </GVTabs>
      </div>
      {tab === TABS.INVESTMENT && (
        <InvestmentContainer
          fees={fees}
          updateDescription={dispatchDescription}
          asset={asset}
          notice={notice}
          id={id}
          assetCurrency={currency}
          personalDetails={personalDetails}
          WithdrawContainer={WithdrawContainer}
          ReinvestingWidget={ReinvestingWidget}
        />
      )}
      {tab === TABS.EVENTS && (
        <PortfolioEventsTable
          getItems={getEvents(id!, EVENT_LOCATION.Asset)}
          selector={selector}
          asset={asset}
          eventLocation={EVENT_LOCATION.Asset}
          dateRangeStartLabel={t("filters.date-range.program-start")}
          eventTypeFilterValues={eventTypeFilterValues!}
        />
      )}
    </DetailsBlock>
  );
};

enum TABS {
  INVESTMENT = "INVESTMENT",
  EVENTS = "EVENTS"
}
interface Props {
  fees: FeesType;
  notice?: string;
  asset: ASSET;
  eventTypesSelector: (state: RootState) => SelectFilterValue[];
  dispatchDescription: () => void;
  selector: TableSelectorType;
  currency: CurrencyEnum;
  id: string;
  personalDetails: InvestmentDetails;
  WithdrawContainer?: React.ComponentType<any>;
  ReinvestingWidget?: React.ComponentType<any>;
}

const DetailsInvestment = React.memo(_DetailsInvestment);
export default DetailsInvestment;
