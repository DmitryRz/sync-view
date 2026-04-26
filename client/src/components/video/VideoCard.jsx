import React from 'react';

const VideoCard = ({ title, author, views, time, image, avatar }) => {
    return (
        <div className="flex flex-col gap-3 cursor-pointer group">
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden relative">
                <img src={image} alt={title}
                     className="w-full h-full object-cover group-hover:scale-105 transition duration-300"/>
            </div>
            <div className="flex gap-3">
                <img src={avatar} className="w-9 h-9 rounded-full object-cover flex-shrink-0" alt={author}/>
                <div className="flex flex-col">
                    <h3 className="font-semibold line-clamp-2 text-sm text-gray-900 dark:text-white transition-colors">
                        {title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-1 hover:text-gray-900 dark:hover:text-white transition-colors">
                        {author}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-tight">
                        {views} • {time}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VideoCard;