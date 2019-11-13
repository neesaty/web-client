import statisticPeriodReducerCreator from "shared/components/details/reducers/statistic-period.reducer";
import { fieldSelector } from "shared/utils/selectors";

import { SET_FOLLOW_STATISTIC_PERIOD } from "../follow-details.constants";

export const statisticPeriodSelector = fieldSelector(
  state => state.followDetails.statisticPeriod
);

const statisticPeriodReducer = statisticPeriodReducerCreator(
  SET_FOLLOW_STATISTIC_PERIOD
);

export default statisticPeriodReducer;
