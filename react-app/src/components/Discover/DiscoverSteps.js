
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import MatchProfile from "../MatchProfile";
import NoMatches from "../NoMatches";
import './Discover.css'
import DiscoverHoroscope from "../DiscoverHoroscope/DiscoverHoroscopePage";
import { useBackgroundContent } from "../../context/BackgroundContext";
import pictures from "../../data/pictures";
import './DiscoverSlide.css'
import '../MatchProfile/DiscoverPics.css'
import './Step.css'
import Discover from ".";
import { useDiscoverContent } from "../../context/DiscoverContentContext";
import horoscopePics from "../../data/horoscopePics";
const DiscoverSteps = () => {

  const [discoverContent, setDiscoverContent] = useState('QuestionMatch')

  // const {discoverContent, setDiscoverContent} = useDiscoverContent()

  console.log("discoverContent",discoverContent )

  return (
    <>
      <section className="step-container">
            <div className="Step1">Discover</div>
            <div className="Step2">Users</div>
            <div className="Step3">By</div>

            <button
              id={discoverContent === 'HoroscopeMatch' ? 'whiteFont' : 'orangeFont'}
              className="Step4" onClick={() => setDiscoverContent('QuestionMatch')}
              >
                Questions
            </button>

            <div
              className={discoverContent === 'HoroscopeMatch' ? 'DiscoverStepClick1' : 'hideClickMe' }
              onClick={() => setDiscoverContent('QuestionMatch')}
              >
              Click Me
            </div>

            <div className="Step5">Or</div>

            <button
              id={discoverContent === 'HoroscopeMatch' ? 'orangeFont' : 'whiteFont'}
              className="Step6" onClick={()=> setDiscoverContent('HoroscopeMatch')}
              >
              Horoscope
              </button>

            <div className={discoverContent === 'HoroscopeMatch' ? 'hideClickMe' : 'DiscoverStepClick2' }
            onClick={()=> setDiscoverContent('HoroscopeMatch')}
            >Click Me</div>


            <button className="img-stairs"
              // onClick={handleRightClick}
            >
            {discoverContent === 'QuestionMatch' ?<img src={pictures.collection[10].imageUrl} /> : <img src={horoscopePics.collection[10].imageUrl} /> }
            </button>
      </section>



    <button>
      <Discover />
    </button>

    </>

  )
}


export default DiscoverSteps
