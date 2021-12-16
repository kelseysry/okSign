const LOAD_CONVERSATIONS = "conversation/LOAD_CONVERSATIONS";



// action creator to load all conversations
const loadAllConversations = (conversations) => ({
  type: LOAD_CONVERSATIONS,
  conversations,
});


// thunk for getting all conversations
export const getConversations = () => async(dispatch) => {

  const res = await fetch(`/api/conversations/`)
  const conversations = await res.json();
  // console.log("conversations res.json()", conversations)
  dispatch(loadAllConversations(conversations))
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
    }


    default:
      return state;
  }
}

export default conversationReducer
