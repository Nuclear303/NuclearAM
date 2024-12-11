import { open } from "@tauri-apps/plugin-dialog"
import * as mm from 'music-metadata';
import {readFile} from "@tauri-apps/plugin-fs"
import { useState, useRef, useEffect} from "react";
import VolumeBar from "./VolumeBar/VolumeBar";
import "./Controls.css"

export default function Controls(){
  // state variables
  let [image, setImage] = useState("");
  let [audioVolume, setVolume] = useState(1);
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

      let metadata = new Object();
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
        
            metadata = await mm.parseBuffer(audioStream);

            console.log(metadata);
            fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${import.meta.env.VITE_API_KEY}&artist=${metadata.common.artist}&album=${metadata.common.album}&format=json`).then(response=>{
              return response.json();
            })
            .then(json=>{
              console.log(json);
              setImage(json.album.image[2]["#text"]);
            })
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
        <div className="controls">
            <audio src="" ref={audioRef}></audio>
            <button onClick={getFile}></button>
            <img src={image} alt=""/>
            {/* <CurrentPlay/>
            <ControlButtons/>*/}
            <VolumeBar onChangeVolume={setVol}/>
        </div>
    )
}