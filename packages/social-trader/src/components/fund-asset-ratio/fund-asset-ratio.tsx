import "./fund-assets-ratio.scss";

import classNames from "classnames";
import { FundAssetPartWithIcon } from "gv-api-web";
import * as React from "react";

const _FundAssetRatio: React.FC<Props> = ({
  showBounds = true,
  values,
  handleHover,
  handleLeave
}) => {
  let ZIndex = values.length;
  let newLevel = 0;
  return (
    <>
      <div className="fund-asset-ratio fund-asset-ratio--line">
        {values.map((item: FundAssetPartWithIcon) => {
          newLevel += item.percent;
          ZIndex--;
          return (
            <RatioField
              key={item.name}
              handleHover={handleHover}
              handleLeave={handleLeave}
              item={item}
              newLevel={newLevel}
              ZIndex={ZIndex}
            />
          );
        })}
      </div>
      {showBounds && (
        <div className="fund-asset-ratio__values">
          <div className="fund-asset-ratio__value">0%</div>
          <div
            className={classNames("fund-asset-ratio__value", {
              "fund-asset-ratio__value--full":
                values.reduce(
                  (sum: number, item: FundAssetPartWithIcon): number =>
                    sum + item.percent,
                  0
                ) === 100
            })}
          >
            100%
          </div>
        </div>
      )}
    </>
  );
};

const RatioField: React.FC<IRatioFieldProps> = ({
  handleHover,
  item,
  handleLeave,
  newLevel,
  ZIndex
}) => (
  <div
    className="fund-asset-ratio--item-line"
    onMouseOver={handleHover && handleHover(item.asset)}
    onMouseLeave={handleLeave && handleLeave}
    style={{
      width: `${newLevel}%`,
      background: item.color,
      zIndex: ZIndex
    }}
  />
);

interface IRatioFieldProps {
  handleHover?: (
    asset: string
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  item: FundAssetPartWithIcon;
  handleLeave?: () => void;
  newLevel: number;
  ZIndex: number;
}

interface Props {
  showBounds?: boolean;
  values: FundAssetPartWithIcon[];
  handleHover?: (
    asset: string
  ) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleLeave?: () => void;
}

const FundAssetRatio = _FundAssetRatio;
export default FundAssetRatio;
