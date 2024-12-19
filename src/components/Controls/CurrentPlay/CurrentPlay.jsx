import { useState } from "react";
import "./CurrentPlay.css";
export default function CurrentPlay({metadata})
{
  // The CurrentPlay component is a functional component that will display the current song being played.
  // It will display the name of the current song being played along with the name of the artist and the album cover.
  let [image, setImage] = useState("");
   
  if(metadata != {} && metadata.common != undefined){
    fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${import.meta.env.VITE_API_KEY}&artist=${metadata.common?.artist}&album=${metadata.common?.album}&format=json`)
    .then(response=> response.json())
    .then(json=>{
      console.log(json);
      setImage(json.album.image[2]["#text"]);
    })
  }
  
  return (
    <>{
    (()=>{
      console.log(metadata)
    })()
    }
      <div className="current-play">
        <img src={image} alt="album cover" />
        <div className="current-play-info">
          <h3>{metadata.common?.title ?? ""}</h3>
          <p>{metadata.common ? `${metadata.common?.artist} - ${metadata.common.album}` : ""}</p>
        </div>
      </div>
    </>
  )
}