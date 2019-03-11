import React, { Component } from "react";

import {
  SortingDirection_old,
  getSortingColumnName,
  getSortingDirection
} from "../helpers/sorting.helpers";
import TableHeadCell from "./table-head-cell";
import TableRow from "./table-row";

class TableHeader extends Component {
  sortingName = () => getSortingColumnName(this.props.sorting);

  getSortingDirection = sortingName => {
    if (sortingName !== this.sortingName()) return SortingDirection_old.none;
    return getSortingDirection(this.props.sorting);
  };

  isSortable = sortingName => sortingName !== undefined;

  handleSorting = sortingName => e => {
    if (
      sortingName !== this.sortingName() ||
      SortingDirection_old.asc === getSortingDirection(this.props.sorting)
    ) {
      return this.props.updateSorting(sortingName + SortingDirection_old.desc);
    }

    return this.props.updateSorting(sortingName + SortingDirection_old.asc);
  };

  renderColumns = () => {
    return this.props.columns.map(column => {
      return (
        <TableHeadCell
          key={column.name}
          sortable={
            !!this.props.updateSorting && this.isSortable(column.sortingName)
          }
          onClick={this.handleSorting(column.sortingName)}
          sortingDirection={this.getSortingDirection(column.sortingName)}
        >
          {this.props.children(column)}
        </TableHeadCell>
      );
    });
  };

  render() {
    return (
      <thead className="table__head">
        <TableRow className="table__row--head">{this.renderColumns()}</TableRow>
      </thead>
    );
  }
}

export default TableHeader;
