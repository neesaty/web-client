import Popover, {
  HORIZONTAL_POPOVER_POS,
  ORIENTATION_POPOVER,
  VERTICAL_POPOVER_POS
} from "components/popover/popover";
import { STATUS } from "constants/constants";
import useAnchor from "hooks/anchor.hook";
import * as React from "react";
import { useCallback } from "react";

import AssetStatusLabel from "./asset-status-label";
import AssetStatusRequestsContainer from "./asset-status-requests.container";

const _AssetStatus: React.FC<Props> = ({ className, status, id, onCancel }) => {
  const { anchor, setAnchor, clearAnchor } = useAnchor();
  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      if (status === STATUS.INVESTING || status === STATUS.WITHDRAWING)
        setAnchor(event);
    },
    [status]
  );
  return (
    <>
      <AssetStatusLabel
        status={status}
        className={className}
        onClick={handleOpenDropdown}
      />
      <Popover
        orientation={ORIENTATION_POPOVER.RIGHT}
        horizontal={HORIZONTAL_POPOVER_POS.LEFT}
        vertical={VERTICAL_POPOVER_POS.BOTTOM}
        anchorEl={anchor}
        noPadding
        onClose={clearAnchor}
      >
        <AssetStatusRequestsContainer
          id={id}
          handleCloseDropdown={clearAnchor}
          onCancel={onCancel}
        />
      </Popover>
    </>
  );
};

interface Props {
  className?: string;
  status: STATUS;
  id: string;
  onCancel: () => void;
}

const AssetStatus = _AssetStatus;
export default AssetStatus;
