import React, { useEffect, useState } from 'react';
import VideoCard from "./VideoCard.jsx";

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/videos');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setVideos(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f] p-6 transition-colors">Loading videos...</main>;
    }

    if (error) {
        return <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f] p-6 transition-colors">Error: {error.message}</main>;
    }

    return (
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-[#0f0f0f] p-6 transition-colors">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Video</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                {videos.map((vid) => (
                    <VideoCard
                        key={vid.id}
                        title={vid.title}
                        author={vid.ownerUsername}
                        views="No views"
                        time={new Date(vid.createdAt).toLocaleDateString()}
                        image="https://picsum.photos/seed/placeholder/400/225"
                        avatar="https://i.pravatar.cc/100?u=placeholder"
                    />
                ))}
            </div>
        </main>
    );
};

export default VideoList;