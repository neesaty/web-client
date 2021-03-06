import * as crypto from "crypto-js";
import fetch from "isomorphic-unfetch";
import { TimeInForce } from "pages/trades/binance-trade-page/trading/terminal.types";
import { from } from "rxjs";
import { AnyObjectType } from "utils/types";

export interface RequestOptions {
  privateKey?: string;
  publicKey?: string;
  url: string;
  params?: AnyObjectType;
  type?: REQUEST_TYPE[];
  method?: HTTP_METHODS;
}

export enum REQUEST_TYPE {
  AUTHORIZED,
  SIGNED
}

export interface OrderRequest extends AnyObjectType {
  symbol?: string;
  price?: string;
  quantity?: string;
  timeInForce?: TimeInForce;
  side?: string;
  type?: string;
  timestamp?: string;
  interval?: string;
  startTime?: number;
  endTime?: number;
  limit?: number | string;
}

export enum HTTP_METHODS {
  DELETE = "DELETE",
  POST = "POST",
  GET = "GET"
}

export const BINANCE_API_KEY_HEADER = "x-mbx-apikey";

export const handleErrors = async (response: Response) => {
  if (response.ok) {
    return response;
  }
  try {
    const body = await response.json();
    console.log(body);
    return Promise.reject({
      body,
      errorMessage: body.msg,
      statusCode: response.status
    });
  } catch (e) {
    return Promise.reject({
      body: response.statusText,
      statusCode: response.status
    });
  }
};

const parseOptions = (options: OrderRequest) =>
  Object.entries(options)
    .map(([name, value]) => `${name}=${String(value)}`)
    .join("&");

const signOptions = (options: OrderRequest, privateKey?: string): string =>
  String(crypto.HmacSHA256(parseOptions(options), privateKey));

export const sendRequest = ({
  privateKey,
  publicKey,
  method = HTTP_METHODS.GET,
  params,
  type,
  url
}: RequestOptions): Promise<any> => {
  const headers: AnyObjectType = {};
  const body: AnyObjectType = {};

  if (params)
    for (const param in params)
      if (params[param] !== undefined) body[param] = params[param];

  if (type && type.includes(REQUEST_TYPE.AUTHORIZED)) {
    headers[BINANCE_API_KEY_HEADER] = publicKey;
    headers["content-type"] = "application/x-www-form-urlencoded";
  }
  if (type && type.includes(REQUEST_TYPE.SIGNED)) {
    body["timestamp"] = String(Date.now());
    body["signature"] = signOptions(body, privateKey);
  }
  const getParams = new URLSearchParams(body).toString();
  const options = {
    method,
    headers,
    body:
      method === HTTP_METHODS.POST && Object.values(body).length
        ? getParams
        : undefined
  };
  const fetchUrl = method !== HTTP_METHODS.POST ? `${url}?${getParams}` : url;
  return fetch(fetchUrl, options)
    .then(handleErrors)
    .then(response => response.json());
};

const deleteRequest = (
  options: RequestOptions,
  wrapper: (input: any) => any = from
): any => wrapper(sendRequest({ ...options, method: HTTP_METHODS.DELETE }));

const get = (
  options: RequestOptions,
  wrapper: (input: any) => any = from
): any => wrapper(sendRequest({ ...options, method: HTTP_METHODS.GET }));

const post = (
  options: RequestOptions,
  wrapper: (input: any) => any = from
): any => wrapper(sendRequest({ ...options, method: HTTP_METHODS.POST }));

export const requestService = { deleteRequest, get, post };
