import classNames from "classnames";
import useIsOpen from "hooks/is-open.hook";
import useUrl from "hooks/url.hook";
import * as React from "react";
import { useCallback, useEffect } from "react";

const _ImageBase: React.FC<IImageBaseProps> = ({
  color,
  DefaultImageComponent,
  url,
  alt,
  defaultImage,
  imageClassName,
  defaultImageClassName
}) => {
  const fullUrl = useUrl(url);
  const hasUrl = fullUrl.length !== 0;
  const [isError, setIsError, setIsNotError] = useIsOpen();
  useEffect(() => {
    if (url) setIsNotError();
    else setIsError();
  }, [url]);
  const handleError = useCallback((e: any) => {
    e.target.onerror = null;
    setIsError();
  }, []);
  const currentSrc = isError ? defaultImage : fullUrl;
  const className = isError ? defaultImageClassName : "";
  console.log(currentSrc);
  console.log("isError", isError);
  return (isError || !hasUrl) && DefaultImageComponent ? (
    <DefaultImageComponent color={color} imageClassName={className} />
  ) : (
    <img
      alt={alt}
      className={classNames(imageClassName, className)}
      src={currentSrc}
      onError={handleError}
    />
  );
};

const ImageBase = React.memo(_ImageBase);
export default ImageBase;

export interface IImageProps {
  url: string;
  alt?: string;
  className?: string;
}

export interface IImageBaseProps {
  color?: string;
  DefaultImageComponent?: React.ComponentType<any>;
  url?: string;
  alt?: string;
  defaultImage?: string;
  imageClassName?: string;
  defaultImageClassName?: string;
}
