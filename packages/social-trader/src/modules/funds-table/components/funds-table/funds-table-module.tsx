import "./funds-table.scss";

import TableModule, {
  ITableModuleProps
} from "components/table/components/table-module";
import * as React from "react";

import FundsTableRow from "./fund-table-row";
import { fundListLoaderDataWithCount } from "./fund-table.loader-data";
import FundsTableHeaderCell from "./funds-table-header-cell";
import { FUNDS_TABLE_COLUMNS } from "./funds-table.constants";

interface Props extends ITableModuleProps {
  loaderCount?: number;
}

const FundsTableModule: React.FC<Props> = React.memo(
  ({
    loaderCount,
    getItems,
    renderMappings,
    sorting,
    filtering,
    defaultFilters,
    paging,
    title,
    disableTitle
  }) => {
    return (
      <TableModule
        loaderData={fundListLoaderDataWithCount(loaderCount)}
        disableTitle={disableTitle}
        getItems={getItems}
        defaultFilters={defaultFilters}
        filtering={filtering}
        sorting={sorting}
        renderMappings={renderMappings}
        paging={paging}
        title={title}
        columns={FUNDS_TABLE_COLUMNS}
        renderHeader={column => <FundsTableHeaderCell column={column} />}
        renderBodyRow={(fund, updateRow = () => {}) => (
          <FundsTableRow updateRow={updateRow} fund={fund} />
        )}
      />
    );
  }
);

export default FundsTableModule;
