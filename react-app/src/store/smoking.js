const LOAD_SMOKINGS = "smoking/LOAD_SMOKINGS";



// action creator to load all smokings
const loadSmokings = (smokings) => ({
  type: LOAD_SMOKINGS,
  smokings
})


// thunk for getting all smokings
export const getSmokings = () => async(dispatch) => {

  const res = await fetch(`/api/smokings/`)
  const smokings = await res.json();
  // console.log("smokings res.json()", smokings)
  dispatch(loadSmokings(smokings))
}


// reducer
const initialState = {};
const smokingReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_SMOKINGS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.smokings)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default smokingReducer
