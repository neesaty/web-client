import "./wallet-balance.scss";

import { GVButton } from "gv-react-components";
import React from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import PieContainer from "shared/components/pie-container/pie-container";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import ArrowIcon from "shared/media/arrow-up.svg";
import PieContainer from "shared/components/pie-container/pie-container";
import { formatCurrencyValue, formatValue } from "shared/utils/formatter";

const getPercentageValue = (value, totalValue) => {
  console.log((value / totalValue) * 100);
  return Math.round((value / totalValue) * 100);
};

const WalletBalanceElements = ({
  t,
  handleAddFunds,
  handleWithdraw,
  walletBalanceData,
  currentCurrency
}) => {
  const totalValue = walletBalanceData.totalBalanceCurrency;
  console.log(totalValue);
  return (
    <div className="wallet-balance__wrapper">
      <ul className="wallet-balance__statistic">
        <li className="wallet-balance__statistic-item">
          <StatisticItem
            label={t("wallet-page.total-balance")}
            equivalent={formatValue(walletBalanceData.totalBalanceGVT)}
            equivalentCurrency={"GVT"}
            big
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(
                walletBalanceData.totalBalanceCurrency
              )}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currentCurrency}`}
            />
          </StatisticItem>
        </li>
        <li className="wallet-balance__statistic-item">
          <PieContainer
            start={0}
            end={100}
            value={getPercentageValue(
              walletBalanceData.investedCurrency,
              totalValue
            )}
            color={"#00BDAF"}
          />
          <StatisticItem
            label={t("wallet-page.invested-value")}
            equivalent={formatValue(walletBalanceData.investedGVT)}
            equivalentCurrency={" GVT"}
            className="wallet-balance__statistic-big"
            big
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(walletBalanceData.investedCurrency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currentCurrency}`}
            />
          </StatisticItem>
        </li>
        <li className="wallet-balance__statistic-item">
          <PieContainer
            start={0}
            end={100}
            value={getPercentageValue(
              walletBalanceData.investedCurrency,
              totalValue
            )}
            color={"#F7931A"}
          />
          <StatisticItem
            label={t("wallet-page.pending")}
            equivalent="0.4"
            equivalentCurrency={" GVT"}
            className="wallet-balance__statistic-big"
            big
            accent
          >
            <NumberFormat
              value="3.245"
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currentCurrency}`}
            />
          </StatisticItem>
        </li>
        <li className="wallet-balance__statistic-item">
          <PieContainer
            start={0}
            end={100}
            value={getPercentageValue(
              walletBalanceData.availableCurrency,
              totalValue
            )}
            color={"#5758A5"}
          />
          <StatisticItem
            label={t("wallet-page.available")}
            equivalent={formatValue(walletBalanceData.availableGVT)}
            equivalentCurrency={" GVT"}
            className="wallet-balance__statistic-big"
            big
            accent
          >
            <NumberFormat
              value={formatCurrencyValue(walletBalanceData.availableCurrency)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${currentCurrency}`}
            />
          </StatisticItem>
        </li>
      </ul>
      {handleAddFunds && handleWithdraw && (
        <div className="wallet-balance__buttons">
          <GVButton
            className="wallet-balance__withdraw"
            color="secondary"
            variant="outlined"
            onClick={handleWithdraw}
          >
            <img
              className="wallet-balance__button-icon"
              src={ArrowIcon}
              alt="Icon"
            />
            {t("wallet-page.withdraw")}
          </GVButton>
          <GVButton
            className="wallet-balance__add-funds"
            onClick={handleAddFunds}
          >
            <span className="wallet-balance__button-icon wallet-balance__button-icon--sign">
              +
            </span>
            {t("wallet-page.add-funds")}
          </GVButton>
        </div>
      )}
    </div>
  );
};

export default translate()(WalletBalanceElements);
