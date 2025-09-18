/* eslint-disable @typescript-eslint/no-explicit-any */

import ClientService from "./services";


const clientAxios = new ClientService({
  defaults: {
    baseURL: "",
  },
  prefix: "/api",
});

const get = <Resp = unknown>(
  url: string,
  params?: Record<string, unknown>,
  options?: object
): Promise<any> => clientAxios.get<Resp>(url, params, options);

const post = <Resp = unknown, Req = unknown>(
  url: string,
  data?: Req,
  options?: object
): Promise<any> => clientAxios.post<Resp, Req>(url, data as Req, options);

const put = <Resp = unknown, Req = unknown>(
  url: string,
  data?: Req,
  options?: object
): Promise<any> => clientAxios.put<Resp, Req>(url, data as Req, options);

const del = <Resp = unknown>(
  url: string,
  params?: Record<string, unknown>,
  options?: object
): Promise<any> => clientAxios.delete<Resp>(url, params, options);

export { get, post, put, del };
export default clientAxios;
