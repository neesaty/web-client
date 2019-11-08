import { LevelsParamsInfo } from "gv-api-web";
import * as React from "react";
import { compose } from "redux";
import SignalProviderControls from "shared/components/details/details-description-section/details-description/controls/signal-provider-controls/signal-provider-controls";
import { IProgramControlsProps } from "shared/components/programs/program-details/program-details.types";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "shared/decorators/with-blur-loader";

import InvestmentProgramControls from "./investment-program-controls";

const _ProgramControls: React.FC<Props> = ({
  programDescription,
  data: levelsParameters,
  isAuthenticated
}) => {
  const personalProgramDetails = programDescription.personalDetails;
  const canCloseAsset =
    personalProgramDetails &&
    personalProgramDetails.isOwnAsset &&
    personalProgramDetails.ownerActions.canClose;
  const isOwnProgram =
    personalProgramDetails && personalProgramDetails.isOwnAsset;

  return (
    <div className="asset-details-description__controls">
      <InvestmentProgramControls
        programDescription={programDescription}
        canCloseAsset={canCloseAsset}
        isOwnProgram={isOwnProgram}
        isAuthenticated={isAuthenticated}
        levelsParameters={levelsParameters}
      />
    </div>
  );
};

interface Props extends IProgramControlsProps {}

const ProgramControls = compose<
  React.ComponentType<
    IProgramControlsProps & WithBlurLoaderProps<LevelsParamsInfo>
  >
>(
  withBlurLoader,
  React.memo
)(_ProgramControls);
export default ProgramControls;
