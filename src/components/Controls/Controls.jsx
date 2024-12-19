import { open } from "@tauri-apps/plugin-dialog"
import * as mm from 'music-metadata';
import {readFile} from "@tauri-apps/plugin-fs"
import { useState, useRef, useEffect} from "react";

import VolumeBar from "./VolumeBar/VolumeBar";
import CurrentPlay from "./CurrentPlay/CurrentPlay";
import ControlButtons from "./ControlButtons/ControlButtons";
import "./Controls.css"

export default function Controls(){
  // state variables

  let [audioVolume, setVolume] = useState(1);
  let [metadata, setMetadata] = useState({});
  // refs
  const audioRef = useRef(null);
  // sets volume after changing the volume bar value
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = audioVolume;
    }
  }, [audioVolume]); 

  // loads file and finds an album cover for it, if metadata available
  // TODO: extract loading the cover to a different function
  const getFile = async ()=>{

      
      // TODO allow multiple file/directory open to form a listening queue
      const file = await open({
          multiple: false,
          directory: false,
          filters: [{
            name: 'Music file',
            extensions: ['mp3', 'wav', 'flac', 'ogg']
          }]
      });
      console.log(file);
      const fileBuffer = await readFile(file);
      const blob = new Blob([fileBuffer], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);

      document.querySelector("audio").src = url;
      document.querySelector("audio").play();
      (async () => {
        try{
            const audioStream = await readFile(file);
        
            setMetadata(await mm.parseBuffer(audioStream));

            console.log(metadata);
          }
          catch(error){
            console.error("Error getting metadata", error.message)
          }
      })();
    }

    

    const setVol = (value)=>{
      setVolume(value);
    }

    return(
    <>
        <button onClick={getFile}></button>
        <div className="controls">
          <audio src="" ref={audioRef}></audio>
            <CurrentPlay metadata={metadata}/>
            <ControlButtons audioRef={audioRef}/>
            <VolumeBar onChangeVolume={setVol}/>
        </div>
    </>
    )
}