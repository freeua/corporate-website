import React from "react";
import YouTube from "react-youtube";

const YoutubeEmbed = ({ videoId, isActive }) => {
  const opts = {
    height: "390",
    width: "280",
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default YoutubeEmbed;
