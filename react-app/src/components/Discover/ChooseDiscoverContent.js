import { useDiscoverContent } from "../../context/DiscoverContentContext";

function ChooseDiscoverContent() {

  const {discoverContent, setDiscoverContent} = useDiscoverContent()

  return (
    <div className=''>
      <button className="QM" onClick={() => setDiscoverContent('QuestionMatch')}>Question Match</button>
      <button className="HM" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope Match</button>
    </div>
  );
}

export default ChooseDiscoverContent;
