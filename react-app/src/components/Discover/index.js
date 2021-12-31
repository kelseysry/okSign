
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";
import MatchProfile from "../MatchProfile";
import { getQuestions } from "../../store/question";
import NoMatches from "../NoMatches";
import './Discover.css'
import ChooseDiscoverContent from "./ChooseDiscoverContent";
import DiscoverHoroscope from "../DiscoverHoroscope/DiscoverHoroscopePage";
import { useDiscoverContent } from "../../context/DiscoverContentContext";
import { useBackgroundContent } from "../../context/BackgroundContext";
import pictures from "../../data/pictures";
import './DiscoverSlide.css'

const darkImage = pictures.collection[4].imageUrl
const lightImage = pictures.collection[5].imageUrl

const Discover = () => {
  const dispatch = useDispatch()

  const {discoverContent} = useDiscoverContent()

  const {backgroundContent} = useBackgroundContent()

  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id
  // console.log("user_id", user_id)

  const questionObject = useSelector((state)=>state.question)
  // console.log("questionObj", questionObject)
  const questions = Object.values(questionObject)
  console.log("questions🤠🤠🤠🤠🤠🤠🤠🤠🤠🤠-------------", questions)



  useEffect(async ()=>{
    await dispatch(getQuestions())
}, [dispatch, questions.length])


let questionsRender;

console.log("questions--------", questions)

if(questions.length) {
   questionsRender = questions[0]
} else {
    questionsRender = null;
}
console.log("questionsRender😯😯😯", questionsRender)


// for each user's question object, we need to count how many answers
// they have that are the same as the current user
 let currentUserQuestion = questionsRender?.filter((question) => {return question?.user_id === user_id})
//  console.log("currentUserQuestion🎃🎃🎃", currentUserQuestion)

 let counter = {};

if(currentUserQuestion) {

 questionsRender?.map((question, ele) => {
    // console.log(ele, question)
    // console.log("question.question1", question.question1)
    // console.log("currentUserQuestion.question1", currentUserQuestion[0].question1)
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


  const handleLeftClick = (e) => {
    e.preventDefault();
    const left = document.querySelector('#discoverProfile');
    left.scrollLeft -= 500;
  }

  const handleRightClick = (e) => {
    e.preventDefault();
    const right = document.querySelector('#discoverProfile');
     right.scrollLeft += 500;
  }


  let content2;
  content2 = (
    <DiscoverHoroscope />
  )

  let content;
  if (currentUserQuestion?.length) {
    content = (
        <>
          <button
              className="left"
              onClick={handleLeftClick}
              >
               ⬅️
          </button>

            <div className="discover-profiles-container" id="discoverProfile">
                {userIdsPercentsObj?.map((userIdPercentObj, idx) =>
                    <div  className="one-discover-profile" key={idx}>
                      <NavLink
                        to={`/matchProfile/${userIdPercentObj[0]}`} // userIdPercentObj[0] is the user.id
                        >
                        <MatchProfile userIdPercentObj={userIdPercentObj}/>
                      </NavLink>
                    </div>
                  )}
             </div>

            <button
            className="right"
                onClick={handleRightClick}
            >
            ➡️
            </button>
        </>
    )
  }     else {
    content = (
      <div className="center-no-matches-component">
        <NoMatches user_id={user_id} />
      </div>
    )
  }


  return (

    <>
    <div className="DiscoverHeaderContainerWQHButtons">
      <div className="DiscoverHeader-Container">
        <div className="DiscoverHeaderText">Discover</div>
        <div>find potential matches via questions or horoscopes</div>
      </div>
      <div className="match-buttons-text-container">
        <div>
        <ChooseDiscoverContent />
        </div>
      </div>
    </div>

    <section className="DiscoverContentContainer" style={{ backgroundImage: `url('${backgroundContent === 'light' ? lightImage : darkImage}')` }}>

       {discoverContent === 'QuestionMatch'? content : content2}

    </section>


    </>

  )

}


export default Discover
