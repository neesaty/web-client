import DateRangeFilter from "components/table/components/filtering/date-range-filter/date-range-filter";
import { DATE_RANGE_FILTER_NAME } from "components/table/components/filtering/date-range-filter/date-range-filter.constants";
import TableContainer from "components/table/components/table-container";
import {
  GetItemsFuncActionType,
  TableSelectorType
} from "components/table/components/table.types";
import { DEFAULT_PAGING } from "components/table/reducers/table-paging.reducer";
import { ProgramPeriodHistoryRow } from "pages/invest/programs/program-details/program-history-section/program-period-history/program-period-history-row";
import React from "react";
import { useTranslation } from "react-i18next";
import filesService from "services/file-service";
import { CurrencyEnum } from "utils/types";

import { PROGRAM_PERIOD_HISTORY } from "../../program-details.constants";
import DownloadButtonToolbar from "../download-button-toolbar/download-button-toolbar";

const _ProgramPeriodHistory: React.FC<Props> = ({
  getItems,
  dataSelector,
  currency,
  id
}) => {
  const [t] = useTranslation();
  return (
    <TableContainer
      exportButtonToolbarRender={(filtering: any) => (
        <DownloadButtonToolbar
          filtering={filtering!.dateRange}
          programId={id}
          getExportFileUrl={filesService.getPeriodExportFileUrl}
        />
      )}
      getItems={getItems}
      dataSelector={dataSelector}
      isFetchOnMount={true}
      renderFilters={(updateFilter, filtering) => (
        <DateRangeFilter
          name={DATE_RANGE_FILTER_NAME}
          value={filtering[DATE_RANGE_FILTER_NAME]}
          onChange={updateFilter}
          startLabel={t("filters.date-range.program-start")}
        />
      )}
      paging={DEFAULT_PAGING}
      columns={PROGRAM_PERIOD_HISTORY}
      renderHeader={column => (
        <span
          className={`details-trades__head-cell program-details-trades__cell--${column.name}`}
        >
          {t(`program-details-page.history.period-history.${column.name}`)}
        </span>
      )}
      renderBodyRow={period => (
        <ProgramPeriodHistoryRow period={period} currency={currency} />
      )}
    />
  );
};

interface Props {
  getItems: GetItemsFuncActionType;
  dataSelector: TableSelectorType;
  id: string;
  currency: CurrencyEnum;
}

const ProgramPeriodHistory = _ProgramPeriodHistory;
export default ProgramPeriodHistory;
