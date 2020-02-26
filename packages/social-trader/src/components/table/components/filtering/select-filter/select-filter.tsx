import React, { useCallback } from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import Filter from "../filter";
import { SelectFilterValue, TFilter } from "../filter.type";
import SelectFilterPopover from "./select-filter-popover";
import { SelectFilterType } from "./select-filter.constants";

const _SelectFilter: React.FC<Props & WithTranslation> = ({
  t,
  label,
  name,
  value,
  onChange,
  values
}) => {
  const renderValueText = useCallback(
    (value: SelectFilterType) => {
      const selectedValue = values.find(x => x.value === value);
      if (!selectedValue) return null;
      else if (selectedValue.labelKey !== undefined)
        return t(selectedValue.labelKey);
      return selectedValue.label;
    },
    [t, values]
  );

  return (
    <Filter
      label={label}
      name={name}
      renderValueText={renderValueText}
      value={value}
      updateFilter={onChange}
    >
      <SelectFilterPopover value={value} values={values} />
    </Filter>
  );
};

interface Props {
  name: string;
  label: string;
  value: SelectFilterType;
  values: SelectFilterValue[];
  onChange: (value: TFilter<SelectFilterType>) => void;
}

const SelectFilter = translate()(_SelectFilter);
export default SelectFilter;
