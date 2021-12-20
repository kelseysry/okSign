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

  const [loaded, setLoaded] = useState(false)


  const [question1, setQuestion1] = useState('');
  const [must_answer1, setMust_answer1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [must_answer2, setMust_answer2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [must_answer3, setMust_answer3] = useState('');
  const [question4, setQuestion4] = useState('');
  const [must_answer4, setMust_answer4] = useState('');
  const [question5, setQuestion5] = useState('');
  const [must_answer5, setMust_answer5] = useState('');
  const [question6, setQuestion6] = useState('');
  const [must_answer6, setMust_answer6] = useState('');
  const [question7, setQuestion7] = useState('');
  const [must_answer7, setMust_answer7] = useState('');
  const [question8, setQuestion8] = useState('');
  const [must_answer8, setMust_answer8] = useState('');
  const [question9, setQuestion9] = useState('');
  const [must_answer9, setMust_answer9] = useState('');
  const [question10, setQuestion10] = useState('');
  const [must_answer10, setMust_answer10] = useState('');

  useEffect(async() => {
   let questionLoaded = await dispatch(getQuestion(user_id))
   if(questionLoaded) {
    setLoaded(true)
   }
  },[dispatch, user_id, loaded])

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
