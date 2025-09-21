import AxiosCommon , { AxiosOptions} from "../Axios";

class ClientService extends AxiosCommon {
  constructor(options: AxiosOptions) {
    super(options);
    this.axiosInstance.interceptors.response.use(
      async (response) => {
        return {...response.data, code: response.status};
      },
      async function (error) {
        return {
          code: error.response.status ||error.response.data?.code || 500,
          message: error.response.data?.message || "Request failed",
          data: error?.response?.data.errors || error?.data || error,
        };
      }
    );
  }
}

export default ClientService;