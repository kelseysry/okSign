const LOAD_MATCH_PROFILES = "match/LOAD_MATCH_PROFILES"

// action creator to load match matchProfiles matchProfiles
const loadMatchProfile = (matchProfiles) => ({
  type: LOAD_MATCH_PROFILES,
  matchProfiles
})


// thunk for getting all match matchProfiles
export const getMatchProfile = (matchUserIds) => async(dispatch) => {
  if (matchUserIds) {
    console.log("thunk matchUserIds id", matchUserIds)
    const res = await fetch(`/api/matches/${matchUserIds}`)
    const matchProfiles = await res.json();
    console.log("matchProfiles res.json()", matchProfiles)
    dispatch(loadMatchProfile(matchProfiles))

  }
}

// reducer
const initialState = {};
const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MATCH_PROFILES: {
      const newState = {...state};
      newState[action.matchProfiles?.id] = action.matchProfiles
      // console.log("this is newState in Load", newState)
      return newState
    }
    default:
      return state;
  }
}

export default matchReducer
