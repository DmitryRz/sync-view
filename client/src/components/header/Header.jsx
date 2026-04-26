import React, {useState} from 'react';
import { Menu, Search, Video, Bell, Sun, Moon, User, ChevronDown, LogOut } from 'lucide-react';
import keycloak from "../../auth/keycloak.js";

const Header = ({ toggleTheme, isDark, toggleSidebar }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="h-14 px-4 flex items-center justify-between bg-white dark:bg-[#0f0f0f] border-b border-gray-200 dark:border-none sticky top-0 z-50 transition-colors">
            <div className="flex items-center gap-4">
                <Menu className="cursor-pointer text-gray-700 dark:text-white" onClick={toggleSidebar} />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 italic tracking-tighter cursor-pointer">
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
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {!keycloak.authenticated ? (
                    <button
                        onClick={() => keycloak.login()}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-md active:scale-95"
                    >
                        <User className="w-5 h-5" />
                        <span className="text-sm font-medium">Войти</span>
                    </button>
                ) : (
                    <div className="flex items-center gap-4">
                        <Video className="w-6 h-6 cursor-pointer hidden sm:block hover:text-blue-500 transition-colors" />
                        <Bell className="w-6 h-6 cursor-pointer hidden sm:block hover:text-blue-500 transition-colors" />

                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-1 focus:outline-none"
                            >
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-400 to-red-600 border-2 border-white dark:border-gray-700 shadow-sm hover:ring-2 ring-orange-300 transition-all" />
                                <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Само выпадающее меню */}
                            {isMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>

                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1 z-20 overflow-hidden">
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Аккаунт</p>
                                            <p className="text-sm font-semibold truncate">{keycloak.tokenParsed?.preferred_username}</p>
                                        </div>

                                        <button
                                            onClick={() => keycloak.logout()}
                                            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Выйти
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;