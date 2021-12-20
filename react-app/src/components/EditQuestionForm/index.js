import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { EditQuestion } from '../../store/question';
import RadioButton from '../RadioButton';
import './EditQuestionForm.css'


const EditQuestionForm = ({questions, hideForm}) => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  const [question1, setQuestion1] = useState(questions[0]?.question1);
  const [must_answer1, setMust_answer1] = useState(questions[0]?.must_answer1);
  const [question2, setQuestion2] = useState(questions[0]?.question2);
  const [must_answer2, setMust_answer2] = useState(questions[0]?.must_answer2);
  const [question3, setQuestion3] = useState(questions[0]?.question3);
  const [must_answer3, setMust_answer3] = useState(questions[0]?.must_answer3);
  const [question4, setQuestion4] = useState(questions[0]?.question4);
  const [must_answer4, setMust_answer4] = useState(questions[0]?.must_answer4);
  const [question5, setQuestion5] = useState(questions[0]?.question5);
  const [must_answer5, setMust_answer5] = useState(questions[0]?.must_answer5);
  const [question6, setQuestion6] = useState(questions[0]?.question6);
  const [must_answer6, setMust_answer6] = useState(questions[0]?.must_answer6);
  const [question7, setQuestion7] = useState(questions[0]?.question7);
  const [must_answer7, setMust_answer7] = useState(questions[0]?.must_answer7);
  const [question8, setQuestion8] = useState(questions[0]?.question8);
  const [must_answer8, setMust_answer8] = useState(questions[0]?.must_answer8);
  const [question9, setQuestion9] = useState(questions[0]?.question9);
  const [must_answer9, setMust_answer9] = useState(questions[0]?.must_answer9);
  const [question10, setQuestion10] = useState(questions[0]?.question10);
  const [must_answer10, setMust_answer10] = useState(questions[0]?.must_answer10);


  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const validationErrors = []
    if(!question1) validationErrors.push("please answer question 1")
    if(!question2) validationErrors.push("please answer question 2")
    if(!question3) validationErrors.push("please answer question 3")
    if(!question4) validationErrors.push("please answer question 4")
    if(!question5) validationErrors.push("please answer question 5")
    if(!question6) validationErrors.push("please answer question 6")
    if(!question7) validationErrors.push("please answer question 7")
    if(!question8) validationErrors.push("please answer question 8")
    if(!question9) validationErrors.push("please answer question 9")
    if(!question10) validationErrors.push("please answer question 10")

    setErrors(validationErrors)

  }, [question1, must_answer1, question2, must_answer2, question3, must_answer3, question4, must_answer4, question5, must_answer5,question6, must_answer6, question7, must_answer7,question8, must_answer8, question9, must_answer9, question10,must_answer10, user_id])

  const handleSubmit = async(e) => {
    e.preventDefault();

    const userEditInputQuestions = {
      question1, must_answer1, question2, must_answer2, question3, must_answer3, question4, must_answer4, question5, must_answer5,question6, must_answer6, question7, must_answer7,question8, must_answer8, question9, must_answer9, question10,must_answer10, user_id
    }
    console.log("userEditInputQuestions in QUestionFOrm", userEditInputQuestions)

    let updatedUserAnswers = await dispatch(EditQuestion(userEditInputQuestions, user_id))

    console.log("updatedUserAnswers", updatedUserAnswers)

      if (updatedUserAnswers) {
        hideForm();
      }
  }


