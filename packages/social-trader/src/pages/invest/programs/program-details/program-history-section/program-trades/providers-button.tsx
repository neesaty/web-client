import "./providers-button.scss";

import AssetAvatarWithName from "components/avatar/asset-avatar/asset-avatar-with-name";
import { CHIP_SIZE } from "components/chip/chip";
import ChipButton from "components/chip/chip-button";
import CopyIcon from "components/icon/copy-icon";
import LevelTooltip from "components/level-tooltip/level-tooltip";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER
} from "components/popover/popover";
import {
  PopoverContent,
  PopoverContentListItem
} from "components/popover/popover-content";
import { OrderSignalProgramInfo } from "gv-api-web";
import useAnchor from "hooks/anchor.hook";
import React from "react";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";

const _ProvidersButton: React.FC<Props> = ({ providers }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  return (
    <div className="providers-button__container">
      <Popover
        anchorEl={anchor}
        horizontal={HORIZONTAL_POPOVER_POS.RIGHT}
        orientation={ORIENTATION_POPOVER.LEFT}
        onClose={clearAnchor}
      >
        <PopoverContent type={"list"}>
          {providers.map(provider => (
            <ProviderItem provider={provider} />
          ))}
        </PopoverContent>
      </Popover>
      <ChipButton
        onClick={setAnchor}
        size={CHIP_SIZE.SMALL}
        chipLabel={<CopyIcon />}
      />
      <div className="providers-button__count">{providers.length}</div>
    </div>
  );
};

const ProviderItem: React.FC<{ provider: OrderSignalProgramInfo }> = ({
  provider: {
    program: { logo, level, color, levelProgress, title, url }
  }
}) => {
  const { linkCreator } = useToLink();
  return (
    <PopoverContentListItem>
      <Link
        to={linkCreator(
          composeFollowDetailsUrl(url),
          FOLLOW_DETAILS_FOLDER_ROUTE
        )}
      >
        <AssetAvatarWithName
          name={title}
          url={logo}
          level={level}
          levelProgress={levelProgress}
          alt={title}
          color={color}
          tooltip={<LevelTooltip level={level} canLevelUp={false} />}
        />
      </Link>
    </PopoverContentListItem>
  );
};

interface Props {
  providers: Array<OrderSignalProgramInfo>;
}

export const ProvidersButton = _ProvidersButton;
