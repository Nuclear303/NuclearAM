import React, { useEffect, useState } from "react";
import "./ControlButtons.css";

export default function ControlButtons({audioRef}) {
  const [isPaused, setIsPaused] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPaused(false);
    } else {
      audioRef.current.pause();
      setIsPaused(true);
    }
  };

  const loop = () => {
    audioRef.current.loop = !audioRef.current.loop;
    setIsLooping(audioRef.current.loop);
  };

  

  return (
    <div className="control-buttons">
      <button className="prev-button">
        <img src="/previous.svg" alt="" />
      </button>
      <button className="pause-button" onClick={togglePlay}>
        <img src={isPaused ? "/play.svg" : "/pause.svg"} alt="" />
      </button>
      <button className="next-button">
        <img src="/next.svg" alt="" />
        </button>
      <button className="loop-button" onClick={loop} >
        <img src="/repeat-1.svg" alt="" className={isLooping ? "looping" : ""}/>
      </button>
    </div>
  );
}
