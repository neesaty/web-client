import React, { Component } from "react";
import { translate } from "react-i18next";
import { compose } from "redux";
import { fetchPrograms } from "shared/modules/programs-table/services/programs-table.service";
import ProgramsTableModule from "shared/modules/programs-table/components/programs-table/programs-table-module";

class ProgramsRatingTable extends Component {
  state = {
    programs: null,
    isPending: true,
    currentPage: 1,
    itemsOnPage: 10,
    totalPages: 0
  };

  componentDidMount() {
    // const { tab } = this.props;
    this.updatePrograms();
  }

  updatePaging = e => {
    // const { paging } = this.state;
    this.setState({ currentPage: e + 1 }, () => this.updatePrograms());
    // console.log(e, this.state.currentPage);
  };

  updatePrograms = filters => {
    const { managerId, tab } = this.props;
    const { itemsOnPage, currentPage } = this.state;
    fetchPrograms({
      managerId,
      tab,
      take: itemsOnPage,
      skip: itemsOnPage * (currentPage - 1),
      ...filters
    }).then(programs => {
      const totalPages = Math.round(programs.total / itemsOnPage);
      this.setState({
        programs,
        isPending: false,
        itemsOnPage,
        currentPage,
        totalPages
      });
    });
  };

  render() {
    const { title } = this.props;
    const {
      programs,
      isPending,
      totalPages,
      currentPage,
      itemsOnPage
    } = this.state;
    if (isPending) return null;
    // if (isPending || !totalPages) return null;
    return (
      <ProgramsTableModule
        title={title}
        data={programs}
        paging={{ totalPages, currentPage, itemsOnPage }}
        isPending={isPending}
        updatePaging={this.updatePaging}
      />
    );
  }
}

export default compose(translate())(ProgramsRatingTable);
