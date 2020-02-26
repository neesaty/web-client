import AssetAvatar, {
  IAssetAvatarProps
} from "components/avatar/asset-avatar/asset-avatar";
import { AvatarWithName } from "components/avatar/avatar-with-name/avatar-with-name";
import * as React from "react";

const _AssetAvatarWithName: React.FC<Props> = props => {
  const { name } = props;
  return <AvatarWithName avatar={<AssetAvatar {...props} />} name={name} />;
};

interface Props extends IAssetAvatarProps {
  name: string | JSX.Element;
}

const AssetAvatarWithName = _AssetAvatarWithName;
export default AssetAvatarWithName;
