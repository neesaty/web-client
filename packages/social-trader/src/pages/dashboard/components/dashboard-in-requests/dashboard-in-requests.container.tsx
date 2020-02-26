import useApiRequest from "hooks/api-request.hook";
import { getInRequestsLoadersData } from "pages/dashboard/dashboard.loaders-data";
import { TDashboardInRequests } from "pages/dashboard/dashboard.types";
import { fetchInRequests } from "pages/dashboard/services/dashboard.service";
import React from "react";
import { useTranslation } from "react-i18next";

import DashboardBlock from "../dashboard-block/dashboard-block";
import DashboardInRequests from "./dashboard-in-requests";

const _DashboardInRequestsContainer: React.FC = () => {
  const [t] = useTranslation();
  const { data, sendRequest } = useApiRequest<TDashboardInRequests>({
    request: fetchInRequests,
    fetchOnMount: true
  });
  return (
    <DashboardBlock label={t("dashboard-page.in-requests.title")}>
      <DashboardInRequests
        updateData={sendRequest}
        data={data!}
        loaderData={getInRequestsLoadersData()}
      />
    </DashboardBlock>
  );
};

const DashboardInRequestsContainer = _DashboardInRequestsContainer;
export default DashboardInRequestsContainer;
