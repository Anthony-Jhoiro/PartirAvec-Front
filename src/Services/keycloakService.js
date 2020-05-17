import Keycloak from "keycloak-js";


const _keycloak = Keycloak("/keycloak.json");

const initKeycloak = callback => {
    _keycloak.init({onLoad: 'login-required'}).then(authenticated => {
        if (authenticated) {
            callback(authenticated);
        } else {
            _keycloak.login();
        }
    });
}

const getToken = () => _keycloak.token;

const getAuthentication = () => _keycloak.authenticated;

const updateToken = callback => {
    return _keycloak.updateToken(30)
        .then(callback)
        .catch(_keycloak.login)
}

const logout = () => _keycloak.logout();

export default {
    initKeycloak,
    updateToken,
    getAuthentication,
    getToken,
    logout
}
