
import React, { useEffect, useState } from 'react';
import SearchMatchTile from '../SearchMatchTile';

const SearchCarouselContainer = ({input, searchUserResults}) => {


  let [navigateClick, setNavigateClick] = useState(-1)
  const [slide, setSlide] = useState(1)


  const handleLeftClick = (e) => {
    e.preventDefault();
    const left = document.querySelector('#discoverProfile');
    left.scrollLeft -= 1050;
    setSlide(1)
    if(navigateClick !== -1) {
      setNavigateClick(navigateClick -= 1)
    } else {
      navigateClick = -1
    }

  }
  // add functionality to only see name when click

  const handleRightClick = (e) => {
    e.preventDefault();
    const right = document.querySelector('#discoverProfile');
     right.scrollLeft += 1050;
     setSlide(1)
     if(navigateClick < searchUserResults?.length -1) {
      setNavigateClick(navigateClick += 1)
     } else {
       return navigateClick
     }

  }

  return (
    <section className="DiscoverContentContainer">

    <button
        id="go-back"f
        className="left"
        onClick={handleLeftClick}
        onAnimationEnd={() => setSlide(0)}
        slide={slide}
        >
        <span className="hide-button">⬅️</span>
    </button>


      <div className="discover-profiles-container" id="discoverProfile">

      <section className="step-container-search">
    <div className="Step1s">search</div>
    <div className="Step2s">results</div>
    <div className="Step3s">for</div>

    <div className="Step5s">{input}</div>
    {/* <button id={discoverContent === 'HoroscopeMatch' ? 'orangeFont' : 'whiteFont'} className="Step6" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope</button> */}
    {/* <div className={discoverContent === 'HoroscopeMatch' ? 'hideClickMe' : 'StepClick2' }>Click Me</div> */}
  </section>


    <div className="discover-profiles-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
          {searchUserResults?.map((profile, idx) =>
              <div  className={navigateClick === idx? `one-discover-profile` : `one-discover-profile-o` } key={idx}>
                  <SearchMatchTile navigateClick={navigateClick} idx={idx} setSlide={setSlide} slide={slide} profile={profile} />
                  {/* <MatchProfile navigateClick={navigateClick} idx={idx} setSlide={setSlide} slide={slide} userIdPercentObj={userIdPercentObj}/> */}
              </div>
            )}
       </div>


      <button
      id="next-profile"
      className="right"
          onClick={handleRightClick}
          onAnimationEnd={() => setSlide(0)}
          slide={slide}
      >
        <span className="hide-button">➡️</span>
      </button>
  </section>

  )

}

export default SearchCarouselContainer
