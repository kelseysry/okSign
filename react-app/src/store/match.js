const LOAD_MATCH_PROFILES = "match/LOAD_MATCH_PROFILES"
const LOAD_MATCH_LAST_MESSAGE = "match/LOAD_MATCH_LAST_MESSAGE"

// action creator to load match matchProfiles matchProfiles
const loadMatchProfiles = (matchProfiles) => ({
  type: LOAD_MATCH_PROFILES,
  matchProfiles
})

// action creator load last message
const loadLastMessage = (message) => ({
  type: LOAD_MATCH_LAST_MESSAGE,
  message
});

// thunk for getting all match matchProfiles
export const getMatchProfiles = (matchUserIds) => async(dispatch) => {
  if (matchUserIds) {
    console.log("thunk matchUserIds id", matchUserIds)
    const res = await fetch(`/api/matches/${matchUserIds}`)
    const matchProfiles = await res.json();
    console.log("matchProfiles res.json()", matchProfiles)
    dispatch(loadMatchProfiles(matchProfiles))
  }
}

// thunk for getting last messages in a conversation with match
export const getLastMessage = (conversation_id) => async(dispatch) => {
  // console.log("conversation_id in thunk", conversation_id)
  const res = await fetch(`/api/matches/${conversation_id}/messages`)
  const message = await res.json();
  // console.log("message res.json()", message)
  dispatch(loadLastMessage(message))
}

// reducer
const initialState = {};
const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATCH_PROFILES:{
      const newState = action.matchProfiles
      console.log("newState in load", newState)
      return newState
  };
  case LOAD_MATCH_LAST_MESSAGE: {
    const newState = {...state};
    newState[action.message?.id] = action.message
    return newState
  };
    default:
      return state;
  }
}

export default matchReducer
