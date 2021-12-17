


// no longer using this. Creating conversations straight from dispatch createConversation 



// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';
// import { createConversation } from '../../store/conversation';
// import { useHistory } from 'react-router';

// function ConversationForm({createConversationButton, user_id_two}) {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const sessionUser = useSelector((state) => state?.session?.user)
//   const user_id_one = sessionUser?.id


  // const [errors, setErrors] = useState([]);

  // useEffect(() => {
  //   const validationErrors = []
  //   if(!content) validationErrors.push("do you want to get ghosted?🤨")

  //   setErrors(validationErrors)

  // }, [conversation_id, content, from_user_id])



  // console.log("createConversationButton in convo form", createConversationButton)


  // const handleSubmit = async(e) => {
  //   // e.preventDefault();

  //   const newConversation = {
  //     user_id_one, user_id_two
  //   }

  //   console.log("newConversation in ConversationForm", newConversation)

  //   let createdConversation = await dispatch(createConversation(newConversation))

  //   if(createdConversation) {
  //     history.push(`/conversations`)
  //   }

  // }


  // if(createConversationButton) {
  //   handleSubmit()
  // }


  //   if(createConversationButton) {
  //   const newConversation = {
  //     user_id_one, user_id_two
  //   }
  //   dispatch(createConversation(newConversation))
  //   history.push(`/conversations`)
  // }


  // const handleCancelConversationForm = (e) => {
  //   e.preventDefault();


  // };


  // return (
  //   <>
  //   null
      {/* <section className="edit-message-form-container">
        <form className="edit-message-form"> */}
          {/* <label>
                <input
                type="text"
                placeholder="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                >
                </input>
            </label> */}
            {/* <ul className="error">
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <button
          className="mobile-submit-create-business"
          type="submit"
          disabled={errors.length>0}
        > */}
          {/* Submit
        </button> */}
            {/* <button type="button" onClick={handleCancelConversationForm}>Cancel</button> */}
        {/* </form>
      </section> */}

    {/* </>
  )
}

export default ConversationForm; */}
