import { SignalApi } from "gv-api-web";

import withApiProxy from "./api-proxy";
import apiClient from "./swagger-custom-client";

const signalApi: SignalApi = withApiProxy(new SignalApi(apiClient));
export default signalApi;
