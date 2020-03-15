import "pages/landing-page/styles/index.scss";
import "pages/landing-page/styles/internal.scss";

import { useTranslation } from "i18n";
import { NextPage } from "next";
import TermsSection from "pages/landing-page/components/terms-section/terms-section";
import Layout from "pages/landing-page/layouts/_layout";
import React from "react";

export const Terms: NextPage = () => {
  const { t } = useTranslation();
  return (
    <Layout title={t("landing-page.page-titles.terms")}>
      <main className="internal">
        <div className="internal__container">
          <TermsSection />
        </div>
      </main>
    </Layout>
  );
};
