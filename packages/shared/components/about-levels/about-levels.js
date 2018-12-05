import "./about-level.scss";

import React, { Component } from "react";
import { translate } from "react-i18next";
import NumberFormat from "react-number-format";
import Dialog from "shared/components/dialog/dialog";
import CurrencySelect from "shared/modules/currency-select/components/currency-select";
import { CURRENCY_VALUES } from "shared/modules/currency-select/currency-select.constants";
import { convertToCurrency } from "shared/utils/currency-converter";

class AboutLevelsComponent extends Component {
  numberFormat = (val, rate, currency) => {
    return (
      <NumberFormat
        value={convertToCurrency(val, rate)}
        prefix=""
        suffix={` ${currency}`}
        decimalScale={2}
        displayType="text"
      />
    );
  };
  render() {
    const { t, open, onClose, rate, currency, currencyChange } = this.props;
    return (
      <Dialog open={open} onClose={onClose} className="about-levels__dialog">
        <div className="about-levels-container">
          <div className="about-levels-container__header">
            <h1 className="about-levels-container__title">
              {t("about-levels-page.titles.main")}
            </h1>
            <div className="about-levels-container__description">
              {t("about-levels-page.description")}
            </div>
          </div>
          <div className="about-levels-container__text">
            <div className="about-levels-container__left-block">
              <div className="about-levels-container__paragraph">
                {t("about-levels-page.sections.section-1")}
              </div>
              <div className="about-levels-container__paragraph">
                {t("about-levels-page.sections.section-2")}
              </div>
              <div className="about-levels-container__subtitle">
                {t("about-levels-page.titles.table")}
              </div>
              <div className="about-levels-container__table">
                <table>
                  <thead>
                    <tr>
                      <th>{t("about-levels-page.table-header.level")}</th>
                      <th>{t("about-levels-page.table-header.age")}</th>
                      <th>{t("about-levels-page.table-header.avg-profit")}</th>
                      <th className="total-profit">
                        {t("about-levels-page.table-header.total-profit")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>0</td>
                      <td>0</td>
                      <td className="total-profit">0</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>1</td>
                      <td>0.5</td>
                      <td className="total-profit">4</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>2</td>
                      <td>1</td>
                      <td className="total-profit">80</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>4</td>
                      <td>2</td>
                      <td className="total-profit">800</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>7</td>
                      <td>3</td>
                      <td className="total-profit">2 000</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>10</td>
                      <td>4</td>
                      <td className="total-profit">10 000</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>14</td>
                      <td>5</td>
                      <td className="total-profit">25 000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="about-levels-container__paragraph">
                <b> {t("about-levels-page.sections.section-age-title")}</b>
                {t("about-levels-page.sections.section-age")}
              </div>
              <div className="about-levels-container__paragraph">
                <b>
                  {t("about-levels-page.sections.section-avg-profit-title")}
                </b>
                {t("about-levels-page.sections.section-avg-profit")}
              </div>
              <div className="about-levels-container__paragraph">
                <b>
                  {t("about-levels-page.sections.section-total-profit-title")}
                </b>
                {t("about-levels-page.sections.section-total-profit")}
              </div>
              <div className="about-levels-container__paragraph about-levels-container__paragraph--mute">
                {t("about-levels-page.sections.section-6")}
              </div>
            </div>
            <div className="about-levels-container__right-block">
              <div className="about-levels-container__subtitle">
                {t("about-levels-page.titles.limits")}
              </div>
              <div className="about-levels-container__currency">
                <div className="about-levels-container__mute-title">
                  {t("about-levels-page.select")}
                </div>
                <div className="about-levels-container__select">
                  <CurrencySelect
                    onChange={currencyChange}
                    value={currency}
                    currencyValues={CURRENCY_VALUES}
                    className="header__currency"
                  />
                </div>
              </div>
              <div className="about-levels-container__limits">
                <div className="about-levels-container__limit">
                  <div className="div about-levels-container__icon one">1</div>
                  <div className="about-levels-container__values">
                    <div className="about-levels-container__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels-container__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.1"),
                        rate,
                        currency
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels-container__limit">
                  <div className="div about-levels-container__icon two">2</div>
                  <div className="about-levels-container__values">
                    <div className="about-levels-container__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels-container__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.2"),
                        rate,
                        currency
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels-container__limit">
                  <div className="div about-levels-container__icon three">
                    3
                  </div>
                  <div className="about-levels-container__values">
                    <div className="about-levels-container__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels-container__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.3"),
                        rate,
                        currency
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels-container__limit">
                  <div className="div about-levels-container__icon four">4</div>
                  <div className="about-levels-container__values">
                    <div className="about-levels-container__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels-container__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.4"),
                        rate,
                        currency
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels-container__limit">
                  <div className="div about-levels-container__icon five">5</div>
                  <div className="about-levels-container__values">
                    <div className="about-levels-container__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels-container__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.5"),
                        rate,
                        currency
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels-container__limit">
                  <div className="div about-levels-container__icon six">6</div>
                  <div className="about-levels-container__values">
                    <div className="about-levels-container__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels-container__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.6"),
                        rate,
                        currency
                      )}
                    </div>
                  </div>
                </div>
                <div className="about-levels-container__limit">
                  <div className="div about-levels-container__icon seven">
                    7
                  </div>
                  <div className="about-levels-container__values">
                    <div className="about-levels-container__mute-title">
                      {t("about-levels-page.titles.limit")}
                    </div>
                    <div className="about-levels-container__value">
                      {this.numberFormat(
                        t("about-levels-page.limits.7"),
                        rate,
                        currency
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}
export default translate()(AboutLevelsComponent);
