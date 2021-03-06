
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import MatchProfile from "../MatchProfile";
import NoMatches from "../NoMatches";
import './Discover.css'
import DiscoverHoroscope from "../DiscoverHoroscope/DiscoverHoroscopePage";
import { useDiscoverContent } from "../../context/DiscoverContentContext";
import { useBackgroundContent } from "../../context/BackgroundContext";
import pictures from "../../data/pictures";
import './DiscoverSlide.css'
import '../MatchProfile/DiscoverPics.css'
import './Step.css'
import {SwipeInstructionModal } from "../../context/Modal";

const darkImage = pictures.collection[6].imageUrl
const lightImage = pictures.collection[6].imageUrl



const Discover = () => {

  const {discoverContent, setDiscoverContent} = useDiscoverContent()

  const {backgroundContent} = useBackgroundContent()

  const [slide, setSlide] = useState(1)

  let [navigateClick, setNavigateClick] = useState(-1)

  const [questions, setQuestions] = useState([]);

  const [currentUserProfile, setCurrentUserProfile] = useState();

  const [isLoaded, setIsLoaded] = useState(false)

  const profilesObj = useSelector((state) => state.profile)
  const profiles = Object.values(profilesObj)

  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id

  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/questions/');
      const responseData = await response.json();
      setQuestions(responseData.questions);
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoaded(true)
    async function fetchData() {
      const response = await fetch(`/api/profiles/userProfile/${user_id}`);
      const responseData = await response.json();
      console.log("responseData",responseData )

      setCurrentUserProfile(responseData);
    }
    fetchData();
  }, [isLoaded]);

let questionsRender = questions


// for each user's question object, we need to count how many answers// they have that are the same as the current user
 let currentUserQuestion = questionsRender?.filter((question) => {return question?.user_id === user_id})

 let counter = {};

