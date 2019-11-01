import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Push } from "shared/components/link/link";
import DateRangeFilter from "shared/components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "shared/components/table/components/filtering/date-range-filter/date-range-filter.constants";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import LevelFilter from "shared/components/table/components/filtering/level-filter/level-filter";
import { LevelFilterType } from "shared/components/table/components/filtering/level-filter/level-filter.constants";
import SelectFilter from "shared/components/table/components/filtering/select-filter/select-filter";
import { SelectFilterType } from "shared/components/table/components/filtering/select-filter/select-filter.constants";
import TagFilter from "shared/components/table/components/filtering/tag-filter/tag-filter";
import { TAG_FILTER_NAME } from "shared/components/table/components/filtering/tag-filter/tag-filter.constants";
import { calculateTotalPages } from "shared/components/table/helpers/paging.helpers";
import useRouteFilters from "shared/hooks/route-filters.hook";
import { useTranslation } from "shared/i18n";
import { toggleFavoriteProgramDispatchable } from "shared/modules/favorite-asset/services/favorite-program.service";
import {
  DEFAULT_PROGRAM_TABLE_FILTERS,
  SHOW_IN_CURRENCY_FILTER,
  SORTING_FILTER_NAME,
  SORTING_FILTER_VALUE
} from "shared/modules/programs-table/components/programs-table/programs.constants";
import { isAuthenticatedSelector } from "shared/reducers/auth-reducer";
import {
  platformCurrenciesSelector,
  programCurrenciesSelector,
  programTagsSelector
} from "shared/reducers/platform-reducer";
import { LOGIN_ROUTE } from "shared/routes/app.routes";

import { programsDataSelector } from "../../reducers/programs-table.reducers";
import {
  composeCurrencyFilter,
  composeCurrencyMap
} from "./program-table.helpers";
import ProgramsTable from "./programs-table";
import {
  LEVEL_FILTER_NAME,
  PROGRAM_CURRENCY_FILTER_NAME
} from "./programs.constants";

const ITEMS_ON_PAGE = 12;

const _ProgramsTableSSR: React.FC<Props> = ({ title, showSwitchView }) => {
  const dispatch = useDispatch();
  const programCurrencies = useSelector(programCurrenciesSelector);
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const currencies = useSelector(platformCurrenciesSelector);
  const programTags = useSelector(programTagsSelector);
  const data = useSelector(programsDataSelector);
  const { t } = useTranslation();

  const [filtering, sorting, page, update] = useRouteFilters(
    DEFAULT_PROGRAM_TABLE_FILTERS
  );

  if (!data) return null;
  const totalPages = calculateTotalPages(data.total, ITEMS_ON_PAGE);
  return (
    <ProgramsTable
      showSwitchView={showSwitchView}
      title={title}
      data={data.items}
      sorting={sorting || SORTING_FILTER_VALUE}
      updateSorting={value => update({ name: SORTING_FILTER_NAME, value })}
      filtering={filtering}
      updateFilter={update}
      renderMappings={(updateFilter, filtering) => (
        <>
          <SelectFilter
            name={SHOW_IN_CURRENCY_FILTER}
            label={t("filters.currency.show-in")}
            value={filtering && filtering[SHOW_IN_CURRENCY_FILTER]}
            values={composeCurrencyMap(currencies)}
            onChange={updateFilter}
          />
          <DateRangeFilter
            name={DATE_RANGE_FILTER_NAME}
            value={filtering && filtering[DATE_RANGE_FILTER_NAME]}
            onChange={updateFilter}
            label={t("filters.date-range.for")}
            startLabel={t("filters.date-range.fund-start")}
          />
        </>
      )}
      renderFilters={(updateFilter, filtering: FilteringType) => (
        <>
          <TagFilter
            name={TAG_FILTER_NAME}
            value={filtering[TAG_FILTER_NAME] as string[]}
            values={programTags}
            onChange={updateFilter}
          />
          <LevelFilter
            name={LEVEL_FILTER_NAME}
            value={filtering[LEVEL_FILTER_NAME] as LevelFilterType} //TODO fix filtering types
            onChange={updateFilter}
          />
          <SelectFilter
            name={PROGRAM_CURRENCY_FILTER_NAME}
            label="Currency"
            value={filtering[PROGRAM_CURRENCY_FILTER_NAME] as SelectFilterType} //TODO fix filtering types
            values={composeCurrencyFilter(programCurrencies)}
            onChange={updateFilter}
          />
        </>
      )}
      paging={{
        totalPages: totalPages,
        currentPage: page,
        itemsOnPage: ITEMS_ON_PAGE,
        totalItems: data.total
      }}
      updatePaging={page => update({ name: "page", value: page + 1 })}
      toggleFavorite={(id: string, isFavorite: boolean) =>
        dispatch(toggleFavoriteProgramDispatchable(id, isFavorite))
      }
      redirectToLogin={() => Push(LOGIN_ROUTE)}
      isAuthenticated={isAuthenticated}
      currencies={programCurrencies}
    />
  );
};

interface Props {
  showSwitchView: boolean;
  title: string;
}

const ProgramsTableSSR = React.memo(_ProgramsTableSSR);
export default ProgramsTableSSR;
