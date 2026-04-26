import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "./sidebar/Sidebar.jsx";
import Header from "../header/Header.jsx";
import {useTheme} from "../../context/ThemeContext.js";

const MainLayout = () => {
    const { isDark, toggleTheme } = useTheme();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="bg-white dark:bg-[#0f0f0f] h-screen flex flex-col overflow-hidden transition-colors duration-300">
            <Header
                toggleTheme={toggleTheme}
                isDark={isDark}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar isOpen={isSidebarOpen} />

                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;