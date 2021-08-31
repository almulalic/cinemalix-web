import React from "react";

import "./VideoPlayer.css";

export interface VideoSource {
  src: string;
  type: string;
  sizes: string;
}

export interface VideoTrack {
  kind: string;
  label: string;
  srcLang: string;
  src: string;
  default?: boolean;
}

export interface IVideoPlayerProps {
  id: string;
  controls: boolean;
  playsInline: boolean;
  poster: string;
  sources: VideoSource[];
  tracks: VideoTrack[];
  downloadLink: string;
}

const VideoPlayer = ({
  id,
  controls,
  playsInline,
  poster,
  sources,
  tracks,
  downloadLink,
}: IVideoPlayerProps) => {
  return (
    <video id={id} controls={controls} playsInline={playsInline} poster={poster}>
      {sources.map((x) => {
        <source src={x.src} type={x.type} sizes={x.sizes} />;
        return;
      })}

      {sources.map((x) => {
        return <source src={x.src} type={x.type} sizes={x.sizes} />;
      })}

      {tracks.map((x) => {
        return <track kind={x.kind} label={x.label} srcLang={x.srcLang} src={x.src} default={x.default} />;
      })}

      <a href={downloadLink} download>
        Download
      </a>
    </video>
  );
};

export default VideoPlayer;
