import {
  ACTION_STATUS_FILTER_DEFAULT_VALUE,
  ACTION_STATUS_FILTER_NAME
} from "components/dashboard/dashboard-assets/dashboard-programs/dashboard-programs.helpers";
import { FILTER_TYPE } from "components/table/helpers/filtering.helpers";
import React from "react";

export const DASHBOARD_ASSETS_FILTERING = {
  [ACTION_STATUS_FILTER_NAME]: ACTION_STATUS_FILTER_DEFAULT_VALUE
};

export const DASHBOARD_ASSETS_DEFAULT_FILTERS = [
  {
    type: FILTER_TYPE.GENERAL,
    name: ACTION_STATUS_FILTER_NAME,
    defaultValue: ACTION_STATUS_FILTER_DEFAULT_VALUE
  }
];

export const DASHBOARD_PUBLIC_FILTERING = DASHBOARD_ASSETS_FILTERING;

export const DASHBOARD_PUBLIC_DEFAULT_FILTERS = DASHBOARD_ASSETS_DEFAULT_FILTERS;

export const DASHBOARD_INVESTMENTS_FILTERING = DASHBOARD_ASSETS_FILTERING;

export const DASHBOARD_INVESTMENTS_DEFAULT_FILTERS = DASHBOARD_ASSETS_DEFAULT_FILTERS;

export const TitleContext = React.createContext("");
