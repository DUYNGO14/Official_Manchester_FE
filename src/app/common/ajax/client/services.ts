import AxiosCommon , { AxiosOptions} from "../Axios";

class ClientService extends AxiosCommon {
  constructor(options: AxiosOptions) {
    super(options);
    this.axiosInstance.interceptors.response.use(
      async (response) => {
        console.log("Response Interceptor client: ", response.data);
        return {...response.data, code: response.status};
      },
      async function (error) {
        console.log("Response Interceptor Error client:", error);
        return {
          code: error.response.status ||error.response.data?.code || 500,
          message: error.response.data?.errors[0].message|| error.response.data?.message || "Request failed",
          data: error?.response?.data || error?.data || error,
        };
      }
    );
  }
}

export default ClientService;