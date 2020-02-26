import AuthLayout from "pages/auth/components/auth-layout/auth-layout";
import SignUpFooter from "pages/auth/components/signup-footer/signup-footer";
import EmailConfirmContainer from "pages/auth/email-confirm/email-confirm-container";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { LOGIN_ROUTE } from "routes/app.routes";

const _EmailConfirmPage: React.FC<Props> = ({ userId, code }) => {
  const [t] = useTranslation();
  return (
    <AuthLayout
      quoteNo={0}
      titleKey={t("auth.email-confirm.title")}
      Footer={SignUpFooter}
      footerAuthRoute={LOGIN_ROUTE}
    >
      <div className="email-confirm-page">
        <EmailConfirmContainer userId={userId} code={code} />
      </div>
    </AuthLayout>
  );
};

interface Props {
  userId: string;
  code: string;
}

const EmailConfirmPage = _EmailConfirmPage;
export default EmailConfirmPage;
