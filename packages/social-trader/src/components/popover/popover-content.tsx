import "./popover-content.scss";

import classNames from "classnames";
import React from "react";

const _PopoverContent: React.FC<
  Props & React.HTMLAttributes<HTMLDivElement>
> = ({ type, children, className }) => {
  return (
    <div
      className={classNames("popover-content", className, {
        "popover-content__list": type === "list"
      })}
    >
      {children}
    </div>
  );
};

interface Props {
  className?: string;
  type?: "list";
}

export const PopoverContent = React.memo(_PopoverContent);

export const PopoverContentListItem: React.FC = React.memo(({ children }) => {
  return <div className="popover-content__list-item">{children}</div>;
});