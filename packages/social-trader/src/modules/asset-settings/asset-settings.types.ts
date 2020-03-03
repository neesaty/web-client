import { INewImage } from "components/form/input-image/input-image";
import {
  FollowDetailsFull,
  FundDetailsFull,
  PrivateTradingAccountFull,
  ProgramDetailsFull,
  ProgramFollowDetailsFull
} from "gv-api-web";

export type AssetDescriptionType = ProgramDetailsFull &
  FundDetailsFull &
  FollowDetailsFull &
  PrivateTradingAccountFull &
  ProgramFollowDetailsFull;

export type TUpdateAssetFunc = (
  values: {
    description?: string;
    logo?: INewImage;
    investmentLimit?: number;
    hasInvestmentLimit?: number;
    stopOutLevel?: number;
  },
  resetForm?: () => void
) => void;
