
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import MatchProfile from "../MatchProfile";
import { getQuestions } from "../../store/question";

const Discover = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id
  // console.log("user_id", user_id)

  const questionObject = useSelector((state)=>state.question)
  // console.log("questionObj", questionObject)
  const questions = Object.values(questionObject)
  console.log("questions", questions[0])




  useEffect(()=>{
    dispatch(getQuestions())
}, [dispatch, questions.length])

// for each user's question object, we need to count how many answers
// they have that are the same as the current user

 const pointSystem = (user_id)


 let currentUserQuestion = questions[0]?.filter((question) => {return question.user_id === user_id})
 console.log("currentUserQuestion", currentUserQuestion)

 let counter = {};

  questions[0]?.map((question, ele) => {
    console.log(ele, question)
    // console.log("question.question1", question.question1)
    // console.log("currentUserQuestion.question1", currentUserQuestion[0].question1)
    if(!counter[question.user_id]) {
      counter[question.user_id] = 0
    }
    if(question.question1 === currentUserQuestion[0].question1) {
      counter[question.user_id] += 1
    }

  })
  console.log("count", counter)



  // console.log("id----", questions[0])
  // let userQuestion = questions[0]


  return (
    <>
    "in discover component"

    <MatchProfile />

    </>
  )

}


export default Discover
