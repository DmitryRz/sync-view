import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import keycloak from "./auth/keycloak.js";

const renderApp = (authenticated, error = null) => {
    createRoot(document.getElementById('root')).render(
        <StrictMode>
            <App isAuth={authenticated} authError={error} />
        </StrictMode>,
    );
};

console.log(window.location.origin + '/silent-check-sso.html');

keycloak.init({
    onLoad: 'check-sso',
    checkLoginIframe: false
})
.then(authenticated => {
    renderApp(authenticated);
})
.catch(error => {
    console.error('Failed to initialize Keycloak:', error);
    renderApp(false, 'Failed to initialize authentication');
});