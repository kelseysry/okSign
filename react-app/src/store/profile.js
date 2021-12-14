const LOAD_PROFILE = "question/LOAD_PROFILE";
const EDIT_ONE_PROFILE = "profile/EDIT_ONE_PROFILE"

// action creator to load one profile
const loadProfile = (profile) => ({
  type: LOAD_PROFILE,
  profile
})

// action creator to edit profile
export const editOneProfile = (profile, user_id) => ({
  type: EDIT_ONE_PROFILE,
  profile,
  user_id
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

//thunk for editing a profile
export const editProfile= (editProfile,profile_id) => async dispatch => {
  const response = await fetch(`/api/profiles/${profile_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editProfile)
  });
  // console.log("editProfile", editProfile)
  // console.log('response in the thunk editProfile', response)

  const profile = await response.json();
  dispatch(editProfile(profile, profile_id))
  return profile
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
    case EDIT_ONE_PROFILE: {
      if(!state[action.profile]) {
        const newState = {
          ...state, [action.profile.id]: action.profile
        };
        // console.log("this is newState", newState)

        return newState
      }
      return state
    }

    default:
      return state;
  }
}

export default profileReducer
