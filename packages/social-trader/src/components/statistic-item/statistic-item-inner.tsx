import classNames from "classnames";
import { BlurContainer } from "components/blur-container/blur-container";
import { MutedText } from "components/muted-text/muted-text";
import { Text } from "components/text/text";
import withLoader from "decorators/with-loader";
import * as React from "react";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { SizesType } from "utils/types";

import styles from "./statistic-item.module.scss";

enum ITEM {
  LABEL = "LABEL",
  VALUE = "VALUE"
}

const getTextContent = (node: React.ReactNode) => {
  // @ts-ignore
  return (node && node.props && node.props.labelText) || "";
};

const getTestId = (label: string | React.ReactNode) =>
  typeof label === "string" ? label : getTextContent(label);

const _StatisticItemInner: React.FC<IStatisticItemInnerProps> = ({
  size,
  hideLabel,
  isPending,
  invert,
  large,
  big,
  label,
  children,
  accent,
  labelClassName,
  equivalent,
  equivalentCurrency
}) => {
  const testId = getTestId(label);

  const renderItem = (item: ITEM, content: JSX.Element | React.ReactNode) => {
    return (item === ITEM.VALUE && !invert) ||
      (item === ITEM.LABEL && invert) ? (
      <div
        className={classNames(styles["statistics-item__value"], {
          [styles["statistics-item__value--accent"]]: accent,
          [styles["statistics-item__value--big"]]: big,
          [styles["statistics-item__value--large"]]: large
        })}
      >
        {content}
      </div>
    ) : (
      <Text muted size={size} wrap={false}>
        {content}
      </Text>
    );
  };

  return (
    <div className={styles["statistics-item__inner"]}>
      <div
        className={classNames(
          { [styles["statistics-item__top--hidden"]]: hideLabel },
          styles["statistics-item__top"],
          labelClassName
        )}
      >
        {renderItem(ITEM.LABEL, label)}
      </div>
      <div data-test-id={testId}>
        <BlurContainer blur={!!isPending}>
          {renderItem(ITEM.VALUE, children)}
        </BlurContainer>
      </div>
      {equivalent !== undefined && equivalentCurrency !== undefined ? (
        <MutedText>
          <NumberFormat
            value={formatCurrencyValue(equivalent, equivalentCurrency)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${equivalentCurrency}`}
          />
        </MutedText>
      ) : null}
    </div>
  );
};

export interface IStatisticItemInnerProps {
  size?: SizesType;
  hideLabel?: boolean;
  isPending?: boolean;
  label?: string | React.ReactNode;
  equivalent?: number;
  equivalentCurrency?: string;
  big?: boolean;
  large?: boolean;
  accent?: boolean;
  invert?: boolean;
  labelClassName?: string;
}

const StatisticItemInner = withLoader(_StatisticItemInner);
export default StatisticItemInner;
