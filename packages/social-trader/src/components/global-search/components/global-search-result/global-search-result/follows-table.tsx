import "modules/programs-table/components/programs-table/programs.scss";

import { Table } from "components/table/components";
import { ItemsViewModelFollowDetailsListItem } from "gv-api-web";
import FollowTableRowShort from "modules/follows-table/components/follow-table-row-short";
import { FOLLOW_COLUMNS } from "modules/follows-table/components/follows.constants";
import React from "react";
import { useTranslation } from "react-i18next";

import { SearchTableProps } from "./global-search-result";

const _FollowsTable: React.FC<SearchTableProps<
  ItemsViewModelFollowDetailsListItem
>> = ({ data }) => {
  const [t] = useTranslation();
  return (
    <Table
      columns={FOLLOW_COLUMNS}
      items={data.items}
      renderHeader={column => (
        <span
          className={`programs-table__cell programs-table__cell--${column.name}`}
        >
          {t(`follows-page.header.${column.name}`)}
        </span>
      )}
      renderBodyRow={follow => <FollowTableRowShort follow={follow} />}
    />
  );
};

export const FollowsTable = _FollowsTable;