const handleCancelFormEditClick = (e) => {
  e.preventDefault();

  hideForm();
};

  return (
    <>
      <form className="questionForm" onSubmit={handleSubmit}>

        <section className="question1Container">
          <div className="questionText">1. Which word describes you better?</div>
          <div className ="question">
            <RadioButton
                label="Carefree"
                value={question1 === 'Carefree'}
                onChange={(e) => setQuestion1("Carefree")}
              />
            <RadioButton
              label="Intense"
              value={question1 === 'Intense'}
              onChange={(e) => setQuestion1("Intense")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Carefree"
                value={must_answer1 === 'Carefree'}
                onChange={(e) => setMust_answer1("Carefree")}
              />
            <RadioButton
              label="Intense"
              value={must_answer1 === 'Intense'}
              onChange={(e) => setMust_answer1("Intense")}
            />
          </div>
        </section>

        <section className="question2Container">
          <div className="questionText">2. Choose the better romantic activity</div>
          <div className ="question">
            <RadioButton
                label="Kissing in Paris"
                value={question2 === 'Kissing in Paris'}
                onChange={(e) => setQuestion2("Kissing in Paris")}
              />
            <RadioButton
              label="Kissing in a tent, in the woods"
              value={question2 === 'Kissing in a tent, in the woods'}
              onChange={(e) => setQuestion2("Kissing in a tent, in the woods")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Kissing in Paris"
                value={must_answer2 === "Kissing in Paris"}
                onChange={(e) => setMust_answer2("Kissing in Paris")}
              />
            <RadioButton
              label="Kissing in a tent, in the woods"
              value={must_answer2 === "Kissing in a tent, in the woods"}
              onChange={(e) => setMust_answer2("Kissing in a tent, in the woods")}
            />
          </div>
        </section>

        <section className="question3Container">
          <div className="questionText">3. If you don't do anything at all for an entire day, how does that make you feel?</div>
          <div className ="question">
            <RadioButton
                label="Good"
                value={question3 === 'Good'}
                onChange={(e) => setQuestion3("Good")}
              />
            <RadioButton
              label="Bad"
              value={question3 === 'Bad'}
              onChange={(e) => setQuestion3("Bad")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Good"
                value={must_answer3 === 'Good'}
                onChange={(e) => setMust_answer3("Good")}
              />
            <RadioButton
              label="Bad"
              value={must_answer3 === 'Bad'}
              onChange={(e) => setMust_answer3("Bad")}
            />
          </div>
        </section>

        <section className="question4Container">
          <div className="questionText">4. Do you often find yourself worrying about things that you have no control over?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={question4 === 'Yes'}
                onChange={(e) => setQuestion4("Yes")}
              />
            <RadioButton
              label="No"
              value={question4 === 'No'}
              onChange={(e) => setQuestion4("No")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={must_answer4 === 'Yes'}
                onChange={(e) => setMust_answer4("Yes")}
              />
            <RadioButton
              label="No"
              value={must_answer4 === 'No'}
              onChange={(e) => setMust_answer4("No")}
            />
          </div>
        </section>

        <section className="question5Container">
          <div className="questionText">5. Is jealously healthy in a relationship</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={question5 === 'Yes'}
                onChange={(e) => setQuestion5("Yes")}
              />
            <RadioButton
              label="No"
              value={question5 === 'No'}
              onChange={(e) => setQuestion5("No")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={must_answer5 === 'Yes'}
                onChange={(e) => setMust_answer5("Yes")}
              />
            <RadioButton
              label="No"
              value={must_answer5 === 'No'}
              onChange={(e) => setMust_answer5("No")}
            />
          </div>
        </section>

        <section className="question6Container">
          <div className="questionText">6. Would you date someone that vaped/used e-cigs?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={question6 === 'Yes'}
                onChange={(e) => setQuestion6("Yes")}
              />
            <RadioButton
              label="No"
              value={question6 === 'No'}
              onChange={(e) => setQuestion6("No")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={must_answer6 === 'Yes'}
                onChange={(e) => setMust_answer6("Yes")}
              />
            <RadioButton
              label="No"
              value={must_answer6 === 'No'}
              onChange={(e) => setMust_answer6("No")}
            />
          </div>
        </section>

        <section className="question7Container">
          <div className="questionText">7. Which would you rather be?</div>
          <div className ="question">
            <RadioButton
                label="Weird"
                value={question7 === 'Weird'}
                onChange={(e) => setQuestion7("Weird")}
              />
            <RadioButton
              label="Normal"
              value={question7 === 'Normal'}
              onChange={(e) => setQuestion7("Normal")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Weird"
                value={must_answer7 === 'Weird'}
                onChange={(e) => setMust_answer7("Weird")}
              />
            <RadioButton
              label="Normal"
              value={must_answer7 === 'Normal'}
              onChange={(e) => setMust_answer7("Normal")}
            />
          </div>
        </section>

        <section className="question8Container">
          <div className="questionText">8. Is astrological sign at all important in a match?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={question8 === 'Yes'}
                onChange={(e) => setQuestion8("Yes")}
              />
            <RadioButton
              label="No"
              value={question8 === 'No'}
              onChange={(e) => setQuestion8("No")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={must_answer8 === 'Yes'}
                onChange={(e) => setMust_answer8("Yes")}
              />
            <RadioButton
              label="No"
              value={must_answer8 === 'No'}
              onChange={(e) => setMust_answer8("No")}
            />
          </div>
        </section>

        <section className="question9Container">
          <div className="questionText">9. Do you enjoy discussing politics?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={question9 === 'Yes'}
                onChange={(e) => setQuestion9("Yes")}
              />
            <RadioButton
              label="No"
              value={question9 === 'No'}
              onChange={(e) => setQuestion9("No")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={must_answer9 === 'Yes'}
                onChange={(e) => setMust_answer9("Yes")}
              />
            <RadioButton
              label="No"
              value={must_answer9 === 'No'}
              onChange={(e) => setMust_answer9("No")}
            />
          </div>
        </section>

        <section className="question10Container">
          <div className="questionText">10. Do you think it’s important to have an emotional connection before a physical one?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={question10 === 'Yes'}
                onChange={(e) => setQuestion10("Yes")}
              />
            <RadioButton
              label="No"
              value={question10 === 'No'}
              onChange={(e) => setQuestion10("No")}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Yes"
                value={must_answer10 === 'Yes'}
                onChange={(e) => setMust_answer10("Yes")}
              />
            <RadioButton
              label="No"
              value={must_answer10 === 'No'}
              onChange={(e) => setMust_answer10("No")}
            />
          </div>
        </section>

        <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <button
          className=""
          type="submit"
          disabled={errors.length>0}
        >
          Submit
        </button>
        <button type="button" onClick={handleCancelFormEditClick}>Cancel</button>
      </form>

    </>

  )


}



export default EditQuestionForm
