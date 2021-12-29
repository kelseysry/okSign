import {useBackgroundContent} from "../../context/BackgroundContext"

function ChooseBackgroundContent() {

  const {backgroundContent, setBackgroundContent} = useBackgroundContent()

  return (
    <div className={`${backgroundContent}`}>
      <div onClick={() => setBackgroundContent('light')} className=''>
        ☀️
      </div>
      <div onClick={() => setBackgroundContent('dark')} className=''>
       🌙
      </div>
    </div>
  );
}

export default ChooseBackgroundContent;
