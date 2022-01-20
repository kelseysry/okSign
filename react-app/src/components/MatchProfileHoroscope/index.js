import horoscopePics from "../../data/horoscopePics"
import "./MatchProfileHoroscope.css"

const MatchProfileHoroscope = ({matchProfile}) => {



  console.log("matchProfile?.horoscope_id", matchProfile.horoscope_id)

  return (
    <>

    <div className="matchContainerHeader">Horoscope Compatibility</div>
    <div className="MatchHoroscopeInnerContainer">
      <div className="bench">
        <img src={horoscopePics.collection[12].imageUrl} />
      </div>
      <div className="matchHoroscopeSign">
        <img src={horoscopePics.collection[matchProfile.horoscope_id - 1 ]?.sign} />
      </div>
    </div>

    </>

  )


}

export default MatchProfileHoroscope
