import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const Player = () => {

  return (

    <AudioPlayer
      autoPlay
      src="https://res.cloudinary.com/mabmab/video/upload/v1639292032/okSign/New_Coronavirus_Laws_Funny_vu9ais.mp3"
      onPlay={e => console.log("onPlay")}
      // other props here
    />

  )

}

export default Player
