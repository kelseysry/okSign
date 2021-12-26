import { useDiscoverContent } from "../../context/DiscoverContentContext";

function ChooseDiscoverContent() {

  const {discoverContent, setDiscoverContent} = useDiscoverContent()

  return (
    <div className='discoverContent-buttons-container'>
      <div className="option1">
       {discoverContent === 'QuestionMatch' ? <div>💖</div> : <div>&nbsp;</div>}
        <button className="QM" onClick={() => setDiscoverContent('QuestionMatch')}>Question Match</button>
      </div>
      <div className="option1">
      {discoverContent === 'HoroscopeMatch' ? <div>💖</div> : <div>&nbsp;</div>}
        <button className="HM" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope Match</button>
      </div>
    </div>
  );
}

export default ChooseDiscoverContent;
