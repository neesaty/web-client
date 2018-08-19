import {
  getSortingColumnName,
  isSortingAsc
} from "modules/sorting/helpers/sorting-helpers";
import React, { Component } from "react";

import TableRow from "./table-row";

class TableHead extends Component {
  sortingName = () => getSortingColumnName(this.props.sorting);

  isAsc = () => isSortingAsc(this.props.sorting);

  handleSorting = sortingName => e => {
    if (sortingName !== this.sortingName() || this.isAsc()) {
      return this.props.updateSorting(sortingName + "Desc");
    }

    return this.props.updateSorting(sortingName + "Asc");
  };

  renderChildren = () => {
    if (this.props.sorting !== undefined) {
      return this.props.children({
        sortingName: this.sortingName(),
        isAsc: this.isAsc(),
        handleSorting: this.handleSorting
      });
    }
    return this.props.children;
  };

  render() {
    return (
      <div className="table__head">
        <TableRow className="table__row--head">
          {this.renderChildren()}
        </TableRow>
      </div>
    );
  }
}

export default TableHead;
