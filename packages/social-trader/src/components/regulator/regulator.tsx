import classNames from "classnames";
import * as React from "react";
import { useCallback } from "react";
import { PlatformAssetFull, SizesType } from "utils/types";

import styles from "./regulator.module.scss";

const Regulator: React.FC<Props> = ({
  size = "small",
  remainder,
  minValue = 0,
  value,
  handleUp,
  handleDown,
  children
}) => {
  const handleClickMinus = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      if (value - 1 >= minValue) handleDown(event);
    },
    [value, minValue, handleDown]
  );
  const handleClickPlus = useCallback(
    (event: React.SyntheticEvent<HTMLElement>) => {
      if (remainder !== 0) handleUp(event);
    },
    [value, remainder, handleUp]
  );
  return (
    <div
      className={classNames(styles["regulator"], {
        [styles["regulator--small"]]: size === "small",
        [styles["regulator--middle"]]: size === "middle",
        [styles["regulator--mute"]]: value <= minValue
      })}
    >
      <div
        className={classNames(
          styles["regulator__button"],
          styles["regulator__button--minus"],
          {
            [styles["regulator__button--small"]]: size === "small",
            [styles["regulator__button--middle"]]: size === "middle",
            [styles["regulator__button--mute"]]: value <= minValue
          }
        )}
        onClick={handleClickMinus}
      >
        &minus;
      </div>
      <div
        className={classNames(styles["regulator__indicator"], {
          [styles["regulator__indicator--small"]]: size === "small",
          [styles["regulator__indicator--middle"]]: size === "middle"
        })}
      >
        {children}
      </div>
      <div
        className={classNames(
          styles["regulator__button"],
          styles["regulator__button--plus"],
          {
            [styles["regulator__button--small"]]: size === "small",
            [styles["regulator__button--middle"]]: size === "middle",
            [styles["regulator__button--mute"]]: remainder <= 0
          }
        )}
        onClick={handleClickPlus}
      >
        +
      </div>
    </div>
  );
};

interface Props {
  size?: SizesType;
  remainder: number;
  minValue?: number;
  value: number;
  handleUp: TSymbolClickHandle;
  handleDown: TSymbolClickHandle;
  children: JSX.Element;
}

export type TRegulatorHandle = (asset: PlatformAssetFull) => TSymbolClickHandle;

type TSymbolClickHandle = (event: React.SyntheticEvent<HTMLElement>) => void;

export default Regulator;
