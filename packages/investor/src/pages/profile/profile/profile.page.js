import Profile from "modules/profile/profile";
import ProfileContainer from "modules/profile/profile-container";
import ProfileLayout from "shared/components/profile/profile-layout";
import React from "react";

const ProfilePage = () => {
  return (
    <ProfileLayout route="details">
      <ProfileContainer>
        <Profile />
      </ProfileContainer>
    </ProfileLayout>
  );
};

export default ProfilePage;
