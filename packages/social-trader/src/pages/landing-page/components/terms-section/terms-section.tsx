import "./terms-section.scss";

import { useTranslation } from "i18n";
import { GLOSSARY_ROUTE } from "pages/landing-page/static-data/nav-links";
import React from "react";

const TermsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <section className="terms-section internal--font-small">
      <h1>{t("terms.title")}</h1>
      <article className="internal__article">
        <p>{t("terms.text-1")}</p>
        <p>
          {t("terms.text-2")
            .split("\n")
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
          <a
            title={t("landing-page.genesis-vision")}
            href="https://genesis.vision/"
          >
            {t("landing-page.links.genesis-vision")}
          </a>{" "}
          <br />
          {t("terms.text-3")
            .split("\n")
            .map((line, index) => (
              <span key={index}>
                {line}
                <br />
              </span>
            ))}
        </p>
        <p>
          {t("terms.text-4")}
          <a title={t("landing-page.links.glossary")} href={GLOSSARY_ROUTE}>
            {t("landing-page.links.glossary")}
          </a>
          .
        </p>
        {t("terms.paragraphs-1")
          .split("\n")
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        <p>
          {t("terms.text-5")}
          <ul>
            {t("terms.list-1")
              .split("\n")
              .map((line, index) => (
                <li key={index}>{line}</li>
              ))}
          </ul>
        </p>
        {t("terms.paragraphs-2")
          .split("\n")
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        <p>
          {t("terms.paragraphs-3")
            .split("\n")
            .map((line, index) => (
              <p key={index}>{line}</p>
            ))}
        </p>
        {t("terms.paragraphs-4")
          .split("\n")
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))}
      </article>
    </section>
  );
};

export default TermsSection;
