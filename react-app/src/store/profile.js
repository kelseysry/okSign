const LOAD_PROFILE = "profile/LOAD_PROFILE";
const EDIT_ONE_PROFILE = "profile/EDIT_ONE_PROFILE"
const LOAD_PROFILES = "profile/LOAD_PROFILES";
const ADD_ONE = "profile/ADD_ONE"
const REMOVE_PROFILE = "profile/REMOVE_PROFILE"
const CLEAR = 'profile/CLEAR'

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

// action creator to create one profile
const addOneProfile = (newProfile) => ({
  type: ADD_ONE,
  newProfile
})

// action creator to delete one profile
const removeOneProfile = (id) => ({
  type: REMOVE_PROFILE,
  id
})


export const clearProfiles = () => ({
  type: CLEAR
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

    const res = await fetch(`/api/profiles/`)
    const profiles = await res.json();
    // console.log("profiles res.json()", profiles)
    dispatch(loadAllProfiles(profiles))
}

// thunk for creating a profile
export const createProfile = (formData) => async (dispatch) => {

  console.log("formdata in thunk",formData)

  const response = await fetch(`/api/profiles/create`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      formData
    )
  });
  try {
    console.log("response from thunk". response)
    const newProfile = await response.json();
    dispatch(addOneProfile(newProfile))
    console.log("newProfile in thunk", newProfile)
    return newProfile
  } catch(error) {
    console.log(error)
  }
}

// thunk to delete a profile
export const deleteProfile = (id) => async dispatch => {
  const response = await fetch(`/api/profiles/${id}`, {
    method: 'DELETE',
  });
  // const res = await response.json()
  // console.log("delete profile thunk", res)
  console.log("delete profile thunk", response)
  if(response.ok) {
    dispatch(removeOneProfile(id))
    console.log("remove responese after ok", response)
  }
};



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
          ...state,
          // [action.profile.id]: action.profile
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
    case ADD_ONE : {
      // console.log("add_one case", action.newProfile)
      if(!state[action.newProfile.id]) {
        const newState = {
          ...state,
          // [action.newProfile.profile.id]: action.newProfile.profile
          // because youre sending a key value pair back from the backend, return {"profile":profile.to_dict()}  when you dispatch that action.newProfile is that key value pair.  needing to be dotted into one further
        }
        console.log("newState in profileReducer add_", newState)
        console.log("action.newProfile", action.newProfile)
        return newState
      }
      // return state
    }
    case REMOVE_PROFILE : {
      const newState = {...state};
      delete newState[action.id];
      return newState
    };
    case CLEAR:{
      state = {}
      return state
  }
    default:
      return state;
  }
}

export default profileReducer
