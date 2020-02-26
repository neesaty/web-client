import "./pager.scss";

import Link from "components/link/link";
import { useRouter } from "next/router";
import * as querystring from "querystring";
import * as React from "react";

export const _PagerLinkButton: React.FC<Props> = ({
  page,
  classname,
  callback,
  value
}) => {
  const { pathname } = useRouter();
  const query = querystring.stringify({ page });
  const link = page === 1 ? pathname : `${pathname}?${query}`;

  return (
    <Link className={classname} to={link} onClick={callback}>
      {value}
    </Link>
  );
};
export const PagerLinkButton = _PagerLinkButton;
export default PagerLinkButton;

interface Props {
  page: number;
  classname: string;
  callback: (e: any) => void;
  value: string | number;
}