if(currentUserQuestion) {

 questionsRender?.map((question, ele) => {

    if(!counter[question.user_id]) {
      counter[question.user_id] = 1
    }

    if(question?.question1 === currentUserQuestion[0]?.must_answer1) {
      counter[question.user_id] += 1
    }

    if(question.question2 === currentUserQuestion[0]?.must_answer2) {
      counter[question.user_id] += 1
    }

    if(question.question3 === currentUserQuestion[0]?.must_answer3) {
      counter[question.user_id] += 1
    }

    if(question.question4 === currentUserQuestion[0]?.must_answer4) {
      counter[question.user_id] += 1
    }

    if(question.question5 === currentUserQuestion[0]?.must_answer5) {
      counter[question.user_id] += 1
    }

    if(question.question6 === currentUserQuestion[0]?.must_answer6) {
      counter[question.user_id] += 1
    }

    if(question.question7 === currentUserQuestion[0]?.must_answer7) {
      counter[question.user_id] += 1
    }

    if(question.question8 === currentUserQuestion[0]?.must_answer8) {
      counter[question.user_id] += 1
    }

    if(question.question9 === currentUserQuestion[0]?.must_answer9) {
      counter[question.user_id] += 1
    }

    if(question.question10 === currentUserQuestion[0]?.must_answer10) {
      counter[question.user_id] += 1
    }

    return counter
  })

}
  // console.log("count", counter)
  // counter = {1: 10, 2: 6, 3: 3, 4: 10}
  // take out current user from potential match in counter
  Object.keys(counter).forEach(key => {
    if (+key === +user_id) delete counter[key];
  });
  // console.log("updated counter", counter)
  // {2: 6, 3: 3, 4: 10}

  // update counter to only include match if greater than 6/10
  Object.keys(counter).forEach(key => {
    if (counter[key] < 6) delete counter[key];
  });
  // console.log("updated counter", counter)
  // {2: 6, 4: 10}

    let userIdsPercentsObj = Object.keys(counter).map(function (key) {
        return [Number(key), counter[key]];
    });


  // right now matchProfileIds corresponds to the userId -> we need to grab the profile id
  //  userId [1, 3, 4]
  // if delete 1 and make another profile -> need to be [3,4,5]

  // instead of passing just the keys, pass in each object, you'll have to
  // grab the key instead for profile_id so can get the user.id and match%

  const getMatchProfile = (profile_id) => {
    const matchProfile = profiles[0]?.filter(function(profile){

      return profile?.user_id === +profile_id
    })
    if(matchProfile) {
      return matchProfile
    }
    else {
      return null
    }
  }

  const getMatchProfilesCount = (userIdsPercentsObj) => {
    let array = [];
    for(let i =0; i < userIdsPercentsObj.length; i++) {
      let match = getMatchProfile(userIdsPercentsObj[i][0])
      if(match?.length) array.push(match)
    }
    return array
  }


  let correctNumberMatches = getMatchProfilesCount(userIdsPercentsObj)


  let currentUserGenderPreference = currentUserProfile?.oneProfile[0]?.gender_preference_id


  let correctNumberMatchesAndGender = correctNumberMatches.filter((matchProfile) => matchProfile[0]?.gender_id  === currentUserGenderPreference)


  // console.log("correctNumberMatches",correctNumberMatches)

  // console.log("correctNumberMatchesAndGender",correctNumberMatchesAndGender)

  const handleLeftClick = (e) => {
    e.preventDefault();
    const left = document.querySelector('#discoverProfile');
    // left.scrollLeft -= 1100;
    left.scrollLeft -= 650;
    setSlide(1)
    if(navigateClick !== -1) {
      setNavigateClick(navigateClick -= 1)
    } else {
      navigateClick = -1
    }
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    const right = document.querySelector('#discoverProfile');
    //  right.scrollLeft += 1100;
    right.scrollLeft += 650;
     setSlide(1)
     if(navigateClick < correctNumberMatchesAndGender?.length -1) {
      setNavigateClick(navigateClick += 1)
     }
     else {
       return navigateClick
     }
  }


  const handleRightClickAfterModal = () => {
    // e.preventDefault();
    const right = document.querySelector('#discoverProfile');
     right.scrollLeft += 650;
     setSlide(1)
     if(navigateClick < correctNumberMatchesAndGender?.length -1) {
      setNavigateClick(navigateClick += 1)
     } else {
       return navigateClick
     }
  }



  let content2;
  content2 = (
    <DiscoverHoroscope />
  )

  let content;
  if (currentUserQuestion?.length && currentUserProfile?.oneProfile)  {
    content = (
        <>
          <section className="DiscoverContentContainer">

            <button
                id="go-back"
                className={slide === 1? `noLeft` : `left` }
                onClick={handleLeftClick}
                onAnimationEnd={() => setSlide(0)}
                slide={slide}
                >
                <span className="hide-button">??????</span>
            </button>

          <div className="discover-profiles-container" id="discoverProfile">

            <section className="step-container">
              <div className="Step1">Discover</div>
              <div className="Step2">Users</div>
              <div className="Step3">By</div>
              <button id={discoverContent === 'HoroscopeMatch' ? 'whiteFont' : 'orangeFont'} className="Step4" onClick={() => setDiscoverContent('QuestionMatch')}>Questions</button>
              <div className={discoverContent === 'HoroscopeMatch' ? 'StepClick1' : 'hideClickMe' }
              onClick={() => setDiscoverContent}
              >Click Me</div>

              <div className="Step5">Or</div>
              <button id={discoverContent === 'HoroscopeMatch' ? 'orangeFont' : 'whiteFont'} className="Step6" onClick={()=> setDiscoverContent('HoroscopeMatch')}>Horoscope</button>
              <div className={discoverContent === 'HoroscopeMatch' ? 'hideClickMe' : 'DiscoverStepClick2' }
              onClick={()=> setDiscoverContent('HoroscopeMatch')}
              >Click Me</div>
              <button className="img-stairs"
              onClick={() => {
                setShowModal(true)}
                }
              >
              <img src={pictures.collection[10].imageUrl} />
              </button>
              {showModal && (
              <SwipeInstructionModal onClose={() => {
                setShowModal(false)
                handleRightClickAfterModal()
              }}>

                <section className="InstructionsContainer">
                  <div className="instructionsHeader">Instructions</div>
                  <div className="instructionsContent">Click on the center picture to see a user's profile</div>
                  <div className="instructionsImgContainer">
                  <div className="leftSwipe"><span className="instructionsEmoji">????</span> Click to the left of the center picture to see the previous user</div>
                  <div className="rightSwipe"><span className="instructionsEmoji">????</span> Click to the right of the center picture to see the next user</div>
                    <img class="instructionsImg" src={pictures.collection[13].imageUrl} />
                  </div>

                </section>
              </SwipeInstructionModal>
            )}
            </section>

            <div className="discover-profiles-spacer">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
                  {correctNumberMatchesAndGender?.map((correctNumberMatches, idx) =>
                      correctNumberMatchesAndGender?.length ?
                    <>
                      <MatchProfile userIdsPercentsObj={userIdsPercentsObj} correctNumberMatchesAndGender={correctNumberMatchesAndGender} navigateClick={navigateClick} idx={idx} setSlide={setSlide} slide={slide} correctNumberMatches={correctNumberMatches}/>
                    </>
                      : null
                    )}
            </div>


            <button
            id="next-profile"
            className="right"
                onClick={handleRightClick}
                onAnimationEnd={() => setSlide(0)}
                slide={slide}
            >
              <span className="hide-button">??????</span>
            </button>
          </section>

        </>
    )
  }

  let loading;


  loading = (

    <div className="loading">
      <img src={pictures.collection[11].imageUrl} />
    </div>
  )

  if(isLoaded === true && currentUserProfile?.oneProfile?.length === 0) {
              loading = (

              <div className="center-no-matches-component">
              <NoMatches user_id={user_id} />
              </div>
              )
  }

  return (
    <>
    {/* <ChooseDiscoverContent /> */}

    { currentUserProfile?.oneProfile?.length ?

      <section className="DiscoverContentContaine" style={{ backgroundImage: `url('${backgroundContent === 'light' ? lightImage : darkImage}')` }}>
       {discoverContent === 'QuestionMatch'? content : content2}
      </section>
    :
    loading
      }
    </>

  )
}


export default Discover
