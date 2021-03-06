import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { MutedText } from "components/muted-text/muted-text";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import React from "react";
import { managerToPathCreator } from "routes/manager.routes";
import { postToPathCreator } from "routes/social.routes";
import { formatDate } from "utils/dates";

import styles from "./conversation-user.module.scss";

const _ConversationUser: React.FC<Props> = ({
  postId,
  avatar,
  username,
  date,
  url
}) => {
  const { contextTitle } = useToLink();
  return (
    <AvatarWithName
      avatar={
        <Link to={managerToPathCreator(url, contextTitle)}>
          <ProfileAvatar url={avatar} alt={username} />
        </Link>
      }
      name={
        <>
          <Row>
            <Link to={managerToPathCreator(url, contextTitle)}>
              <RowItem className={styles["conversation-user__name"]}>
                {username}
              </RowItem>
            </Link>
          </Row>
          <Row small>
            <Link to={postId && postToPathCreator(postId, contextTitle)}>
              <MutedText>{formatDate(date)}</MutedText>
            </Link>
          </Row>
        </>
      }
    />
  );
};

interface Props {
  postId?: string;
  url: string;
  avatar: string;
  username: string;
  date: string | Date;
}

export const ConversationUser = React.memo(_ConversationUser);
