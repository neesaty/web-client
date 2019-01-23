import "./wallet-container.scss";

import { GVTab, GVTabs } from "gv-react-components";
import React, { PureComponent } from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";
import { SearchIcon } from "shared/components/icon/search-icon";
import Surface from "shared/components/surface/surface";

import WalletList from "../wallet-list/wallet-list";
import WalletTransactionsTotal from "../wallet-transactions/wallet-transactions-total";

const WALLETS_TAB = "wallets";
const TRANSACTIONS_TAB = "transactions";

const createButtonSearch = route => (
  <div className="wallet-container__button-container">
    <Link to={route}>
      <SearchIcon />
    </Link>
  </div>
);

class WalletContainerTotal extends PureComponent {
  state = {
    tab: WALLETS_TAB
  };

  handleTabChange = (e, tab) => {
    this.setState({ tab });
  };

  render() {
    const { tab } = this.state;
    const { eventTypeFilterValues } = this.props;
    return (
      <Surface className="wallet-container">
        <div className="wallet-container__header">
          <div className="wallet-container__tabs">
            <GVTabs value={tab} onChange={this.handleTabChange}>
              <GVTab value={WALLETS_TAB} label={"My wallets"} />
              <GVTab value={TRANSACTIONS_TAB} label={"All transactions"} />
            </GVTabs>
          </div>
        </div>
        <div>
          {tab === WALLETS_TAB && (
            <WalletList createButtonToolbar={createButtonSearch("/")} />
          )}
          {tab === TRANSACTIONS_TAB && (
            <WalletTransactionsTotal
              eventTypeFilterValues={eventTypeFilterValues}
              createButtonToolbar={createButtonSearch("/")}
            />
          )}
        </div>
      </Surface>
    );
  }
}

export default translate()(WalletContainerTotal);
