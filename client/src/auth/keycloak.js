import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: window.location.origin + '/auth',
    realm: 'syncview',
    clientId: 'frontend-client',
});

export default keycloak;