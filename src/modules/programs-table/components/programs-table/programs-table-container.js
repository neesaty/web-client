import Surface from "components/surface/surface";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { bindActionCreators, compose } from "redux";

import { toggleFavoriteProgram } from "../../../favorite-program/services/favorite-program.service";
import * as programsService from "../../services/programs-table.service";
import ProgramsTable from "./programs-table";

class ProgramsContainer extends Component {
  componentDidMount() {
    const { service } = this.props;
    service.getPrograms();
  }

  componentDidUpdate(prevProps) {
    const { service, isLocationChanged } = this.props;
    if (isLocationChanged(prevProps.location)) {
      service.getPrograms();
    }
  }

  toggleFavorite = (programId, isFavorite) => () => {
    console.log(isFavorite);
  };

  render() {
    const { isPending, data, filters, service, isAuthenticated } = this.props;
    if (!data) return <div>Loading...</div>;
    return (
      <Surface>
        <ProgramsTable
          data={data}
          isPending={isPending}
          sorting={{
            value: filters.sorting,
            updateSorting: service.programsChangeSorting
          }}
          filtering={{
            ...filters.filtering,
            updateFilter: service.programsChangeFilter
          }}
          paging={{
            total: filters.pages,
            current: filters.page,
            updatePaging: service.programsChangePage
          }}
          toggleFavorite={service.toggleFavoriteProgram}
          isAuthenticated={isAuthenticated}
        />
      </Surface>
    );
  }
}

const mapStateToProps = state => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.programsData.items;
  return { isPending, data, isAuthenticated };
};

const mapDispatchToProps = dispatch => ({
  service: bindActionCreators(
    { ...programsService, toggleFavoriteProgram },
    dispatch
  )
});

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { location } = ownProps;
  const isLocationChanged = prevLocation => {
    return location.key !== prevLocation.key;
  };
  const filters = dispatchProps.service.getProgramsFilters();
  return {
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    filters,
    isLocationChanged
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(ProgramsContainer);
