import "./details-description-control.scss";

import FavoriteIcon from "components/favorite-asset/favorite-icon/favorite-icon";
import useIsOpen from "hooks/is-open.hook";
import { ToggleAssetFavoriteButton } from "modules/toggle-asset-favorite-button/toggle-asset-favorite-button";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ASSET } from "shared/constants/constants";

import DetailsDescriptionControl from "./details-description-control";

const _DetailsFavorite: React.FC<Props> = ({
  asset,
  id,
  isFavorite: isFavoriteProp
}) => {
  const [t] = useTranslation();
  const [
    isFavorite,
    setIsFavorite,
    setIsNotFavorite,
    setIsFavoriteValue
  ] = useIsOpen(isFavoriteProp);

  const onApply = useCallback(() => {
    setIsFavoriteValue(!isFavorite);
  }, [isFavorite]);
  return (
    <ToggleAssetFavoriteButton
      onApply={onApply}
      assetType={asset}
      id={id}
      isFavorite={isFavorite}
    >
      <DetailsDescriptionControl
        tag="button"
        className="details-description-control--button"
        text={t("fund-details-page.description.addToFavorites")}
      >
        <FavoriteIcon
          className="details-description-control__icon"
          id={id}
          selected={isFavorite}
        />
      </DetailsDescriptionControl>
    </ToggleAssetFavoriteButton>
  );
};

interface Props {
  asset: ASSET;
  id: string;
  isFavorite: boolean;
}

const DetailsFavorite = React.memo(_DetailsFavorite);
export default DetailsFavorite;
