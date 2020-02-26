import AssetAvatar from "components/avatar/asset-avatar/asset-avatar";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import useAnchor from "hooks/anchor.hook";
import dynamic from "next/dist/next-server/lib/dynamic";
import React from "react";
import { CurrencyEnum } from "utils/types";

const InvestmentLimitsPopover = dynamic(() =>
  import(
    "components/details/details-description-section/investment-limits-popover"
  )
);

const _DetailsAssetAvatar: React.FC<Props> = ({
  logo,
  level,
  levelProgress,
  title,
  color,
  totalAvailableInvestment,
  currency
}) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <>
      <AssetAvatar
        url={logo}
        level={level}
        levelProgress={levelProgress}
        alt={title}
        size="big"
        color={color}
        onClickLevel={setAnchor}
      />
      {level !== undefined && (
        <Popover
          horizontal={HORIZONTAL_POPOVER_POS.LEFT}
          vertical={VERTICAL_POPOVER_POS.BOTTOM}
          anchorEl={anchor}
          noPadding
          onClose={clearAnchor}
        >
          <InvestmentLimitsPopover
            limit={totalAvailableInvestment!}
            currency={currency!}
            level={level}
            canLevelUp={false}
            closePopover={clearAnchor}
          />
        </Popover>
      )}
    </>
  );
};

interface Props {
  logo: string;
  title: string;
  color?: string;
  level?: number;
  levelProgress?: number;
  totalAvailableInvestment?: number;
  currency?: CurrencyEnum;
}

const DetailsAssetAvatar = _DetailsAssetAvatar;
export default DetailsAssetAvatar;
