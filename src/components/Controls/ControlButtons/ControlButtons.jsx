import React from "react";
import "./ControlButtons.css";

export default function ControlButtons({audioRef}) {
  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  const loop = () => {
    audioRef.current.loop = !audioRef.current.loop;
  };

  return (
    <div className="control-buttons">
      <button className="prev-button">Previous</button>
      <button className="pause-button" onClick={togglePlay}>Pause</button>
      <button className="next-button">Next</button>
      <button className="loop-button" onClick={loop}>Loop</button>
    </div>
  );
}
