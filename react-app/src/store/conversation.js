const LOAD_CONVERSATIONS = "conversation/LOAD_CONVERSATIONS";
const ADD_ONE = "conversation/ADD_ONE"



// action creator to load all conversations
const loadAllConversations = (conversations) => ({
  type: LOAD_CONVERSATIONS,
  conversations,
});

// action creator to create one conversation
const addOneConversation = (newConversation) => ({
  type: ADD_ONE,
  newConversation
})



// thunk for getting all conversations
export const getConversations = () => async(dispatch) => {

  const res = await fetch(`/api/conversations/`)
  const conversations = await res.json();
  // console.log("conversations res.json()", conversations)
  dispatch(loadAllConversations(conversations))
}

// thunk for creating a conversation
export const createConversation = (formData) => async (dispatch) => {

  console.log("formdata in thunk",formData)


  const response = await fetch(`/api/conversations/`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      formData
    )
  });
  try {
    // console.log("response from thunk". response)
    const newConversation = await response.json();
    dispatch(addOneConversation(newConversation))
    console.log("newConversation in thunk-------", newConversation)
    return newConversation
  } catch(error) {
    // console.log(error)
  }
}


// reducer
const initialState = {};
const conversationReducer = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_CONVERSATIONS: {
      const newState = {...state};
      // console.log("reducer conversations", action.conversations)
      for (const[key,value] of Object.entries(action.conversations)) {
        newState[key] = value
      }
      return newState
    };
    case ADD_ONE : {
      // console.log("add_one case", action.newConversation)
      if(!state[action.newConversation.id]) {
        const newState = {
          ...state,  [action.newConversation.conversation.id]: action.newConversation.conversation
        }
        console.log("newState in conversationReducer add_", newState)
        console.log("action.newConversation", action.newConversation)
        return newState
      }
      // return state
    }


    default:
      return state;
  }
}

export default conversationReducer
