const LOAD_MATCH_PROFILES = "match/LOAD_MATCH_PROFILES"

// action creator to load match matchProfiles matchProfiles
const loadMatchProfiles = (matchProfiles) => ({
  type: LOAD_MATCH_PROFILES,
  matchProfiles
})


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

// reducer
const initialState = {};
const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATCH_PROFILES:{
      const newState = action.matchProfiles
      console.log("newState in load", newState)
      return newState
  }
    default:
      return state;
  }
}

export default matchReducer
