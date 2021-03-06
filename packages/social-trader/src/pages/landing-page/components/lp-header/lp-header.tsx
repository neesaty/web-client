import ImageBaseElement from "components/avatar/image-base.element";
import Link from "components/link/link";
import { useTranslation } from "i18n";
import logo from "media/logo.svg";
import { JoinButton } from "pages/landing-page/components/join-button";
import MobileNav from "pages/landing-page/components/mobile-nav/mobile-nav";
import NavList from "pages/landing-page/components/nav/nav-list";
import { SignupButton } from "pages/landing-page/components/signup-button/signup-button";
import { navFooter, navHeader } from "pages/landing-page/static-data/nav-links";
import React from "react";
import { HOME_ROUTE } from "routes/app.routes";
import { OVERVIEW_ROUTE } from "routes/dashboard.routes";
import authService from "services/auth-service";

import styles from "./lp-header.module.scss";

const LPHeader: React.FC = () => {
  const { t } = useTranslation();
  const isAuthenticated = authService.isAuthenticated();
  return (
    <header className={styles["lp-header"]}>
      <div className={styles["lp-header__container"]}>
        <div className={styles["lp-header__row"]}>
          <div className={styles["lp-header__burger"]}>
            <MobileNav navHeader={navHeader} navFooter={navFooter} />
          </div>
          <div className={styles["lp-header__logo"]}>
            <Link
              title={"Go to home page"}
              className={styles["lp-header__logo-link"]}
              to={{
                pathname: HOME_ROUTE
              }}
            >
              <div className={styles["lp-header__combo-logo"]}>
                <ImageBaseElement src={logo} />
                <h1 className={styles["lp-header__text-logo"]}>
                  {t("landing-page:genesis-vision")}
                </h1>
              </div>
            </Link>
          </div>
          <NavList menuItems={navHeader} className={styles["lp-header__nav"]} />
          <div className={styles["lp-header__start-btn"]}>
            {isAuthenticated ? (
              <JoinButton
                eventLabel={t("landing-page:buttons.dashboard")}
                color="secondary"
                href={OVERVIEW_ROUTE}
              >
                {t("landing-page:buttons.dashboard")}
              </JoinButton>
            ) : (
              <SignupButton
                eventLabel={t("landing-page:buttons.get-started")}
                color={"secondary"}
              >
                {t("landing-page:buttons.get-started")}
              </SignupButton>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default LPHeader;
