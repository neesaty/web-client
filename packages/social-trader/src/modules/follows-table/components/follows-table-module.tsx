import "modules/programs-table/components/programs-table/programs.scss";

import TableModule, {
  ITableModuleProps
} from "components/table/components/table-module";
import * as React from "react";

import FollowTableHeaderCell from "./follow-table-header-cell";
import FollowTableRow from "./follow-table-row-short";
import { followListLoaderData } from "./follow-table.loader-data";
import { FOLLOW_COLUMNS } from "./follows.constants";

const FollowsTableModule: React.FC<Props> = ({
  renderMappings,
  getItems,
  renderFilters,
  sorting,
  filtering,
  defaultFilters,
  paging,
  showRating,
  title,
  disableTitle,
  columns
}) => {
  return (
    <TableModule
      loaderData={followListLoaderData}
      renderMappings={renderMappings}
      disableTitle={disableTitle}
      getItems={getItems}
      defaultFilters={defaultFilters}
      filtering={filtering}
      sorting={sorting}
      renderFilters={renderFilters}
      paging={paging}
      title={title}
      columns={columns || FOLLOW_COLUMNS}
      renderHeader={column => <FollowTableHeaderCell column={column} />}
      renderBodyRow={(
        follow,
        updateRow: any //TODO fix updateRow
      ) => (
        <FollowTableRow
          updateRow={updateRow}
          showRating={showRating}
          follow={follow}
        />
      )}
    />
  );
};

interface Props extends ITableModuleProps {
  showRating?: boolean;
  title?: string;
}

export default FollowsTableModule;
