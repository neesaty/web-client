import WalletCurrency from "media/wallet-currency.svg";
import * as React from "react";

import ImageBase, { IImageProps } from "../image-base";

const _WalletImage: React.FC<Props> = ({ url, alt, imageClassName }) => {
  return (
    <ImageBase
      src={url}
      alt={alt}
      defaultImage={WalletCurrency}
      className={imageClassName}
    />
  );
};

const WalletImage = _WalletImage;
export default WalletImage;

interface Props extends IImageProps {
  imageClassName?: string;
}
