import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { METHOD } from "../contants";

export interface AxiosOptions {
  defaults?: AxiosRequestConfig;
  prefix?: string;
}

interface ApiResponse<T = unknown> {
  message: string | string[];
  data?: T | null;
  code: number;
}

interface RequestOptions<Req = unknown> {
  url: string;
  method: string;
  data?: Req;
  params?: Record<string, unknown>;
}

class AxiosCommon {
  protected axiosInstance: AxiosInstance;
  protected prefix = "";

  constructor(options: AxiosOptions) {
    this.axiosInstance = axios.create(options?.defaults);
    this.prefix = options?.prefix || "";
  }

  protected async setHeaders(): Promise<void> {
    // Override nếu cần
  }

  private async request<Resp = unknown, Req = unknown>(
    { url, method, data, params }: RequestOptions<Req>,
    opts: Partial<RequestOptions> = {}
  ): Promise<AxiosResponse<ApiResponse<Resp>>> {
    await this.setHeaders();

    const config: AxiosRequestConfig = {
      url: this.prefix + url,
      method,
      data: data ?? opts.data,
      params: params ?? opts.params,
    };

    try {
      const response = await this.axiosInstance.request<ApiResponse<Resp>>(config);
      return response as AxiosResponse<ApiResponse<Resp>>;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public get<Resp = unknown>(
    url: string,
    params: Record<string, unknown> = {},
    options: Partial<RequestOptions> = {}
  ): Promise<AxiosResponse<ApiResponse<Resp>>> {
    return this.request<Resp>({ url, method: METHOD.GET, params }, options);
  }

  public post<Resp = unknown, Req = unknown>(
    url: string,
    data: Req,
    options: Partial<RequestOptions> = {}
  ): Promise<AxiosResponse<ApiResponse<Resp>>> {
    return this.request<Resp, Req>({ url, method: METHOD.POST, data }, options);
  }

  public put<Resp = unknown, Req = unknown>(
    url: string,
    data: Req,
    options: Partial<RequestOptions> = {}
  ): Promise<AxiosResponse<ApiResponse<Resp>>> {
    return this.request<Resp, Req>({ url, method: METHOD.PUT, data }, options);
  }

  public delete<Resp = unknown>(
    url: string,
    params: Record<string, unknown> = {},
    options: Partial<RequestOptions> = {}
  ): Promise<AxiosResponse<ApiResponse<Resp>>> {
    return this.request<Resp>({ url, method: METHOD.DELETE, params }, options);
  }

  public patch<Resp = unknown, Req = unknown>(
    url: string,
    data: Req,
    options: Partial<RequestOptions> = {}
  ): Promise<AxiosResponse<ApiResponse<Resp>>> {
    return this.request<Resp, Req>({ url, method: METHOD.PATCH, data }, options);
  }
}

export default AxiosCommon;
