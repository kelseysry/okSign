const LOAD_MESSAGES = "message/LOAD_MESSAGES";

// action creator load all messages
const loadAllMessages = (messages, conversation_id) => ({
  type: LOAD_MESSAGES,
  messages,
  conversation_id,
});


// thunk for getting all messages in a conversation
export const getMessages = (conversation_id) => async(dispatch) => {
  // console.log("conversation_id in thunk", conversation_id)
  const res = await fetch(`/api/conversations/${conversation_id}/messages`)
  const messages = await res.json();
  // console.log("messages res.json()", messages)
  dispatch(loadAllMessages(messages, conversation_id))
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
    }
    default:
      return state;
  }
}

export default messageReducer
