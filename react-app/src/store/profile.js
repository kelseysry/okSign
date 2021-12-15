const LOAD_PROFILE = "question/LOAD_PROFILE";
const EDIT_ONE_PROFILE = "profile/EDIT_ONE_PROFILE"
const LOAD_PROFILES = "question/LOAD_PROFILES";

// action creator to load one profile
const loadProfile = (profile) => ({
  type: LOAD_PROFILE,
  profile
})

// action creator to edit profile
export const editOneProfile = (profile, id) => ({
  type: EDIT_ONE_PROFILE,
  profile,
  id
})

// action creator to load all profiles
const loadAllProfiles = (profiles) => ({
  type: LOAD_PROFILES,
  profiles,
});



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
export const editProfile= (editProfile, id) => async dispatch => {
  const response = await fetch(`/api/profiles/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editProfile)
  });
  console.log("editProfile", editProfile)
  console.log('response in the thunk editProfile', response)

  const profile = await response.json();
  console.log("profile in thunk", profile)
  dispatch(editOneProfile(profile, id))
  return profile
}


// thunk for getting all profiles
export const getProfiles = () => async(dispatch) => {

    const res = await fetch(`/api/profiles`)
    const profiles = await res.json();
    // console.log("profiles res.json()", profiles)
    dispatch(loadAllProfiles(profiles))
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
      console.log("action.profile", action.profile)
      if(!state[action.profile]) {
        const newState = {
          ...state, [action.profile.id]: action.profile
        };
        console.log("this is newState", newState)

        return newState
      }
      return state
    }
    case LOAD_PROFILES: {
      const newState = {...state};
      // console.log("reducer profiles", action.profiles)
      for (const[key,value] of Object.entries(action.profiles)) {
        newState[key] = value
      }
      return newState
    }

    default:
      return state;
  }
}

export default profileReducer
