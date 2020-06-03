import ProfileAvatar from "components/avatar/profile-avatar/profile-avatar";
import Link from "components/link/link";
import { useToLink } from "components/link/link.helper";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import TableCell from "components/table/components/table-cell";
import TableRow from "components/table/components/table-row";
import { UserAvatarList } from "components/user-avatar-list/user-avatar-list";
import { UserDetailsList } from "gv-api-web";
import React from "react";
import NumberFormat from "react-number-format";
import { managerToPathCreator } from "routes/manager.routes";
import { distanceDate } from "utils/dates";
import { formatCurrencyValue } from "utils/formatter";

import styles from "./users-table-row.module.scss";

const USER_TABLE_ROW_CURRENCY = "USD";

export const UsersTableRow: React.FC<{ user: UserDetailsList }> = ({
  user: {
    followersCount,
    followers,
    about,
    url,
    logoUrl,
    username,
    regDate,
    totalProfit,
    assetsUnderManagement,
    investorsCount
  }
}) => {
  const { contextTitle } = useToLink();
  const profileUrl = managerToPathCreator(url, contextTitle);
  return (
    <TableRow className={styles["users-table-row"]}>
      <TableCell className={styles["users-table-row__about-cell"]}>
        <Row center={false}>
          <RowItem>
            <Link to={profileUrl}>
              <ProfileAvatar url={logoUrl} alt={username} />
            </Link>
          </RowItem>
          <RowItem>
            <Row>
              <Link white to={profileUrl}>
                <b>{username}</b>
              </Link>
            </Row>
            <Row small className={styles["users-table-row__about"]}>
              {about}
            </Row>
          </RowItem>
        </Row>
      </TableCell>
      <TableCell>
        {followers.length ? (
          <UserAvatarList length={followersCount} list={followers} />
        ) : (
          "0"
        )}
      </TableCell>
      <TableCell>{distanceDate(regDate)}</TableCell>
      <TableCell>
        <NumberFormat
          value={formatCurrencyValue(
            assetsUnderManagement,
            USER_TABLE_ROW_CURRENCY
          )}
          suffix={` ${USER_TABLE_ROW_CURRENCY}`}
          displayType="text"
        />
      </TableCell>
      <TableCell>{investorsCount}</TableCell>
      <TableCell>
        <NumberFormat
          value={formatCurrencyValue(totalProfit, USER_TABLE_ROW_CURRENCY)}
          suffix={` ${USER_TABLE_ROW_CURRENCY}`}
          displayType="text"
        />
      </TableCell>
    </TableRow>
  );
};
