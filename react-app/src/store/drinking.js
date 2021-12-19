const LOAD_DRINKINGS = "drinkings/LOAD_DRINKINGS";



// action creator to load all drinkings
const loadDrinkings = (drinkings) => ({
  type: LOAD_DRINKINGS,
  drinkings
})


// thunk for getting all drinkings
export const getDrinkings = () => async(dispatch) => {

  const res = await fetch(`/api/drinkings/`)
  const drinkings = await res.json();
  // console.log("drinkings res.json()", drinkings)
  dispatch(loadDrinkings(drinkings))
}


// reducer
const initialState = {};
const drinkingReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_DRINKINGS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.drinkings)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default drinkingReducer
