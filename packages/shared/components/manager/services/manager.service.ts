import { FundDetails, ProgramDetails } from "gv-api-web";
import fundsApi from "shared/services/api-client/funds-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";

import { IDataModel } from "../../table/helpers/mapper";

export const fetchManagerPrograms = (
  filter: any
): Promise<IDataModel<ProgramDetails>> => {
  return programsApi
    .v10ProgramsGet({
      ...filter,
      authorization: authService.getAuthArg(),
      hasInvestorsForClosed: true
    })
    .then(data => ({
      items: data.programs,
      total: data.total
    }));
};

export const fetchManagerFunds = (
  filter: any
): Promise<IDataModel<FundDetails>> => {
  return fundsApi
    .v10FundsGet({
      ...filter,
      authorization: authService.getAuthArg(),
      hasInvestorsForClosed: true
    })
    .then(data => ({
      items: data.funds,
      total: data.total
    }));
};

export const fetchManagerAssetsCount = (
  managerId: string
): Promise<IAssetsCountModel> => {
  const authorization = authService.getAuthArg();
  const filtering = { managerId, take: 0 };
  return Promise.all([
    programsApi.v10ProgramsGet({ ...filtering, authorization }),
    fundsApi.v10FundsGet({ ...filtering, authorization })
  ]).then(([programsData, fundsData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};

export interface IAssetsCountModel {
  programsCount: number;
  fundsCount: number;
}
