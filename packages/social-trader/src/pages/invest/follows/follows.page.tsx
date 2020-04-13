import { DefaultTableBlock } from "components/default.block/default-table.block";
import DetailsBlock from "components/details/details-block";
import FacetCardsContainer, {
  ASSETS_FACETS
} from "components/facet-cards/faset-cards-container";
import NavigationTabs from "components/navigation-tabs/navigation-tabs";
import Page from "components/page/page";
import { LIST_VIEW } from "components/table/table.constants";
import { useTranslation } from "i18n";
import FollowsTableSsr from "modules/follows-table/components/follows-table-ssr";
import { NextComponentType } from "next";
import React from "react";
import {
  EXPLORE_TAB_NAME,
  FAVORITES_TAB_NAME,
  FOLLOW_FACET_FOLDER_ROUTE,
  FOLLOW_TAB_ROUTE
} from "routes/invest.routes";
import { composeFollowFacetUrl } from "utils/compose-url";
import { ORGANIZATION_SCHEMA } from "utils/seo";

interface Props {
  outerView?: LIST_VIEW;
}

const FollowsPage: React.FC<Props> = ({ outerView }) => {
  const { t } = useTranslation();
  const title = t("follows-page.title");
  const description = t("follows-page.description");
  return (
    <Page
      description={description}
      showTitle
      title={title}
      schemas={[
        ORGANIZATION_SCHEMA,
        {
          "@context": "https://schema.org",
          "@type": "Table",
          about: description
        }
      ]}
    >
      <NavigationTabs
        exploreTabName={EXPLORE_TAB_NAME}
        tabRoute={FOLLOW_TAB_ROUTE}
        favoritesTabName={FAVORITES_TAB_NAME}
      />
      <FacetCardsContainer
        key={"facets"}
        fileRoute={FOLLOW_FACET_FOLDER_ROUTE}
        title={title}
        assetsFacets={ASSETS_FACETS.FOLLOWS}
        composeFacetUrl={composeFollowFacetUrl}
      />
      <DefaultTableBlock>
        <FollowsTableSsr
          outerView={outerView}
          showSwitchView
          title={t("follows-page.table")}
        />
      </DefaultTableBlock>
    </Page>
  );
};

export default FollowsPage;
