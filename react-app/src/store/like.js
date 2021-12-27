const TOGGLE_LIKE = 'like/toggleLike';
const EDIT_LIKE = "like/EDIT_LIKE"


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


//thunk for editing a like
export const EditLike = (editMatchLike,user_id, match_profile_id) => async dispatch => {
  const response = await fetch(`/api/user/${user_id}/matchProfile/${match_profile_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type':'application/json'
  },
    body: JSON.stringify(editMatchLike)
  });
  // console.log("editMatchLike", editMatchLike)

  const editedMatchLike = await response.json();
  dispatch(editOneLike(editedMatchLike, match_profile_id))
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
    // console.log("response from thunk". response)
    const newLike = await response.json();
    dispatch(toggleLike(newLike))
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
          console.log("action.newLike", action.newLike)
          return newState
        }
        // return state
      };
      case EDIT_LIKE: {
        if(!state[action.like]) {
          const newState = {
            ...state, [action.like.id]: action.like
          };
          // console.log("this is newState", newState)

          return newState
        }
        return state
      };
    default:
      return state;
  }
}
