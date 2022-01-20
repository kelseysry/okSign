import horoscopePics from "../../data/horoscopePics"
import "./MatchProfileHoroscope.css"

const MatchProfileHoroscope = () => {





  return (
    <>

    <div className="matchContainerHeader">Horoscope Compatibility</div>
    <div className="MatchHoroscopeInnerContainer">
      <div className="bench">
        <img src={horoscopePics.collection[12].imageUrl} />
      </div>
    </div>

    </>

  )


}

export default MatchProfileHoroscope
