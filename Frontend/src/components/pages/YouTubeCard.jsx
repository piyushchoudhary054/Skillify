import React from 'react';

const YouTubeCard = ({ videoId, title }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white p-4">
      {/* Video */}
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video title */}
      <div className="mt-4">
        <h2 className="font-bold text-xl text-gray-900">{title}</h2>
      </div>
    </div>
  );
};

export default YouTubeCard;