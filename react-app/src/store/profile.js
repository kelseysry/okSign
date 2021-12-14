const LOAD_PROFILE = "question/LOAD_PROFILE";


// action creator to load one profile
const loadProfile = (profile) => ({
  type: LOAD_PROFILE,
  profile
})



// thunk for getting one profile
export const getProfile = (profile_id) => async(dispatch) => {
  if (profile_id) {
    // console.log("thunk profile id", profile_id)
    const res = await fetch(`/api/profiles/${profile_id}`)
    const profile = await res.json();
    console.log("profile res.json()", profile)
    dispatch(loadProfile(profile))

  }
}


// reducer
const initialState = {};
const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_PROFILE: {
      const newState = {...state};
      newState[action.profile?.id] = action.profile
      // console.log("this is newState in Load", newState)
      return newState
    }
    default:
      return state;
  }
}

export default profileReducer
