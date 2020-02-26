import withLoader from "decorators/with-loader";
import React, { useCallback } from "react";
import { Dispatch } from "redux";
import { TGetState } from "utils/types";

import {
  getSortingColumnName,
  getSortingDirection as getSortingDirectionHelper,
  SORTING_DIRECTION
} from "../helpers/sorting.helpers";
import { SortingColumn } from "./filtering/filter.type";
import TableHeadCell from "./table-head-cell";
import TableRow from "./table-row";
import { TRenderHeaderFunc, UpdateSortingFuncType } from "./table.types";

const _TableHeader: React.FC<ITableHeaderProps> = ({
  sorting,
  updateSorting,
  columns,
  renderHeader
}) => (
  <thead className="table__head">
    <TableRow className="table__row--head">
      <TableColumns
        condition={!!columns}
        columns={columns!}
        updateSorting={updateSorting}
        renderHeader={renderHeader}
        sorting={sorting}
      />
    </TableRow>
  </thead>
);

export interface ITableHeaderProps {
  sorting?: string;
  updateSorting?: UpdateSortingFuncType;
  columns?: SortingColumn[];
  renderHeader?: TRenderHeaderFunc;
}

const getSortingDirection = (
  name?: string,
  sorting?: string
): SORTING_DIRECTION =>
  (name !== getSortingColumnName(sorting) && SORTING_DIRECTION.NONE) ||
  getSortingDirectionHelper(sorting);

const isSortable = (sortingName?: string): boolean => sortingName !== undefined;

const _TableColumns: React.FC<IColumnsProps> = ({
  columns,
  updateSorting,
  renderHeader,
  sorting
}) => {
  const handleSorting: HandleSortingType = useCallback(
    name => () => {
      if (
        name !== getSortingColumnName(sorting) ||
        getSortingDirectionHelper(sorting) === SORTING_DIRECTION.ASC
      ) {
        return updateSorting && updateSorting(name + SORTING_DIRECTION.DESC);
      }
      return updateSorting && updateSorting(name + SORTING_DIRECTION.ASC);
    },
    [sorting, updateSorting]
  );
  return (
    <>
      {columns.map(column => (
        <TableHeadCell
          key={column.name}
          sortable={!!updateSorting && isSortable(column.sortingName)}
          onClick={handleSorting(column.sortingName)}
          sortingDirection={getSortingDirection(column.sortingName, sorting)}
        >
          {column.name && renderHeader ? renderHeader(column) : null}
        </TableHeadCell>
      ))}
    </>
  );
};
const TableColumns = withLoader(_TableColumns);

interface IColumnsProps {
  sorting?: string;
  columns: SortingColumn[];
  updateSorting?: UpdateSortingFuncType;
  renderHeader?: TRenderHeaderFunc;
}

type HandleSortingType = (
  sortingName?: string
) => () => ((dispatch: Dispatch, getState: TGetState) => void) | void;

const TableHeader = _TableHeader;
export default TableHeader;
