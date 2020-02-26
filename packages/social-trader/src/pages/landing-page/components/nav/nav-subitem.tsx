import classNames from "classnames";
import Link from "components/link/link";
import { TNavHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";

interface INavSubItemProps extends TNavHeader {
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _NavSubItem: React.FC<INavSubItemProps> = ({
  href,
  name,
  icon,
  state,
  hideMobile,
  onClick
}) => {
  return (
    <li
      className={classNames("nav-list__item", {
        "nav-list__item--hide-mobile": hideMobile
      })}
    >
      {href && href.includes("http") ? (
        <a title={name} href={href} className="nav-list__link">
          {icon && <span className="nav-list__link-icon">{icon}</span>}
          {name}
        </a>
      ) : (
        <Link
          title={name}
          onClick={onClick}
          to={{ pathname: href as string, state }}
          className="nav-list__link"
        >
          {icon && <span className="nav-list__link-icon">{icon}</span>}
          {name}
        </Link>
      )}
    </li>
  );
};
const NavSubItem = _NavSubItem;
export default NavSubItem;
