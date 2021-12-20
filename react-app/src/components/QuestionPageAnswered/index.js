import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getQuestion } from '../../store/question';
import RadioButton from '../RadioButton';

function QuestionPageAnswered() {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id

  const questionObject = useSelector((state)=>state.question)
  const questions = Object.values(questionObject)


  useEffect(() => {
   dispatch(getQuestion(user_id))

  },[dispatch, user_id])

  // console.log("user_id", user_id)
  console.log("questions", questions[0]?.id)



  return (

   <>

    <section className="question1Container">
    <div className="questionText">1. Which word describes you better?</div>
    <div className ="question">
      <RadioButton
          label="Carefree"
          value={"Carefree" === questions[0]?.question1}
          onClick={false}
        />
      <RadioButton
        label="Intense"
        value={"Intense" === questions[0]?.question1}
        onClick={false}
      />
    </div>

    <div className="answer">Answer you'll accept?</div>
    <div className ="question">
      <RadioButton
          label="Carefree"
          value={"Carefree" === questions[0]?.must_answer1}
          onClick={false}
        />
      <RadioButton
        label="Intense"
        value={"Intense" === questions[0]?.question1}
        onClick={false}
      />
    </div>
  </section>



   </>
  )
}

export default QuestionPageAnswered
