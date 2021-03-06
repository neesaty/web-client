import Link from "components/link/link";
import { useTranslation } from "i18n";
import React from "react";

import styles from "./seo-list.module.scss";

interface ISeoItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  state?: string;
  name: string;
  href: string;
  icon?: JSX.Element;
  onClick?(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
}

const _SeoItem: React.FC<ISeoItemProps> = ({ href, name, state, onClick }) => {
  const { t } = useTranslation();
  const title = t(name);
  return (
    <li className={styles["seo-list__item"]}>
      {href.includes("http") ? (
        <a title={title} href={href} className={styles["seo-list__link"]}>
          {title}
        </a>
      ) : (
        <Link
          title={title}
          onClick={onClick}
          to={{ pathname: href as string, state }}
          className={styles["seo-list__link"]}
        >
          {title}
        </Link>
      )}
    </li>
  );
};
const SeoItem = React.memo(_SeoItem);
export default SeoItem;
