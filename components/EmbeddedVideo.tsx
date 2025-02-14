import React from "react";

interface EmbeddedVideoProps {
  videoUrl: string;
  title?: string;
}

const EmbeddedVideo: React.FC<EmbeddedVideoProps> = ({ videoUrl, title }) => {
  return (
    <div className="mt-6 w-full">
      <iframe
        className="w-full aspect-video rounded-lg shadow-md"
        src={videoUrl}
        title={title || "Embedded Video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default EmbeddedVideo;
