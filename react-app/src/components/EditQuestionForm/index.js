import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import RadioButton from '../RadioButton';


const EditQuestionForm = () => {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state?.session?.user)
  const user_id = sessionUser?.id

  // const [question1, setQuestion1] = useState('');
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


  const [question1, setQuestion1] = useState('');
  const handleQuestion1ChangeA1 = (e) => {
    setQuestion1("Carefree");
  };
  const handleQuestion1ChangeA2 = (e) => {
    setQuestion1("Intense");
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
      <form onSubmit={handleSubmit}>

        <section className="question1Container">
          <div className="question1text">Which word describes you better?</div>
          <div className ="question1">
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
