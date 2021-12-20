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
    <div className="questionForm">
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

    <section className="question2Container">
          <div className="questionText">2. Choose the better romantic activity</div>
          <div className ="question">
            <RadioButton
                label="Kissing in Paris"
                value={'Kissing in Paris' === questions[0]?.question2}
                onClick={false}
              />
            <RadioButton
              label="Kissing in a tent, in the woods"
              value={'Kissing in a tent, in the woods' === questions[0]?.question2}
              onClick={false}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Kissing in Paris"
                value={"Kissing in Paris" === questions[0]?.must_answer2}
                onClick={false}
              />
            <RadioButton
              label="Kissing in a tent, in the woods"
              value={"Kissing in a tent, in the woods" === questions[0]?.must_answer2}
              onClick={false}
            />
          </div>
        </section>


        <section className="question3Container">
          <div className="questionText">3. If you don't do anything at all for an entire day, how does that make you feel?</div>
          <div className ="question">
            <RadioButton
                label="Good"
                value={'Good' === questions[0]?.question3}
                onClick={false}
              />
            <RadioButton
              label="Bad"
              value={'Bad' === questions[0]?.question3}
              onClick={false}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Good"
                value={'Good' === questions[0]?.must_answer3}
                onClick={false}
              />
            <RadioButton
              label="Bad"
              value={'Bad' === questions[0]?.must_answer3}
              onClick={false}
            />
          </div>
        </section>

        <section className="question4Container">
          <div className="questionText">4. Do you often find yourself worrying about things that you have no control over?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.question4}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.question4}
              onClick={false}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.must_answer4}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.must_answer4}
              onClick={false}
            />
          </div>
        </section>


    </div>



   </>
  )
}

export default QuestionPageAnswered
