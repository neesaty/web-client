import GVButton, { GV_BTN_SIZE } from "components/gv-button";
import useIsOpen from "hooks/is-open.hook";
import UnfollowContainer from "modules/unfollow/unfollow-container";
import { dispatchFollowDescription } from "pages/invest/follows/follow-details/services/follow-details.service";
import * as React from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const _UnFollowButton: React.FC<Props> = ({
  size = GV_BTN_SIZE.BIG,
  onApply,
  id,
  isExternal,
  tradingAccountId
}) => {
  const dispatch = useDispatch();
  const dispatchDescription = useCallback(() => {
    dispatch(dispatchFollowDescription(id)());
    onApply && onApply();
  }, [id]);
  const [t] = useTranslation();
  const [isOpenUnFollow, setIsOpenUnFollow, setIsCloseUnFollow] = useIsOpen();
  return (
    <>
      <GVButton
        size={size}
        color="secondary"
        variant="outlined"
        onClick={setIsOpenUnFollow}
      >
        {t("program-details-page.description.unfollow")}
      </GVButton>
      <UnfollowContainer
        tradingAccountId={tradingAccountId}
        isExternal={isExternal}
        open={isOpenUnFollow}
        id={id}
        onClose={setIsCloseUnFollow}
        onApply={dispatchDescription}
      />
    </>
  );
};

interface Props {
  size?: GV_BTN_SIZE;
  onApply: VoidFunction;
  tradingAccountId: string;
  isExternal: boolean;
  id: string;
}

const UnFollowButton = _UnFollowButton;
export default UnFollowButton;
