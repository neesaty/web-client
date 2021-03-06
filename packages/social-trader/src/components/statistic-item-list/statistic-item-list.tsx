import classNames from "classnames";
import { Center } from "components/center/center";
import * as React from "react";

import styles from "./statistic-item-list.module.scss";

export const StatisticItemList: React.FC<Props &
  React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  vertical
}) => (
  <Center
    wrap
    className={classNames(styles["statistics-item-list"], className, {
      [styles["statistics-item-list--vertical"]]: vertical
    })}
  >
    {children}
  </Center>
);

interface Props {
  vertical?: boolean;
  className?: string;
}
