import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getQuestion } from '../../store/question';
import RadioButton from '../RadioButton';
import '../QuestionForm/QuestionForm.css'
import './QuestionPageAnswers.css'

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
    <div className="questionPageAnswersContainer">
      <section className="question1Container">
      <div className="questionTextBig">1. Which word describes you better?</div>
      <div className="your-answer">Your answer</div>
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

      <div className="answer-page">Answer you'll accept?</div>
      <div className ="question">
        <RadioButton
            label="Carefree"
            value={"Carefree" === questions[0]?.must_answer1}
            onClick={false}
          />
        <RadioButton
          label="Intense"
          value={"Intense" === questions[0]?.must_answer1}
          onClick={false}
        />
      </div>
    </section>

    <div className="fancy"></div>

    <section className="question2Container">
          <div className="questionTextBig">2. Choose the better romantic activity</div>
          <div className="your-answer">Your answer</div>
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

          <div className="answer-page">Answer you'll accept?</div>
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

        <hr className="fancy"></hr>

        <section className="question2Container">
          <div className="questionTextBig">3. If you an entire day, how does that make you feel?</div>
          <div className="your-answer">Your answer</div>
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

          <div className="answer-page">Answer you'll accept?</div>
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


        <hr className="fancy"></hr>


        <section className="question4Container">
          <div className="questionTextBig">4. Do you often find yourself worrying about things that you have no control over?</div>
          <div className="your-answer">Your answer</div>
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

          <div className="answer-page">Answer you'll accept?</div>
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

        <hr className="fancy"></hr>


        <section className="question5Container">
          <div className="questionTextBig">5. Is jealously healthy in a relationship</div>
          <div className="your-answer">Your answer</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.question5}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.question5}
              onClick={false}
            />
          </div>

          <div className="answer-page">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.must_answer5}
                onClick={false}
              />
            <RadioButton
                label="No"
                value={'No' === questions[0]?.must_answer5}
                onClick={false}
            />
          </div>
        </section>


        <hr className="fancy"></hr>


        <section className="question6Container">
          <div className="questionTextBig">6. Would you date someone that vaped/used e-cigs?</div>
          <div className="your-answer">Your answer</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.question6}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.question6}
              onClick={false}
            />
          </div>

          <div className="answer-page">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.must_answer6}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.must_answer6}
              onClick={false}
            />
          </div>
        </section>

        <hr className="fancy"></hr>


        <section className="question7Container">
          <div className="questionTextBig">7. Which would you rather be?</div>
          <div className="your-answer">Your answer</div>
          <div className ="question">
            <RadioButton
                label="Weird"
                value={'Weird' === questions[0]?.question7}
                onClick={false}
              />
            <RadioButton
              label="Normal"
              value={'Normal' === questions[0]?.question7}
              onClick={false}
            />
          </div>

          <div className="answer-page">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Weird"
                value={'Weird' === questions[0]?.must_answer7}
                onClick={false}
              />
            <RadioButton
              label="Normal"
              value={'Normal' === questions[0]?.must_answer7}
              onClick={false}
            />
          </div>
        </section>

        <hr className="fancy"></hr>


        <section className="question8Container">
          <div className="questionTextBig">8. Is astrological sign at all important in a match?</div>
          <div className="your-answer">Your answer</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.question8}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.question8}
              onClick={false}
            />
          </div>

          <div className="answer-page">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.must_answer8}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.must_answer8}
              onClick={false}
            />
          </div>
        </section>

        <hr className="fancy"></hr>


        <section className="question9Container">
          <div className="questionTextBig">9. Do you enjoy discussing politics?</div>
          <div className="your-answer">Your answer</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.question9}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.question9}
              onClick={false}
            />
          </div>

          <div className="answer-page">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.must_answer9}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.must_answer9}
              onClick={false}
            />
          </div>
        </section>

        <hr className="fancy"></hr>


        <section className="question10Container">
          <div className="questionTextBig">10. Do you think it’s important to have an emotional connection before a physical one?</div>
          <div className="your-answer">Your answer</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.question10}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.question10}
              onClick={false}
            />
          </div>

          <div className="answer-page">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={'Yes' === questions[0]?.must_answer10}
                onClick={false}
              />
            <RadioButton
              label="No"
              value={'No' === questions[0]?.must_answer10}
              onClick={false}
            />
          </div>
        </section>

    </div>



   </>
  )
}

export default QuestionPageAnswered
