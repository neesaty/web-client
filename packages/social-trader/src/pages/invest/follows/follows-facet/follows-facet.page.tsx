import "./follows-facet.scss";

import DetailsBlock from "components/details/details-block";
import FacetContainer, {
  FACET_ASSET
} from "components/facet-container/facet-container";
import Page from "components/page/page";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { ItemsViewModelFollowDetailsListItem } from "gv-api-web";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import FollowsFacetTable from "./components/follows-facet-table";

const _ProgramsFacetPage: React.FC<Props> = ({ t, id }) => {
  const getFollows = useCallback(
    (
      filters: ComposeFiltersAllType
    ): Promise<ItemsViewModelFollowDetailsListItem> =>
      fetchFollows({
        ...filters
      }),
    []
  );

  return (
    <Page
      description={`${t("follows-page.title")} ${t(`facets.${id}`)} facet list`}
      showTitle
      title={`${t("follows-page.title")} ${t(`facets.${id}`)}`}
    >
      <DetailsBlock table>
        <FacetContainer
          id={id}
          asset={FACET_ASSET.FOLLOWS}
          TableContainer={FollowsFacetTable}
          getItems={getFollows}
        />
      </DetailsBlock>
    </Page>
  );
};

interface Props extends WithTranslation {
  id: string;
}

const FollowsFacetPage = translate()(_ProgramsFacetPage);
export default FollowsFacetPage;
