import { EditMessage } from "../../store/message";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';




const EditMessageForm = () => {
  const dispatch = useDispatch();
  const { conversationId }  = useParams();

  const sessionUser = useSelector((state) => state?.session?.user)
  const from_user_id = sessionUser?.id // can only edit messages that YOU wrote (current user)
  const conversation_id = +conversationId
  // const [age, setAge] = useState(currentProfile[0]?.age);


  useEffect(() => {
    const validationErrors = []
    if(!content) validationErrors.push("do you want to get ghosted?🤨")

    setErrors(validationErrors)

  }, [conversation_id, content, from_user_id])


  const handleSubmit = async(e) => {
    e.preventDefault();

    const userEditMessage = {
      conversation_id, content, from_user_id
    }


    // need to grab message id by dispatch getmessage thunk so can pass in message.id in line 38 

    let updated = await dispatch(EditMessage(userInputUpdateProfile, conversation_id, id))
      if (updated) {
        hideForm();
      }
  }

  return (
    <>
      <section className="edit-message-form-container">
        <form className="edit-message-form" onSubmit={handleSubmit}>
          <label>
                <input
                type="text"
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                >
                </input>
            </label>
        </form>
      </section>

    </>
  )


}

export default EditMessageForm
