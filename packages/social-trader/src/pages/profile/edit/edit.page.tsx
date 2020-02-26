import ProfileLayout from "components/profile/profile-layout";
import ProfileContainer from "modules/profile/profile-container";
import * as React from "react";

const _ProfileEditPage: React.FC = () => (
  <ProfileLayout route="details">
    <ProfileContainer />
  </ProfileLayout>
);

const ProfileEditPage = _ProfileEditPage;
export default ProfileEditPage;
