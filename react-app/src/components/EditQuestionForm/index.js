import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import RadioButton from '../RadioButton';
import './EditQuestionForm.css'

const EditQuestionForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  // const [question1, setQuestion1] = useState('');
  // const [must_answer1, setMust_answer1] = useState('');
  // const [question2, setQuestion2] = useState('');
  // const [must_answer2, setMust_answer2] = useState('');
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

// question 1
  const [question1, setQuestion1] = useState('');
  const handleQuestion1ChangeA1 = (e) => {
    setQuestion1("Carefree");
  };
  const handleQuestion1ChangeA2 = (e) => {
    setQuestion1("Intense");
  };

  const [must_answer1, setMust_answer1] = useState('');
  const handleQuestion1ChangeA1Must = (e) => {
    setMust_answer1("Carefree");
  };
  const handleQuestion1ChangeA2Must = (e) => {
    setMust_answer1("Intense");
  };

// question 2
  const [question2, setQuestion2] = useState('');
  const handleQuestion2ChangeA1 = (e) => {
    setQuestion1("Kissing in Paris");
  };
  const handleQuestion2ChangeA2 = (e) => {
    setQuestion1("Kissing in a tent, in the woods'");
  };

  const [must_answer2, setMust_answer2] = useState('');
  const handleQuestion2ChangeA1Must = (e) => {
    setMust_answer2("Carefree");
  };
  const handleQuestion2ChangeA2Must = (e) => {
    setMust_answer2("Intense");
  };


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

  }, [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, user_id])

  const handleSubmit = async(e) => {
    e.preventDefault();



    const userInputUpdateQUestions = {
      question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, user_id
    }

    // let updated = await dispatch(editProfile(userInputUpdateQUestions, user_id))

      // if (updated) {
      //   // hideForm();
      // }
  }


  const handelCancelEditQuestionForm = (e) => {
    e.preventDefault();


    // hideForm();
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
                onChange={handleQuestion1ChangeA1}
              />
            <RadioButton
              label="Intense"
              value={question1 === 'Intense'}
              onChange={handleQuestion1ChangeA2}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Carefree"
                value={must_answer1 === 'Carefree'}
                onChange={handleQuestion1ChangeA1Must}
              />
            <RadioButton
              label="Intense"
              value={must_answer1 === 'Intense'}
              onChange={handleQuestion1ChangeA2Must}
            />
          </div>
        </section>

        <section className="question2Container">
          <div className="questionText">2. Choose the better romantic activity</div>
          <div className ="question">
            <RadioButton
                label="Kissing in Paris"
                value={question2 === 'Kissing in Paris'}
                onChange={handleQuestion2ChangeA1}
              />
            <RadioButton
              label="Kissing in a tent, in the woods"
              value={question2 === 'Kissing in a tent, in the woods'}
              onChange={handleQuestion2ChangeA2}
            />
          </div>

          <div className="answer">Answer you'll accept?</div>
          <div className ="question">
            <RadioButton
                label="Kissing in Paris"
                value={must_answer2 === 'Kissing in Paris'}
                onChange={handleQuestion2ChangeA1Must}
              />
            <RadioButton
              label="Kissing in a tent, in the woods"
              value={must_answer2 === 'Kissing in a tent, in the woods'}
              onChange={handleQuestion2ChangeA2Must}
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
        <button type="button" onClick={handelCancelEditQuestionForm}>Cancel</button>
      </form>



    </>

  )

}

export default EditQuestionForm
