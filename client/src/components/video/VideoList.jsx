import React from 'react';
import VideoCard from "./VideoCard.jsx";

const VideoList = () => {
    const videos = [
        { title: "MI Fallout", author: "ethanhunt", views: "No views", time: "6 hours ago", image: "https://picsum.photos/seed/1/400/225", avatar: "https://i.pravatar.cc/100?u=1" },
        { title: "Mad Max Sandstorm", author: "madmax", views: "No views", time: "6 hours ago", image: "https://picsum.photos/seed/2/400/225", avatar: "https://i.pravatar.cc/100?u=2" },
        { title: "Ready Player One [Opening Scene]", author: "johnwick", views: "No views", time: "7 hours ago", image: "https://picsum.photos/seed/3/400/225", avatar: "https://i.pravatar.cc/100?u=3" },
        { title: "The adventures of TinTin", author: "tintin", views: "1 view", time: "7 hours ago", image: "https://picsum.photos/seed/4/400/225", avatar: "https://i.pravatar.cc/100?u=4" },
    ];

    return (
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f] p-6 transition-colors">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Video</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((vid, index) => (
                    <VideoCard key={index} {...vid} />
                ))}
            </div>
        </main>
    );
};

export default VideoList;