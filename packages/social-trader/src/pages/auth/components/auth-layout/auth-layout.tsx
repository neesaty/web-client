import "./auth-layout.scss";

import GvBrand from "components/gv-brand/gv-brand";
import GvLogo from "components/gv-logo/gv-logo";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { NextPage } from "next";
import React from "react";
import { useTranslation } from "react-i18next";
import { HOME_ROUTE } from "routes/app.routes";

import { ILoginFooterProps } from "../login-footer/login-footer";

const _AuthLayout: NextPage<Props> = ({
  quoteNo,
  children,
  titleKey,
  Footer,
  footerAuthRoute
}) => {
  const { linkCreator } = useToLink();
  const [t] = useTranslation();
  return (
    <div className="root auth page">
      <div className="auth__left">
        <Link
          className="navigation__link auth__logo"
          to={linkCreator(HOME_ROUTE)}
        >
          <>
            <GvLogo />
            <GvBrand />
          </>
        </Link>

        <blockquote className="auth__quote">
          {t(`auth-quotes.${quoteNo}.quote`)}
          <footer className="auth__quote-footer">
            —{" "}
            <cite className="auth__quote-author">
              {t(`auth-quotes.${quoteNo}.author`)}
            </cite>
          </footer>
        </blockquote>
      </div>
      <div className="auth__right">
        <div className="auth__content">
          {titleKey && <h1>{t(titleKey)}</h1>}
          {children}
        </div>
        {Footer && (
          <div className="auth__footer">
            <Footer ROUTE={footerAuthRoute} />
          </div>
        )}
      </div>
    </div>
  );
};

interface Props extends OwnProps {}

interface OwnProps {
  Footer: React.ComponentType<ILoginFooterProps>;
  footerAuthRoute: string;
  titleKey: string;
  children: React.ReactChild;
  quoteNo: number;
}

const AuthLayout = _AuthLayout;
export default AuthLayout;
