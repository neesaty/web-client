import GVButton from "components/gv-button";
import { UpdateRowFuncType } from "components/table/components/table.types";
import { ASSET } from "constants/constants";
import useApiRequest from "hooks/api-request.hook";
import { ToggleableAssetType } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button.types";
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";

import { useToggleFavoriteDispatch } from "./toggle-asset-favorite-button.hook";
import {
  toggleFavoriteAsset,
  toggleFavoriteUpdateRow
} from "./toggle-asset-favorite-button.service";

const _ToggleAssetFavoriteButton: React.FC<IToggleAssetFavoriteButtonProps> = ({
  updateRow,
  asset,
  withDispatch,
  children,
  onApply,
  id,
  isFavorite,
  assetType = ASSET.PROGRAM
}) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatchMiddleware = useToggleFavoriteDispatch();
  const middleware = useCallback(() => {
    updateRow && asset && toggleFavoriteUpdateRow(asset, updateRow);
    withDispatch &&
      dispatchMiddleware({
        id,
        isFavorite,
        assetType
      });
    onApply && onApply();
  }, [id, isFavorite, assetType]);
  const { sendRequest, isPending } = useApiRequest({
    request: toggleFavoriteAsset,
    middleware: [middleware]
  });
  const handleToggle = useCallback(() => {
    sendRequest({ id, isFavorite, assetType });
  }, [id, isFavorite, assetType]);
  if (!isAuthenticated) return null;
  return (
    <GVButton
      color={"secondary"}
      noPadding
      variant={"text"}
      disabled={isPending}
      onClick={handleToggle}
    >
      {children}
    </GVButton>
  );
};

export interface IToggleAssetFavoriteButtonProps {
  asset?: ToggleableAssetType;
  updateRow?: UpdateRowFuncType;
  withDispatch?: boolean;
  children?: string | JSX.Element;
  onApply?: VoidFunction;
  id: string;
  isFavorite: boolean;
  assetType?: ASSET;
}

export const ToggleAssetFavoriteButton = _ToggleAssetFavoriteButton;
