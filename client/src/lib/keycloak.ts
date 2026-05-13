import Keycloak, { type KeycloakConfig } from "keycloak-js"

const keycloakConfig: KeycloakConfig = {
  url: import.meta.env.VITE_KEYCLOAK_URL || window.location.origin + "/auth",
  realm: import.meta.env.VITE_KEYCLOAK_REALM || "syncview",
  clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "frontend-client",
}

const keycloak: Keycloak = new Keycloak(keycloakConfig);

export default keycloak;