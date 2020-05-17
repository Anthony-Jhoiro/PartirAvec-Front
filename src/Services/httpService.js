import keycloakService from "./keycloakService";
import axios from 'axios';

const _axios = axios.create();

/**
 * Configure axios to add Bearer token in Authorisation header in and renew this token for every requests
 * @param callback to do afteer configuration
 */
const configure = (callback) => {
    _axios.interceptors.request.use(config => {
        const cb = () => {
            //Add Bearer token in Authorisation header
            config.headers.Authorization = 'Bearer ' + keycloakService.getToken();
            return Promise.resolve(config);
        };
        return keycloakService.updateToken(cb);
    });
    callback();
}
/**
 * @deprecated
 * Add token if previous configure failed
 * @returns {{headers: {authorization: string}}} the header with authorisation
 */
const getConfig = () => {
    return {
        headers: {
            'authorization': 'Bearer ' + keycloakService.getToken()
        }
    }
}

/**
 * Return the configure axios client (configure only
 * if httpService.configure has been called before
 * @returns {AxiosInstance}
 */
const getAxiosClient = () => _axios;

export default {
    getAxiosClient,
    configure,
    getConfig
}
