import React, { useState, useEffect } from 'react';
import Header from "./components/header/Header.jsx";
import VideoList from "./components/video/VideoList.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";

function App() {
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <div className="bg-white dark:bg-[#0f0f0f] h-screen flex flex-col overflow-hidden transition-colors duration-300">
            <Header toggleTheme={() => setIsDark(!isDark)} isDark={isDark} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <VideoList />
            </div>
        </div>
    );
}

export default App;