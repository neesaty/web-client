import { CardsIcon } from "components/icon/cards-icon";
import { TableIcon } from "components/icon/table-icon";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import SortingFilter from "components/table/components/sorting/sorting-filter/sorting-filter";
import React, { useCallback } from "react";

import { LIST_VIEW } from "../table.constants";
import { FilteringType, SortingColumn } from "./filtering/filter.type";
import styles from "./table.module.scss";
import {
  RenderFiltersFuncType,
  RenderSortingFuncType,
  UpdateFilterFunc,
  UpdateSortingFuncType
} from "./table.types";

const _TableToolbar: React.FC<ITableToolbarExternalProps &
  ITableToolbarInnerProps> = ({
  onChange,
  disableTitle,
  createButtonToolbar,
  exportButtonToolbar,
  title,
  renderMappings,
  renderFilters,
  updateFilter,
  filtering,
  view,
  columns,
  sorting,
  updateSorting,
  renderSorting,
  isViewSwitchEnabled,
  hide
}) => {
  const handleIconClick = useCallback(
    (view: LIST_VIEW) => () => {
      onChange(view);
    },
    [onChange]
  );

  if (hide) return null;

  const showTitle = title && !disableTitle;
  const showMappings = renderMappings && updateFilter && filtering;
  const showSortingFilter = view === LIST_VIEW.CARDS && sorting !== undefined;
  return (
    <Row className={styles["table__toolbar"]}>
      {!showTitle && !showMappings && !showSortingFilter && <div />}
      {showTitle && (
        <RowItem>
          <h3 className={styles["table__title"]}>{title}</h3>
        </RowItem>
      )}
      {showMappings && (
        <div className={styles["table__mapping"]}>
          <Row wrap>{renderMappings!(updateFilter!, filtering!)}</Row>
        </div>
      )}
      <div className={styles["table__sorting-filter"]}>
        {showSortingFilter && (
          <SortingFilter
            sorting={sorting}
            columns={columns}
            updateSorting={updateSorting}
            renderValueText={renderSorting}
          />
        )}
      </div>
      <RowItem>
        <Row>
          <RowItem>
            <Row wrap>
              {renderFilters &&
                updateFilter &&
                filtering &&
                renderFilters(updateFilter, filtering)}
              {createButtonToolbar && <RowItem>{createButtonToolbar}</RowItem>}
              {exportButtonToolbar && <RowItem>{exportButtonToolbar}</RowItem>}
            </Row>
          </RowItem>
          {isViewSwitchEnabled && (
            <RowItem>
              <Row className={styles["table__toggle"]}>
                <div
                  className={styles["table__toggle-icon"]}
                  onClick={handleIconClick(LIST_VIEW.CARDS)}
                >
                  <CardsIcon primary={view === LIST_VIEW.CARDS} />
                </div>
                <div
                  className={styles["table__toggle-icon"]}
                  onClick={handleIconClick(LIST_VIEW.TABLE)}
                >
                  <TableIcon primary={view === LIST_VIEW.TABLE} />
                </div>
              </Row>
            </RowItem>
          )}
        </Row>
      </RowItem>
    </Row>
  );
};

interface ITableToolbarInnerProps {
  view: LIST_VIEW;
  isViewSwitchEnabled: boolean;

  onChange(view: LIST_VIEW): any;

  exportButtonToolbar?: JSX.Element;
}

export interface ITableToolbarExternalProps {
  disableTitle?: boolean;
  createButtonToolbar?: JSX.Element;
  title?: JSX.Element | string;
  renderMappings?: RenderFiltersFuncType;
  renderFilters?: RenderFiltersFuncType;
  updateFilter?: UpdateFilterFunc;
  filtering?: FilteringType;
  columns?: SortingColumn[];
  sorting?: string;
  updateSorting?: UpdateSortingFuncType;
  renderSorting?: RenderSortingFuncType;
  hide?: boolean;
}

const TableToolbar = React.memo(_TableToolbar);
export default TableToolbar;
