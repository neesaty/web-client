import { GVButton } from "gv-react-components";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

import { SelectFilterValue } from "../filter.type";
import { ComposedRequestSelectValue } from "./select-filter.constants";

interface ISelectFilterPopoverProps {
  changeFilter?(value: ComposedRequestSelectValue): void;
  values: SelectFilterValue<ComposedRequestSelectValue>[];
  value?: ComposedRequestSelectValue;
}

class SelectFilterPopover extends React.PureComponent<
  ISelectFilterPopoverProps & InjectedTranslateProps
> {
  handleClick = (value: ComposedRequestSelectValue) => () => {
    if (this.props.changeFilter) {
      this.props.changeFilter(value);
    }
  };

  renderLabel = (item: SelectFilterValue<ComposedRequestSelectValue>): string =>
    item.labelKey ? this.props.t(item.labelKey) : item.label;

  render() {
    const { values, value } = this.props;
    return (
      <div className="select-filter">
        {values.map((x, idx) => {
          const selected = x.value === value;
          return (
            <GVButton
              variant="text"
              color={selected ? "primary" : "secondary"}
              key={idx}
              onClick={this.handleClick(x.value)}
            >
              {this.renderLabel(x)}
            </GVButton>
          );
        })}
      </div>
    );
  }
}

export default translate()(SelectFilterPopover);
