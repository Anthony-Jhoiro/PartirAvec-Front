import keycloakService from "./keycloakService";
import axios from 'axios';

const _axios = axios.create();

const configure = () => {
    _axios.interceptors.request.use(config => {
        // const cb = () => {
        //
        //     console.log("hello");
        //     // window.axios.defaults.headers.post['Authorization'] = 'Bearer ' + keycloakService.getToken();
        //     config.headers.Authorization = 'Bearer ' + keycloakService.getToken();
        //     return Promise.resolve(config);
        // };
        // return keycloakService.updateToken(cb);
        console.log("hello");
        // window.axios.defaults.headers.post['Authorization'] = 'Bearer ' + keycloakService.getToken();
        config.headers.Authorization = 'Bearer ' + keycloakService.getToken();
        return Promise.resolve(config);
    })
}
const getConfig = () => {
    console.log(keycloakService.getToken());
    return {
        headers: {
            'authorization': 'Bearer ' + keycloakService.getToken()
        }
    }
}

const getAxiosClient = () => _axios;

export default {
    getAxiosClient,
    configure,
    getConfig
}
