import { open } from "@tauri-apps/plugin-dialog"
import * as mm from 'music-metadata';
import {readFile} from "@tauri-apps/plugin-fs"
import { useState } from "react";
export default function Controls(){
    let [image, setImage] = useState("");
    const getFile = async ()=>{
        let metadata;
        
        const file = await open({
            multiple: false,
            directory: false
        });
        console.log(file);
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
    return(
        <div className="controls">
            <audio src=""></audio>
            <button onClick={getFile}></button>
            <img src={image} alt=""/>
            {/* <CurrentPlay/>
            <ControlButtons/>
            <VolumeBar/> */}
        </div>
    )
}