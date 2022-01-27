const TOGGLE_LIKE = 'like/toggleLike';
const EDIT_LIKE = "like/EDIT_LIKE"
const GET_PROFILE_USER_LIKED = "like/GET_PROFILE_USER_LIKED"

export const toggleLike = (newLike) => ({
  type: TOGGLE_LIKE,
  newLike,
});

// action creator to edit one like
export const editOneLike = (like, id) => ({
  type: EDIT_LIKE,
  like,
  id
})

// action creator to load one profileUserLiked
const loadProfileUserLiked = (profileUserLiked) => ({
  type: GET_PROFILE_USER_LIKED,
  profileUserLiked
})

// thunk for getting one profile
export const getProfileUserLiked = (user_id, match_profile_id) => async(dispatch) => {
  if (user_id) {
    const res = await fetch(`/api/likes/user/${user_id}/matchProfile/${match_profile_id}`)
    const profile = await res.json();
    console.log("profile res.json()", profile)
    dispatch(loadProfileUserLiked(profile))

  }
}




//thunk for editing a like
export const EditLike = (editMatchLike, user_id, match_profile_id) => async dispatch => {
  const response = await fetch(`/api/likes/user/${user_id}/matchProfile/${match_profile_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editMatchLike)
  });
  console.log("editMatchLike", editMatchLike)

  const editedMatchLike = await response.json();
  dispatch(editOneLike(editedMatchLike, match_profile_id))
  console.log("🤡 🤡 🤡 🤡 editedMatchLike", editedMatchLike)
  // dispatch(toggleLike(editedMatchLike))
  return editedMatchLike
}




// thunk for creating a like
export const createLike = (formData) => async (dispatch) => {

  console.log("formdata in thunk createLike",formData)

  const response = await fetch(`/api/likes/create`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      formData
    )
  });
  try {
    const newLike = await response.json();
    console.log("newLike in thunk", newLike)
    return newLike
  } catch(error) {
    // console.log(error)
  }
}


const initialState = {};
export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_LIKE: {
        // console.log("add_one case", action.newLike)
        if(!state[action.newLike.id]) {
          const newState = {
            ...state,

          }
          console.log("newState in  add_", newState)
          // console.log("action.newLike", action.newLike)
          return newState
        }
        // return state
      };
    // case TOGGLE_LIKE: {
    //   const newState = {
    //     ...state,
    //     [action.id]: {
    //       ...state[action.id],
    //       liked: !state[action.id].liked,
    //     },
    //   };
    //   console.log("newState in toggle", newState)
    // return newState
    // }
      case EDIT_LIKE: {
        if(!state[action.like]) {
          const newState = {
            ...state, [action.like.id]: action.like
          };
          console.log("🤡🤡🤡🤡🤡this is EDIT_LIKE action.like.id", action.like.id)

          return newState
        }
        return state
      };
      case GET_PROFILE_USER_LIKED: {
        const newState = {...state};
        newState[action.profileUserLiked?.id] = action.profileUserLiked
        // console.log("this is newState in Load", newState)
        return newState
      };
    default:
      return state;
  }
}
