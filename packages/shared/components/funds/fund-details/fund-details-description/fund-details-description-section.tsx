import "shared/components/details/details-description-section/details-description/details-description.scss";

import { FundDetailsFull } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import AssetAvatar from "shared/components/avatar/asset-avatar/asset-avatar";
import DetailsInvestment from "shared/components/details/details-description-section/details-investment/details-investment";
import { InvestmentDetails } from "shared/components/details/details-description-section/details-investment/details-investment.helpers";
import { FUND_ASSET_TYPE } from "shared/components/fund-asset/fund-asset";
import FundAssetContainer from "shared/components/fund-asset/fund-asset-container";
import FundDetailsDescription from "shared/components/funds/fund-details/fund-details-description/fund-details-description";
import { HORIZONTAL_POPOVER_POS } from "shared/components/popover/popover";
import Tooltip from "shared/components/tooltip/tooltip";
import { FUND, STATUS } from "shared/constants/constants";
import { composeFundNotificationsUrl } from "shared/utils/compose-url";

import {
  IFundControlsProps,
  IFundWithdrawalContainerProps
} from "../fund-details.types";

const _FundFundDetailsDescription: React.FC<Props> = ({
  t,
  accountCurrency,
  isAuthenticated,
  redirectToLogin,
  fundDescription,
  FundControls,
  FundWithdrawContainer
}) => {
  const { personalFundDetails } = fundDescription;
  const assetDescription = {
    id: fundDescription.id,
    title: fundDescription.title,
    description: fundDescription.description,
    logo: fundDescription.logo,
    notificationsUrl: composeFundNotificationsUrl(fundDescription.url),
    isFavorite: fundDescription.personalFundDetails
      ? fundDescription.personalFundDetails.isFavorite
      : false,
    hasNotifications: fundDescription.personalFundDetails
      ? fundDescription.personalFundDetails.hasNotifications
      : false,
    managerUrl: fundDescription.manager.url,
    managerName: fundDescription.manager.username
  };

  return (
    <div className="program-details-description">
      <FundDetailsDescription
        assetDescription={assetDescription}
        AssetDetailsAvatar={() => (
          <div className="details-description__avatar">
            <AssetAvatar
              url={fundDescription.logo}
              alt={fundDescription.title}
              size="big"
              color={fundDescription.color}
            />
          </div>
        )}
        AssetDetailsExtraBlock={() => (
          <div className="details-description__info-block">
            <Tooltip
              horizontal={HORIZONTAL_POPOVER_POS.LEFT}
              render={() => (
                <div className="tooltip__content">
                  {t("fund-details-page.tooltip.assets")}
                </div>
              )}
            >
              <h4 className="details-description__subheading tooltip__label">
                {t("fund-details-page.description.assets")}
              </h4>
            </Tooltip>
            <div>
              <FundAssetContainer
                type={FUND_ASSET_TYPE.LARGE}
                assets={fundDescription.currentAssets}
                size={7}
              />
            </div>
          </div>
        )}
      />
      <FundControls
        fundDescription={fundDescription}
        isAuthenticated={isAuthenticated}
        redirectToLogin={redirectToLogin}
      />

      {personalFundDetails && personalFundDetails.status !== STATUS.ENDED && (
        <div className="program-details-description__additionally">
          <DetailsInvestment
            asset={FUND}
            id={fundDescription.id}
            assetCurrency={"GVT"}
            accountCurrency={accountCurrency}
            personalDetails={personalFundDetails as InvestmentDetails}
            WithdrawContainer={FundWithdrawContainer}
          />
        </div>
      )}
    </div>
  );
};

interface Props extends InjectedTranslateProps {
  fundDescription: FundDetailsFull;
  isAuthenticated: boolean;
  redirectToLogin(): void;
  FundControls: React.ComponentType<IFundControlsProps>;
  FundWithdrawContainer: React.ComponentType<IFundWithdrawalContainerProps>;
  accountCurrency: string;
}

const FundFundDetailsDescription = React.memo(
  translate()(_FundFundDetailsDescription)
);
export default FundFundDetailsDescription;
