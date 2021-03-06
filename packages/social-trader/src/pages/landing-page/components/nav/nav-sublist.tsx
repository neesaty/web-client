import classNames from "classnames";
import NavSubItem from "pages/landing-page/components/nav/nav-subitem";
import { TNavHeader, TSubNav } from "pages/landing-page/static-data/nav-links";
import React from "react";

import styles from "./nav-list.module.scss";

const _NavSubList: React.FC<Props> = ({ subNav, subNavOpen, onClick }) => (
  <ul
    className={classNames(styles["nav-list"], styles["nav-list--sub"], {
      [styles["nav-list--sub-open"]]: subNavOpen
    })}
  >
    {subNavOpen &&
      subNav.map((item, index) => (
        <NavSubItem
          key={index}
          name={item.name}
          href={item.href}
          state={item.state}
          hideMobile={item.hideMobile}
          onClick={onClick}
        />
      ))}
  </ul>
);

export interface Props {
  subNav: TSubNav[];
  subNavOpen?: boolean;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const NavSubList = React.memo(_NavSubList);
export default NavSubList;
