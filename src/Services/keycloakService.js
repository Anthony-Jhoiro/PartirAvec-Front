import Keycloak from "keycloak-js";


const _keycloak = Keycloak("/keycloak.json");

/**
 * Init keycloak with the content of public/keycloak.json file
 * @param callback call when client is authenticated
 */
const initKeycloak = callback => {
    _keycloak.init({onLoad: 'login-required'}).then(authenticated => {
        if (authenticated) {
            callback(authenticated);
        } else {
            _keycloak.login();
        }
    });
}

/**
 * Return current autentification token
 * @returns {string}
 */
const getToken = () => _keycloak.token;

/**
 * Return current authentification state
 * @returns {boolean}
 */
const getAuthentication = () => _keycloak.authenticated;

/**
 * Call keycloak to renew the access token
 * @param callback
 * @returns {Promise<boolean | void>}
 */
const updateToken = callback => {
    return _keycloak.updateToken(30)
        .then(callback)
        .catch(_keycloak.login)
}

/**
 * Logout the client
 * @returns {Keycloak.KeycloakPromise<void, void>}
 */
const logout = () => _keycloak.logout();

export default {
    initKeycloak,
    updateToken,
    getAuthentication,
    getToken,
    logout
}
