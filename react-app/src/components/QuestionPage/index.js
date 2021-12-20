import React, { useState, useEffect } from 'react';
import EditQuestionForm from '../EditQuestionForm';
import QuestionPageAnswered from '../QuestionPageAnswered';
import { clearQuestions, getQuestion } from '../../store/question';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import './QuestionPage.css'

function QuestionPage() {
  const dispatch = useDispatch()

  const [showEditQuestion, setShowEditQuestionForm] = useState(false)

  const sessionUser = useSelector((state) => state?.session);
  const user_id = sessionUser?.user.id

  const questionObject = useSelector((state)=>state.question)
  const questions = Object.values(questionObject)

  console.log("question edited again", questions)


  useEffect(() => {
    setShowEditQuestionForm(false)
  },[dispatch])

  useEffect(() => {
    dispatch(clearQuestions())
    dispatch(getQuestion(user_id))

   },[dispatch, user_id])


let content = null;
if(showEditQuestion) {
  content = (
    <EditQuestionForm questions={questions} hideForm={() => setShowEditQuestionForm(false)}/>
  )
} else if (questions){
  content = (
    <>
      <div className="questionAnswered">
        <div className="questionsHeader">Your Answers</div>
        <button className="edit-question-form" onClick={() => setShowEditQuestionForm(true)}>Edit Answers <i className="fas fa-edit"></i></button>

      </div>
      <div className="">
        <QuestionPageAnswered />
      </div>
    </>
  )
} else {
  return null
}


let content_edit_compiled;
content_edit_compiled = (
  <>
    {/* <button className="edit-profile-button" onClick={() => setShowEditQuestionForm(true)}>Edit Answers <i className="fas fa-edit"></i></button> */}
    {content}
  </>
)

// console.log("questions🤠😯🤠😯🤠😯", questions)

return (
  <>

     {   questions.length? content_edit_compiled :
       <div>
          <NavLink to={`/answerQuestions`}><div className=""></div>Answer Questions <i className="fas fa-address-card"></i></NavLink>
      </div>

     }

  </>
);


}

export default QuestionPage
