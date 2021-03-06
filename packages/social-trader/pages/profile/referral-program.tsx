import ReferralProgramPage from "components/profile/referral-program/referral-program.page";
import withDefaultLayout from "decorators/with-default-layout";
import withPrivateRoute from "decorators/with-private-route";
import React from "react";
import { compose } from "redux";

const Page: React.FC = () => {
  return <ReferralProgramPage />;
};

export default compose(withDefaultLayout, withPrivateRoute)(Page);
