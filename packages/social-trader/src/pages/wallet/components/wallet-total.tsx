import Page from "components/page/page";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import {
  withBlurLoader,
  WithBlurLoaderProps
} from "decorators/with-blur-loader";
import { WalletSummary } from "gv-api-web";
import WalletSettingsContainer from "pages/wallet/components/wallet-settings/wallet-settings-container";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { compose } from "redux";

import WalletBalanceElements from "./wallet-balance/wallet-balance-elements";
import WalletTablesTotal from "./wallet-tables/wallet-tables-total";
import styles from "./wallet-title-block.module.scss";

const _WalletTotal: React.FC<Props> = ({ data: wallet }) => {
  const [t] = useTranslation();
  return (
    <Page title={t("wallet-page.title")}>
      <div className={styles["wallet-title-block"]}>
        <Row wrap>
          <RowItem className={styles["wallet-title-block__title"]}>
            <h1>{t("wallet-page.title")}</h1>
          </RowItem>
          <RowItem>
            <WalletSettingsContainer
              genesisMarketsDiscountPercent={
                wallet.genesisMarketsDiscountPercent
              }
            />
          </RowItem>
        </Row>
        <WalletBalanceElements
          available={wallet.grandTotal.available}
          pending={wallet.grandTotal.trading}
          total={wallet.grandTotal.total}
          invested={wallet.grandTotal.invested}
          currency={wallet.grandTotal.currency}
        />
      </div>
      <WalletTablesTotal wallets={wallet.wallets} />
    </Page>
  );
};

interface Props {
  data: WalletSummary;
}

const WalletTotal = compose<
  React.ComponentType<Props & WithBlurLoaderProps<WalletSummary>>
>(
  withBlurLoader,
  React.memo
)(_WalletTotal);
export default WalletTotal;
