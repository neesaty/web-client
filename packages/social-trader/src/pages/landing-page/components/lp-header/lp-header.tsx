import "./lp-header.scss";

import ImageBaseElement from "components/avatar/image-base.element";
import Link from "components/link/link";
import useIsOpen from "hooks/is-open.hook";
import logo from "media/logo.svg";
import SignupDialog from "pages/auth/signup/signup-popup/signup-dialog";
import { JoinButton } from "pages/landing-page/components/join-button";
import MobileNav from "pages/landing-page/components/mobile-nav/mobile-nav";
import NavList from "pages/landing-page/components/nav/nav-list";
import { navFooter, navHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";
import { HOME_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import authService from "services/auth-service";

const LPHeader: React.FC = () => {
  const isAuthenticated = authService.isAuthenticated();
  return (
    <header className="lp-header">
      <div className="lp-header__container">
        <div className="lp-header__row">
          <div className="lp-header__burger">
            <MobileNav navHeader={navHeader} navFooter={navFooter} />
          </div>
          <div className="lp-header__logo">
            <Link
              title={"Go to home page"}
              className="lp-header__logo-link"
              to={{
                pathname: HOME_ROUTE
              }}
            >
              <div className="lp-header__combo-logo">
                <ImageBaseElement src={logo} />
                <h1 className="lp-header__text-logo">Genesis Vision</h1>
              </div>
            </Link>
          </div>
          <NavList menuItems={navHeader} className="lp-header__nav" />
          <div className="lp-header__start-btn">
            {isAuthenticated ? (
              <JoinButton
                eventLabel={"Dashboard"}
                color="secondary"
                href={OVERVIEW_ROUTE}
              >
                Dashboard
              </JoinButton>
            ) : (
              <SignupButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

const SignupButton: React.FC = () => {
  const [isOpen, setOpen, setClose] = useIsOpen();
  return (
    <>
      <JoinButton
        eventLabel={"Get started"}
        color="secondary"
        onClick={setOpen}
      >
        Get started
      </JoinButton>
      <SignupDialog open={isOpen} onClose={setClose} />
    </>
  );
};

export default LPHeader;
