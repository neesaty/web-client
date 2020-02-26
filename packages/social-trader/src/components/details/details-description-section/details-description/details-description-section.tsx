import "components/details/details-description-section/details-description/details-description.scss";

import DetailsDescription from "components/details/details-description-section/details-description/details-description";
import {
  DETAILS_TYPE,
  PersonalDetailsType
} from "components/details/details.types";
import { ToType } from "components/link/link";
import { ASSET } from "constants/constants";
import { ProgramDetailsFull, SocialLinkViewModel } from "gv-api-web";
import * as React from "react";
import { CurrencyEnum } from "utils/types";

const _DetailsDescriptionSection: React.FC<Props> = ({
  descriptionTitle,
  detailsType,
  personalDetails,
  isOwnAsset,
  id,
  title,
  logo,
  color,
  currency,
  subtitleUrl,
  socialLinks,
  subtitle,
  asset,
  notificationsUrl,
  settingsUrl,
  programDetails,
  PerformanceData,
  AssetDetailsExtraBlock,
  description,
  Controls
}) => {
  return (
    <div className="details-description__section">
      <DetailsDescription
        descriptionTitle={descriptionTitle}
        detailsType={detailsType}
        personalDetails={personalDetails}
        isOwnAsset={isOwnAsset}
        id={id}
        title={title}
        logo={logo}
        color={color}
        currency={currency}
        subtitleUrl={subtitleUrl}
        socialLinks={socialLinks}
        subtitle={subtitle}
        asset={asset}
        programDetails={programDetails}
        description={description}
        AssetDetailsExtraBlock={AssetDetailsExtraBlock}
        notificationsUrl={notificationsUrl}
        settingsUrl={settingsUrl}
      />
      {PerformanceData && <PerformanceData />}
      {Controls && (
        <div className="asset-details-description__controls">
          <Controls />
        </div>
      )}
    </div>
  );
};

interface Props {
  descriptionTitle?: string;
  detailsType: DETAILS_TYPE;
  id: string;
  logo: string;
  title: string;
  isOwnAsset?: boolean;
  personalDetails?: PersonalDetailsType;
  color?: string;
  currency?: CurrencyEnum;
  subtitleUrl?: string;
  subtitle?: string;
  socialLinks?: SocialLinkViewModel[];
  programDetails?: ProgramDetailsFull;
  asset?: ASSET;
  notificationsUrl?: ToType;
  settingsUrl?: ToType;
  description?: string;
  AssetDetailsExtraBlock?: React.ComponentType<any>;
  PerformanceData?: React.ComponentType<any>;
  Controls?: React.ComponentType<any>;
}

const DetailsDescriptionSection = _DetailsDescriptionSection;
export default DetailsDescriptionSection;
