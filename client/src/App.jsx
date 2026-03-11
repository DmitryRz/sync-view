import { useState, useEffect } from 'react';

function App() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('api/users/me')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                return response.json();
            })
            .then((data) => setUser(data))
            .catch((err) => setError(err.message));
    }, []);

    if (error) return <h1>Ошибка: {error}</h1>;
    if (!user) return <h1>Загрузка...</h1>;

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <img
                src={user.avatar}
                alt="Avatar"
                style={{ borderRadius: '50%', width: '100px' }}
            />
            <h1>Привет, {user.username}!</h1>
            <p>Твой email: {user.email}</p>
        </div>
    );
}

export default App;