import ServiceService from "./services";

const serverAjax = new ServiceService({
  defaults: {
    baseURL: process.env.CORE_API_DOMAIN, // backend API URL
  },
  prefix: "",
});

const get = (...args: Parameters<typeof serverAjax.get>) => serverAjax.get(...args);
const post = (...args: Parameters<typeof serverAjax.post>) => serverAjax.post(...args);
const put = (...args: Parameters<typeof serverAjax.put>) => serverAjax.put(...args);
const del = (...args: Parameters<typeof serverAjax.delete>) => serverAjax.delete(...args);
export { get, post, put, del };
export default serverAjax;