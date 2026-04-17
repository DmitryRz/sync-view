import { useState, useEffect } from 'react';
import keycloak from "./auth/keycloak.js";

function App({ isAuth, authError }) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(keycloak.authenticated);

    useEffect(() => {
        if (keycloak.authenticated) {
            fetch('api/users/me', {
                headers: { 'Authorization': `Bearer ${keycloak.token}` }
            })
                .then(res => res.json())
                .then(data => {
                    console.log("User data fetched:", data);
                    setUser(data);
                    console.log(user)
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        }
    }, []);
    
    if (error) return <h1>Ошибка: {error}</h1>;

    if (!keycloak.authenticated) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1>Вы не вошли в систему</h1>
                <button onClick={() => keycloak.login()}>Войти (SSO)</button>
            </div>
        );
    }

    if (authError) {
        return <h1>Ошибка аутентификации: {authError}</h1>;
    }

    if (loading || !user) {
        return <h1>Загрузка данных профиля... (User is {user ? 'ready' : 'null'})</h1>;
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            {user.avatar && <img src={user.avatar} alt="avatar" style={{ borderRadius: '50%' }} />}
            <h1>Привет, {user.username}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default App;