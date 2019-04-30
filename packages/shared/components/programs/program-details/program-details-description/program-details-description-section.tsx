import "./program-details-description.scss";

import { ProgramDetailsFull } from "gv-api-web";
import * as React from "react";
import { ComponentType } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { PROGRAM, STATUS } from "shared/constants/constants";

import ProgramDetailsDescriptionMain from "./program-details-description-main";

class ProgramDetailsDescriptionSection extends React.PureComponent<
  IProgramDetailsDescriptionSectionProps
> {
  render() {
    const {
      t,
      accountCurrency,
      programDescription,
      isAuthenticated,
      redirectToLogin,
      ProgramControls,
      ChangePasswordTradingAccount,
      ProgramReinvestingWidget,
      ProgramWithdrawContainer
    } = this.props;

    const personalDetails = programDescription.personalProgramDetails;
    const isOwnProgram = personalDetails && personalDetails.isOwnProgram;
    return (
      <div className="program-details-description">
        <ProgramDetailsDescriptionMain
          programDescription={programDescription}
          isOwnProgram={isOwnProgram}
          ChangePasswordTradingAccount={ChangePasswordTradingAccount}
        />
        <ProgramControls
          programDescription={programDescription}
          canCloseProgram={personalDetails && personalDetails.canCloseProgram}
          canMakeSignalProvider={
            personalDetails && personalDetails.canMakeSignalProvider
          }
          isOwnProgram={isOwnProgram}
          canInvest={personalDetails && personalDetails.canInvest}
          canWithdraw={personalDetails && personalDetails.canWithdraw}
          isAuthenticated={isAuthenticated}
          redirectToLogin={redirectToLogin}
        />
        {personalDetails &&
          personalDetails.isInvested &&
          personalDetails.status !== STATUS.ENDED && (
            <div className="program-details-description__additionally">
              <DetailsInvestment
                notice={t(
                  "program-details-page.description.withdraw-notice-text"
                )}
                asset={PROGRAM}
                id={programDescription.id}
                assetCurrency={programDescription.currency}
                accountCurrency={accountCurrency}
                personalDetails={personalDetails as InvestmentDetails} // TODO fix type InvestmentDetails
                ProgramReinvestingWidget={ProgramReinvestingWidget}
                WithdrawContainer={ProgramWithdrawContainer}
              />
            </div>
          )}
      </div>
    );
  }
}

interface IProgramDetailsDescriptionSectionProps
  extends InjectedTranslateProps {
  accountCurrency: string;
  programDescription: ProgramDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  ProgramControls: ComponentType<any>;
  ProgramWithdrawContainer: ComponentType<any>;
  ProgramReinvestingWidget?: ComponentType<any>;
  ChangePasswordTradingAccount?: ComponentType<any>;
}

export default translate()(ProgramDetailsDescriptionSection);
