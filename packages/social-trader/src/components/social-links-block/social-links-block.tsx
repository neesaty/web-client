import SocialLinkImage from "components/avatar/social-link/social-link";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import { SocialLinkViewModel } from "gv-api-web";
import * as React from "react";

import styles from "./social-links-block.module.scss";

const _SocialLinksBlock: React.FC<Props> = ({ socialLinks }) => {
  return (
    <Row wrap>
      {socialLinks.map(socialLink => {
        const value = "value" in socialLink ? socialLink.value : 0;
        return (
          <RowItem bottomOffset small key={socialLink.name}>
            <a
              title={socialLink.name}
              key={socialLink.type}
              href={socialLink.url + value}
              target="_blank"
              rel="noopener noreferrer"
              className={styles["social-links-block__social-link"]}
            >
              <SocialLinkImage url={socialLink.logoUrl} alt={socialLink.name} />
            </a>
          </RowItem>
        );
      })}
    </Row>
  );
};

const SocialLinksBlock = React.memo(_SocialLinksBlock);
export default SocialLinksBlock;

interface Props {
  socialLinks: Array<SocialLinkViewModel>;
}
