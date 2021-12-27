const TOGGLE_LIKE = 'like/toggleLike';


export const toggleLike = (newLike) => ({
  type: TOGGLE_LIKE,
  newLike,
});


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
      }
    default:
      return state;
  }
}
