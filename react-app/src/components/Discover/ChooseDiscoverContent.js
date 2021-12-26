import { useDiscoverContent } from "../../context/DiscoverContentContext";

function ChooseDiscoverContent() {

  const {discoverContent, setDiscoverContent} = useDiscoverContent()

  return (
    <div className='discoverContent-buttons-container'>
      <div className="option">
       {discoverContent === 'QuestionMatch' ? <div className="heart-choice">💕</div> : <div>&nbsp;</div>}
        <button className="QM" onClick={() => setDiscoverContent('QuestionMatch')}>Question Match</button>
      </div>
      <div className="option">
      {discoverContent === 'HoroscopeMatch' ? <div className="heart-choice">💕</div> : <div>&nbsp;</div>}
        <button className="HM" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope Match</button>
      </div>
    </div>
  );
}

export default ChooseDiscoverContent;
