import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { createMessage } from "../../store/message";

function MessageForm({conversationId}) {
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state?.session?.user)
  const from_user_id = sessionUser?.id

  const [content, setContent] = useState('')
  const [errors, setErrors] = useState([]);

  let conversation_id = +conversationId


  useEffect(() => {
    const validationErrors = []
    if(!content) validationErrors.push("do you want to get ghosted?🤨")

    setErrors(validationErrors)

  }, [conversation_id, content, from_user_id])



  const handleSubmit = async(e) => {
    e.preventDefault();

    const newMessage = {
      conversation_id, content, from_user_id
    }

    console.log("newMessage in messageform", newMessage)


    // need to grab message id by dispatch getmessage thunk so can pass in message.id in line 38

    let updated = await dispatch(createMessage(newMessage, conversation_id))
    if(updated) {
      setContent('')
    }

  }

  const handleCancelMessageForm = (e) => {
    e.preventDefault();


  };


  return (
    <>
      <section className="edit-message-form-container">
        <form className="edit-message-form" onSubmit={handleSubmit}>
          <label>
                <textarea
                type="text"
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                >
                </textarea>
            </label>
            <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <button
          className="mobile-submit-create-business"
          type="submit"
          disabled={errors.length>0}
        >
          Submit
        </button>
            <button type="button" onClick={handleCancelMessageForm}>Cancel</button>
        </form>
      </section>

    </>
  )
}

export default MessageForm;
