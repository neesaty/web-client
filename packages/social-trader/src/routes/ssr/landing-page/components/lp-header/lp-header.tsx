import "./lp-header.scss";

import Link from "components/link/link";
import React from "react";
import { useSelector } from "react-redux";
import { isAuthenticatedSelector } from "reducers/auth-reducer";
import { HOME_ROUTE, SIGNUP_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { MainLogo } from "routes/ssr/landing-page/components/main-logo/main-logo";
import MobileNav from "routes/ssr/landing-page/components/mobile-nav/mobile-nav";
import NavList from "routes/ssr/landing-page/components/nav/nav-list";
import {
  navFooter,
  navHeader
} from "routes/ssr/landing-page/static-data/nav-links";

const LPHeader: React.FC = () => {
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  return (
    <header className="lp-header">
      <div className="lp-header__container">
        <div className="lp-header__row">
          <div className="lp-header__burger">
            <MobileNav navHeader={navHeader} navFooter={navFooter} />
          </div>
          <div className="lp-header__logo">
            <Link
              className="lp-header__logo-link"
              to={{
                pathname: HOME_ROUTE
              }}
            >
              <MainLogo />
            </Link>
          </div>
          <NavList menuItems={navHeader} className="lp-header__nav" />
          <div className="lp-header__start-btn">
            <LPButton
              color="secondary"
              href={isAuthenticated ? OVERVIEW_ROUTE : SIGNUP_ROUTE}
            >
              {isAuthenticated ? "Dashboard" : "Get started"}
            </LPButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LPHeader;