const LOAD_MESSAGES = "message/LOAD_MESSAGES";
const EDIT_MESSAGE= "message/EDIT_MESSAGE"
const CLEAR = 'message/CLEAR'


// action creator load all messages
const loadAllMessages = (messages, conversation_id) => ({
  type: LOAD_MESSAGES,
  messages,
  conversation_id,
});

// action creator to edit one message
export const editOneMessage = (message, messageId) => ({
  type: EDIT_MESSAGE,
  message,
  messageId
})

export const clearMessages = () => ({
  type: CLEAR
})


// thunk for getting all messages in a conversation
export const getMessages = (conversation_id) => async(dispatch) => {
  // console.log("conversation_id in thunk", conversation_id)
  const res = await fetch(`/api/conversations/${conversation_id}/messages`)
  const messages = await res.json();
  // console.log("messages res.json()", messages)
  dispatch(loadAllMessages(messages, conversation_id))
}

//thunk for editing a message
export const EditMessage = (editedMessage,conversation_id, id) => async dispatch => {
  const response = await fetch(`/api/conversations/${conversation_id}/messages/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editedMessage)
  });
  // console.log("editedMessage", editedMessage)

  const message = await response.json();
  dispatch(editOneMessage(message, id))
  return message
}



// reducer
const initialState = {};
const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MESSAGES: {
      const newState = {...state};
      console.log("reducer message", action.messages)
      for (const[key,value] of Object.entries(action.messages)) {
        newState[key] = value
      }
      console.log("newState LOAD_MESSAGES", newState)
      return newState
    };
    case EDIT_MESSAGE: {
      if(!state[action.message]) {
        const newState = {
          ...state, [action.message.id]: action.message
        };
        // console.log("this is newState", newState)

        return newState
      }
      return state
    };
    case CLEAR:{
      state = {}
      return state
  };
    default:
      return state;
  }
}

export default messageReducer
