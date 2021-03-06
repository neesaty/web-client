import classNames from "classnames";
import { useTranslation } from "i18n";
import AdvantagesList from "pages/landing-page/components/advantages-list/advantages-list";
import { JoinButton } from "pages/landing-page/components/join-button";
import { advantagesItems } from "pages/landing-page/static-data/advantages";
import React from "react";
import { TRADE_ROUTE } from "routes/trade.routes";

import styles from "./advantages-section.module.scss";

export const AdvantagesListContainer: React.FC<{
  animation?: boolean;
}> = ({ animation }) => {
  const { t } = useTranslation();
  return (
    <div className="home__container">
      <div className={styles["advantages-section"]}>
        <h2 className={styles["advantages-section__title"]}>
          {t("landing-page:advantages.title")}
        </h2>
        <AdvantagesList
          advantagesItems={advantagesItems}
          className={classNames(styles["advantages-section__list"], {
            [styles["advantages-section__list--animation"]]: animation
          })}
          lastItem={{
            element: (
              <JoinButton href={TRADE_ROUTE}>
                {t("landing-page:buttons.join")}
              </JoinButton>
            ),
            isHided: animation
          }}
        />
      </div>
    </div>
  );
};
