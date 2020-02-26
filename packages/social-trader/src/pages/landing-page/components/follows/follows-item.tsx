import classNames from "classnames";
import ImageBase from "components/avatar/image-base";
import GVProgramDefaultAvatar from "components/gv-program-avatar/gv-propgram-default-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import React from "react";
import { FOLLOW_DETAILS_FOLDER_ROUTE } from "routes/invest.routes";
import { composeFollowDetailsUrl } from "utils/compose-url";

interface ITraderItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  title: string;
  count: number;
  color: string;
  url: string;
  logo: string;
  imageClassName?: string;
}

const _FollowsItem: React.FC<ITraderItemProps> = ({
  title,
  count,
  color,
  url,
  logo,
  imageClassName
}) => {
  const { linkCreator } = useToLink();
  const linkProps = linkCreator(
    composeFollowDetailsUrl(url),
    FOLLOW_DETAILS_FOLDER_ROUTE
  );
  return (
    <li className="follows-list__item">
      <Link
        title={`Go to ${title} details page`}
        className="follows-list__item-link"
        to={linkProps}
      >
        <div className="follows-list__item-avatar">
          <ImageBase
            DefaultImageComponent={GVProgramDefaultAvatar}
            defaultImageClassName="follows-list__item-image--default"
            color={color}
            alt={title}
            className={classNames("follows-list__item-image", imageClassName)}
            src={logo}
          />
        </div>
        <div className="follows-list__item-title">{title}</div>
        <div className="follows-list__item-data">
          <div className="follows-list__item-number">{count}</div>
          <span className="follows-list__item-label">Followers</span>
        </div>
      </Link>
    </li>
  );
};
const FollowsItem = _FollowsItem;
export default FollowsItem;
