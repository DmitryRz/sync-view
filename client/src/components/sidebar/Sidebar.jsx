import React from 'react';
import { Home, Globe, PlusCircle, Users, History } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false }) => (
    <a href="#" className={`flex items-center gap-5 p-2 rounded-lg transition-colors ${
        active
            ? 'bg-gray-100 dark:bg-[#272727] font-medium text-gray-900 dark:text-white'
            : 'text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-[#272727]'
    }`}>
        <Icon className="w-5 h-5" />
        <span className="text-sm">{label}</span>
    </a>
);

const Sidebar = () => {
    return (
        <aside className="w-60 flex-shrink-0 overflow-y-auto bg-white dark:bg-[#0f0f0f] py-2 px-3 space-y-4 hidden lg:block border-r border-gray-100 dark:border-none">
            <nav className="space-y-1">
                <SidebarItem icon={Home} label="Feed" active />
                <SidebarItem icon={Globe} label="Public Rooms" /> {/* Новая кнопка */}
                <SidebarItem icon={PlusCircle} label="Create Room" />
            </nav>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Личное пространство */}
            <div>
                <h3 className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase italic">Personal</h3>
                <nav className="mt-2 space-y-1">
                    <SidebarItem icon={Users} label="My Rooms" />
                    <SidebarItem icon={History} label="Watch History" />
                </nav>
            </div>

            <hr className="border-gray-200 dark:border-gray-700" />

            {/* Друзья онлайн (очень важно для соц. платформы) */}
            <div>
                <h3 className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase italic">Friends Online</h3>
                <div className="mt-2 space-y-2 px-2">
                    {['Dmitry', 'Alex', 'Sarah'].map((name) => (
                        <div key={name} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-sky-500">{name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;