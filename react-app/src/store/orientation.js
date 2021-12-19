const LOAD_ORIENTATIONS = "orientations/LOAD_ORIENTATIONS";



// action creator to load all orientations
const loadOrientations = (orientations) => ({
  type: LOAD_ORIENTATIONS,
  orientations
})


// thunk for getting all orientations
export const getOrientations = () => async(dispatch) => {

  const res = await fetch(`/api/orientations/`)
  const orientations = await res.json();
  // console.log("orientations res.json()", orientations)
  dispatch(loadOrientations(orientations))
}


// reducer
const initialState = {};
const orientationReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_ORIENTATIONS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.orientations)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default orientationReducer
