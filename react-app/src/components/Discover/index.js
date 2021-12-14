
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import MatchProfile from "../MatchProfile";
import { getQuestions } from "../../store/question";

const Discover = () => {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id
  // console.log("user_id", user_id)

  const questionObject = useSelector((state)=>state?.question)
  // console.log("questionObj", questionObject)
  const questions = Object?.values(questionObject)
  console.log("questions", questions)




  useEffect(()=>{
    dispatch(getQuestions())
}, [dispatch, questions?.length])



  // questions.map((question) => {
  //   console.log("hi", question)
  // })
  console.log("id----", questions[0])
  let userQuestion = questions[0]
  // console.log("userQuestion[0]", userQuestion[0])


  return (
    <>
    "in discover component"

    <MatchProfile />

    </>
  )

}


export default Discover
