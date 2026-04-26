import React from 'react';
import { Menu, Search, Video, Bell, Sun, Moon } from 'lucide-react';

const Header = ({ toggleTheme, isDark }) => {
    return (
        <header className="h-14 px-4 flex items-center justify-between bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-none sticky top-0 z-50 transition-colors">
            <div className="flex items-center gap-4">
                <Menu className="cursor-pointer text-gray-700 dark:text-white" />
                <div className="text-2xl font-bold text-sky-600 dark:text-sky-400 italic tracking-tighter cursor-pointer">
                    My logo
                </div>
            </div>

            <div className="flex-1 max-w-2xl px-10 hidden md:block">
                <div className="flex">
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full bg-gray-50 dark:bg-[#121212] border border-gray-300 dark:border-gray-700 rounded-l-full px-4 py-1.5 focus:outline-none focus:border-blue-500 text-gray-900 dark:text-white"
                    />
                    <button className="bg-gray-100 dark:bg-[#222222] border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-full px-5 hover:bg-gray-200 dark:hover:bg-[#303030] transition-colors">
                        <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-5 text-gray-700 dark:text-white">
                <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-gray-700" />}
                </button>
                <Video className="w-6 h-6 cursor-pointer hidden sm:block" />
                <Bell className="w-6 h-6 cursor-pointer hidden sm:block" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-red-600 cursor-pointer"></div>
            </div>
        </header>
    );
};

export default Header;