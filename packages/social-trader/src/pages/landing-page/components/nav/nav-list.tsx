import "./nav-list.scss";

import NavItem from "pages/landing-page/components/nav/nav-item";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";

const _NavList: React.FC<Props> = ({
  menuItems,
  className,
  onClick,
  subNavOpen
}) => (
  <nav className={className}>
    <ul className="nav-list">
      {menuItems.map((item, index) => (
        <NavItem
          key={index}
          name={item.name}
          href={item.href}
          state={item.state}
          hideMobile={item.hideMobile}
          subNav={item.subNav}
          onClick={onClick}
          subNavOpen={subNavOpen}
        />
      ))}
    </ul>
  </nav>
);

export interface Props {
  menuItems: TNavHeader[];
  className?: string;
  subNavOpen?: boolean;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const NavList = _NavList;
export default NavList;
