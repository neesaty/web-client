import { push } from "connected-react-router";
import { ProgramTag, ProgramsList } from "gv-api-web";
import { Location } from "history";
import { LOGIN_ROUTE } from "pages/auth/login/login.routes";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { Dispatch, bindActionCreators, compose } from "redux";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import {
  FilteringType,
  TFilter
} from "shared/components/table/components/filtering/filter.type";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import TagFilter from "shared/components/table/components/filtering/tag-filter/tag-filter";
import { TAG_FILTER_NAME } from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";
import RootState from "shared/reducers/root-reducer";
import { convertToArray } from "shared/utils/helpers";

import * as programsService from "../../services/programs-table.service";
import { composeCurrencyFilter } from "./program-table.helpers";
import ProgramsTable from "./programs-table";
import { CURRENCY_FILTER_NAME, LEVEL_FILTER_NAME } from "./programs.constants";

interface IProgramsTableContainerProps {
  isLocationChanged(location: Location): boolean;
  defaultFilters: any;
  showSwitchView: boolean;
  filters: { [keys: string]: any };
  title: string;
}

interface IProgramsTableContainerStateProps {
  isPending: boolean;
  data: any;
  isAuthenticated: boolean;
  currencies: string[];
  programTags: ProgramTag[];
}

interface IProgramsTableContainerDispatchProps {
  service: {
    toggleFavoriteProgram(programId: string, isFavorite: boolean): void;
    redirectToLogin(): void;
    getPrograms(filters: Object): void;
    fetchPrograms(filters: { [keys: string]: any }): Promise<ProgramsList>;
    getProgramsFilters(): (dispatch: any, getState: any) => Object;
    programsChangePage(
      nextPage: number
    ): (dispatch: any, getState: any) => void;
    programsChangeSorting(
      sorting: string
    ): (dispatch: any, getState: any) => void;
    programsChangeFilter(
      filter: TFilter<any>
    ): (dispatch: any, getState: any) => void;
  };
}

type Props = IProgramsTableContainerProps &
  IProgramsTableContainerStateProps &
  IProgramsTableContainerDispatchProps &
  InjectedTranslateProps &
  RouteComponentProps;

class ProgramsTableContainer extends React.Component<Props> {
  componentDidMount() {
    const { service, defaultFilters } = this.props;
    service.getPrograms(defaultFilters);
  }

  componentDidUpdate(prevProps: Props) {
    const { service, isLocationChanged, defaultFilters } = this.props;
    if (isLocationChanged(prevProps.location)) {
      service.getPrograms(defaultFilters);
    }
  }

  render() {
    const {
      programTags,
      t,
      showSwitchView,
      currencies,
      isPending,
      data,
      filters,
      service,
      isAuthenticated,
      title
    } = this.props;
    const tagsFilterValue = (value: any) => {
      //TODO Fix any
      if (!programTags.length) return [];
      return convertToArray(value).map(tag => {
        const programTag = programTags.find(
          programTag => programTag.name === tag
        );
        const color = programTag!.color;
        return { name: tag, color };
      });
    };
    return (
      <ProgramsTable
        showSwitchView={showSwitchView}
        title={title}
        data={data || {}}
        isPending={isPending}
        sorting={filters.sorting}
        updateSorting={service.programsChangeSorting}
        filtering={{
          ...filters.filtering
        }}
        updateFilter={service.programsChangeFilter}
        renderFilters={(updateFilter, filtering: FilteringType) => {
          return (
            <React.Fragment>
              <TagFilter
                name={TAG_FILTER_NAME}
                value={tagsFilterValue(filtering[TAG_FILTER_NAME])}
                values={programTags}
                onChange={updateFilter}
              />
              <LevelFilter
                name={LEVEL_FILTER_NAME}
                value={filtering[LEVEL_FILTER_NAME] as number[]} //TODO fix filtering types
                onChange={updateFilter}
              />
              <SelectFilter
                name={CURRENCY_FILTER_NAME}
                label="Currency"
                value={filtering[CURRENCY_FILTER_NAME]}
                values={composeCurrencyFilter(currencies)}
                onChange={updateFilter}
              />
              <DateRangeFilter
                name={DATE_RANGE_FILTER_NAME}
                value={filtering[DATE_RANGE_FILTER_NAME]}
                onChange={updateFilter}
                startLabel={t("filters.date-range.program-start")}
              />
            </React.Fragment>
          );
        }}
        paging={{
          totalPages: filters.pages,
          currentPage: filters.page,
          itemsOnPage: filters.itemsOnPage,
          totalItems: data ? data.total : 0
        }}
        updatePaging={service.programsChangePage}
        toggleFavorite={service.toggleFavoriteProgram}
        redirectToLogin={service.redirectToLogin}
        isAuthenticated={isAuthenticated}
        currencies={currencies}
      />
    );
  }
}

const mapStateToProps = (
  state: RootState
): IProgramsTableContainerStateProps => {
  const { isAuthenticated } = state.authData;
  const { isPending, data } = state.programsData.items;
  const currencies = state.platformData.data
    ? state.platformData.data.currencies
    : [];
  const programTags = state.platformData.data
    ? state.platformData.data.enums.program.programTags
    : [];
  return {
    isPending,
    data,
    isAuthenticated,
    currencies,
    programTags
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch
): IProgramsTableContainerDispatchProps => ({
  service: bindActionCreators(
    {
      ...programsService,
      toggleFavoriteProgram: toggleFavoriteProgramDispatchable,
      redirectToLogin: () => push(LOGIN_ROUTE)
    },
    dispatch
  )
});

const mergeProps = (
  stateProps: IProgramsTableContainerStateProps,
  dispatchProps: IProgramsTableContainerDispatchProps,
  ownProps: RouteComponentProps
) => {
  const { location } = ownProps;
  const isLocationChanged = (prevLocation: Location) => {
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
  translate(),
  connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
  )
)(ProgramsTableContainer);
