import { ProfileFullViewModel } from "gv-api-web";
import useApiRequest from "hooks/api-request.hook";
import React, { useCallback, useEffect } from "react";
import profileApi from "services/api-client/profile-api";
import authService from "services/auth-service";

import Profile from "./profile";

const _ProfileContainer: React.FC = () => {
  const { sendRequest, data, isPending } = useApiRequest<ProfileFullViewModel>({
    request: () => profileApi.getProfileFull(authService.getAuthArg())
  });
  useEffect(() => {
    sendRequest();
  }, []);
  const onUpdate = useCallback(async () => await sendRequest(), []);
  return (
    <Profile
      condition={!!data}
      info={data!}
      onUpdate={onUpdate}
      isPending={isPending}
    />
  );
};

const ProfileContainer = _ProfileContainer;
export default ProfileContainer;
