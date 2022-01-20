// get match percent for all users -> purpose is so we can get question match percentages for matches based on horoscope.
// So a user who isn't supposed to match b/c < 60% question match, can still match with horoscope and see their question match percentage on match profile

import { useSelector } from "react-redux";
import React, { useEffect, useState } from 'react';

import { createContext, useContext } from "react";

export const MatchesContext = createContext();

export function MatchesProvider (props) {
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/questions/');
      const responseData = await response.json();
      setQuestions(responseData.questions);
    }
    fetchData();
  }, []);

  let questionsRender = questions


let currentUserQuestion = questionsRender?.filter((question) => {return question?.user_id === user_id})

// for each user's question object, we need to count how many answers
// they have that are the same as the current user

 let counter = {};

 questionsRender?.map((question, ele) => {

    if(!counter[question.user_id]) {
      counter[question.user_id] = 1
    }

    if(question.question1 === currentUserQuestion[0]?.must_answer1) {
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
  // console.log("count", counter)
  // counter = {1: 10, 2: 6, 3: 3, 4: 10}

  // take out current user from potential match in counter
  Object.keys(counter).forEach(key => {
    if (+key === +user_id) delete counter[key];
  });
  // console.log("updated counter", counter)
  // {2: 6, 3: 3, 4: 10}

  // profiles are being selected via id user_id directly correlates to profile.id
  let matchedProfileIds = Object.keys(counter)

  let userIdsPercentsArr = Object.keys(counter).map(function (key) {
    return [Number(key), counter[key]];
});

  return (
    <MatchesContext.Provider value={{userIdsPercentsArr}}>
      {props.children}
    </MatchesContext.Provider>
  )
}

export function GetMatches() {
  return useContext(MatchesContext);
}
