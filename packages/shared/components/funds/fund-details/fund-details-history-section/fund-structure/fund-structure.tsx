import "shared/components/details/details-description-section/details-statistic-section/details-history/structure.scss";

import { FundAssetInfo, FundAssetsListInfo } from "gv-api-web";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import NumberFormat from "react-number-format";
import FundAssetImage from "shared/components/avatar/fund-asset-image/fund-asset-image";
import { FUND_STRUCTURE_COLUMNS } from "shared/components/funds/fund-details/fund-details.constants";
import { SortingColumn } from "shared/components/table/components/filtering/filter.type";
import TableCell from "shared/components/table/components/table-cell";
import TableModule from "shared/components/table/components/table-module";
import TableRow from "shared/components/table/components/table-row";
import { DEFAULT_PAGING } from "shared/components/table/reducers/table-paging.reducer";
import { formatValue } from "shared/utils/formatter";

interface Props {
  id: string;
  fetchStructure(id: string): Promise<FundAssetsListInfo>;
}

interface State {
  isPending: boolean;
  data?: FundAssetsListInfo;
}

class FundStructure extends React.Component<
  Props & InjectedTranslateProps,
  State
> {
  state: State = {
    isPending: false,
    data: undefined
  };

  fetchFundStructure: any = () => {
    this.setState({ isPending: true });
    const { id, fetchStructure } = this.props;
    return fetchStructure(id).then(data => {
      this.setState({ data, isPending: false });
      return { items: data.assets, total: data.assets.length };
    });
  };

  componentDidMount() {
    this.fetchFundStructure();
  }

  render() {
    const { t } = this.props;

    if (!this.state.data) return null;
    const data = {
      items: this.state.data.assets,
      total: this.state.data.assets.length
    };

    return (
      <TableModule
        data={data}
        paging={{
          ...DEFAULT_PAGING,
          itemsOnPage: data.total
        }}
        getItems={this.fetchFundStructure}
        columns={FUND_STRUCTURE_COLUMNS}
        renderHeader={(column: SortingColumn) => (
          <span
            className={`details-structure__head-cell fund-details-structure__cell--${
              column.name
            }`}
          >
            {t(`fund-details-page.history.structure.${column.name}`)}
          </span>
        )}
        renderBodyRow={(item: FundAssetInfo) => (
          <TableRow className="details-structure__row">
            <TableCell className="details-structure__cell fund-details-structure__cell">
              {item.asset}
            </TableCell>
            <TableCell className="details-structure__cell">
              <div className="details-structure__symbol">
                <FundAssetImage url={item.icon} alt={item.symbol} />
                <div className="details-structure__symbol-name">
                  {item.symbol}
                </div>
              </div>
            </TableCell>
            <TableCell className="details-structure__cell fund-details-structure__cell">
              <NumberFormat
                value={formatValue(item.target)}
                suffix={"%"}
                displayType="text"
              />
            </TableCell>
            <TableCell className="details-structure__cell fund-details-structure__cell">
              <NumberFormat
                value={formatValue(item.current, 2)}
                suffix={"%"}
                displayType="text"
              />
            </TableCell>
          </TableRow>
        )}
      />
    );
  }
}

export default translate()(FundStructure);
