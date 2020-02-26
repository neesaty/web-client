import "./trades.scss";

import Page from "components/page/page";
import React from "react";
import { useTranslation } from "react-i18next";

const _Mt4: React.FC = () => {
  const [t] = useTranslation();
  const title = t("mt4-page.title");
  return (
    <Page showTitle title={title}>
      <div className="mt-frame">
        <iframe
          title={title}
          allowFullScreen
          name="webTerminalHost"
          id="webTerminalHost"
          src="https://trade.mql5.com/trade?version=4"
        >
          {title}
        </iframe>
      </div>
    </Page>
  );
};

const Mt4Page = _Mt4;
export default Mt4Page;
