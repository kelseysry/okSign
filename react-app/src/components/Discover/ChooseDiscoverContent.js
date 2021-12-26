import { useDiscoverContent } from "../../context/DiscoverContentContext";

function ChooseDiscoverContent() {

  const {discoverContent, setDiscoverContent} = useDiscoverContent()

  return (
    <div className=''>
      <button className="question" onClick={() => setDiscoverContent('QuestionMatch')}>Question Match</button>
      <button className="horoscope" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope Match</button>
    </div>
  );
}

export default ChooseDiscoverContent;
