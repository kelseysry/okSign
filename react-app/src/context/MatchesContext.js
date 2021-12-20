
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from 'react';
// import MatchProfile from "../MatchProfile";

// import { getQuestions } from "../../store/question";
import { clearQuestions, getQuestions } from "../store/question";
import { createContext, useContext } from "react";

export const MatchesContext = createContext();

export function MatchesProvider (props) {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id
  // console.log("user_id", user_id)

  const questionObject = useSelector((state)=>state.question)
  // console.log("questionObj", questionObject)
  const questions = Object.values(questionObject)
  // console.log("questions", questions[0])


  useEffect(async ()=>{
    // await dispatch(clearQuestions())
    await dispatch(getQuestions())
}, [dispatch, questions.length])

// for each user's question object, we need to count how many answers
// they have that are the same as the current user
 let currentUserQuestion = questions[0]?.filter((question) => {return question.user_id === user_id})
//  console.log("currentUserQuestion", currentUserQuestion)

 let counter = {};

  questions[0]?.map((question, ele) => {
    // console.log(ele, question)
    // console.log("question.question1", question.question1)
    // console.log("currentUserQuestion.question1", currentUserQuestion[0].question1)
    if(!counter[question.user_id]) {
      counter[question.user_id] = 1
    }

    if(question.question1 === currentUserQuestion[0].must_answer1) {
      counter[question.user_id] += 1
    }

    if(question.question2 === currentUserQuestion[0].must_answer2) {
      counter[question.user_id] += 1
    }

    if(question.question3 === currentUserQuestion[0].must_answer3) {
      counter[question.user_id] += 1
    }

    if(question.question4 === currentUserQuestion[0].must_answer4) {
      counter[question.user_id] += 1
    }

    if(question.question5 === currentUserQuestion[0].must_answer5) {
      counter[question.user_id] += 1
    }

    if(question.question6 === currentUserQuestion[0].must_answer6) {
      counter[question.user_id] += 1
    }

    if(question.question7 === currentUserQuestion[0].must_answer7) {
      counter[question.user_id] += 1
    }

    if(question.question8 === currentUserQuestion[0].must_answer8) {
      counter[question.user_id] += 1
    }

    if(question.question9 === currentUserQuestion[0].must_answer9) {
      counter[question.user_id] += 1
    }

    if(question.question10 === currentUserQuestion[0].must_answer10) {
      counter[question.user_id] += 1
    }

    return counter
  })
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

  // profiles are being selected via id user_id directly correlates to profile.id
  let matchedProfileIds = Object.keys(counter)



  return (
    <MatchesContext.Provider value={{matchedProfileIds}}>
      {props.children}
    </MatchesContext.Provider>
  )
}

export function GetMatches() {
  return useContext(MatchesContext);
}
