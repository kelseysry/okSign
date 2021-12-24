import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';


const Player = ({sound}) => {

  return (

    <AudioPlayer
      // autoPlay
      src={sound}
      onPlay={e => console.log("onPlay")}
    />

  )

}

export default Player
