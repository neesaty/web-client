import "pages/invest/programs/programs-facet/programs-facet.scss";

import DetailsBlock from "components/details/details-block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import FundsTableModule from "modules/funds-table/components/funds-table/funds-table-module";
import {
  fetchFunds,
  fetchFundsChallengeWinner
} from "modules/funds-table/services/funds-table.service";
import FundsFacetTable from "pages/invest/funds/funds-facet/components/funds-facet-table";
import { FundsWeeklyHeader } from "pages/invest/funds/funds-facet/funds-weekly/funds-weekly-header";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

export const FUNDS_WEEKLY_FACET_NAME = "challenge";

const _FundsWeeklyContainer: React.FC = () => {
  const [t] = useTranslation();

  const getFunds = useCallback(
    (filters: ComposeFiltersAllType): Promise<IDataModel> =>
      fetchFunds(filters),
    []
  );
  return (
    <Page
      description={`${t("funds-page.title")} ${t(
        `facets.${FUNDS_WEEKLY_FACET_NAME}`
      )} facet list`}
      title={`${t("funds-page.title")} ${t(
        `facets.${FUNDS_WEEKLY_FACET_NAME}`
      )}`}
    >
      <FundsWeeklyHeader />
      <DetailsBlock wide table>
        <FundsTableModule
          getItems={fetchFundsChallengeWinner}
          loaderCount={1}
          showSwitchView={false}
          title={t("facets.texts.last-week-challenge-winner")}
        />
      </DetailsBlock>
      <DetailsBlock table>
        <FacetContainer
          title={t("facets.texts.all-funds")}
          id={FUNDS_WEEKLY_FACET_NAME}
          asset={FACET_ASSET.FUNDS}
          TableContainer={FundsFacetTable}
          getItems={getFunds}
        />
      </DetailsBlock>
    </Page>
  );
};

const FundsWeeklyContainer = React.memo(_FundsWeeklyContainer);
export default FundsWeeklyContainer;
