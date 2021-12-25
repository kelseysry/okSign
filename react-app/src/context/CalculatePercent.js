// get match percent for ALL users in the db

import { getQuestions } from '../store/question';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";


import { createContext, useContext } from "react";

export const PercentContext = createContext();

export function CalculatePercentProvider (props) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id
  const questionObject = useSelector((state)=>state.question)
  // console.log("questionObj", questionObject)
  const questions = Object.values(questionObject)

  useEffect(async ()=>{
    await dispatch(getQuestions())
}, [dispatch, questions.length])

let questionsRender;

if(questions[0]) {
   questionsRender = questions[0]
} else {
    questionsRender = questions[1]
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

  // all the [user.id, matchScore]
  let userIdsPercentsObj = Object.keys(counter).map(function (key) {
      return [Number(key), counter[key]];
  });


  console.log("userIdsPercentsObj", userIdsPercentsObj)

  return (
    <PercentContext.Provider value={{userIdsPercentsObj}}>
      {props.children}
    </PercentContext.Provider>
  )
}

export function GetMatchPercent() {
  return useContext(PercentContext);
}
