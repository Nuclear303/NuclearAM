export default function VolumeBar({onChangeVolume}){
    const setVolume=(e)=>{
        onChangeVolume(Number(e.target.value))
    }
    const setBackgroundGradient = (e) => {
        let value = (e.target.value-e.target.min)/(e.target.max-e.target.min)*100;
        value-=(value/20)-3;
        e.target.style.background = 'linear-gradient(to right, rgb(30, 90, 200) 0%, rgb(30, 90, 200) ' + value + '%, #fff ' + value + '%, white 100%)'
      };
    return(
        <>
            <input type="range" name="" id="" max={1} step={0.01} min={0} onChange={setVolume} onInput={setBackgroundGradient}/>
        </>
    )
}