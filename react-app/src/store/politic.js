const LOAD_POLITICS = "politics/LOAD_POLITICS";



// action creator to load all politics
const loadPolitics = (politics) => ({
  type: LOAD_POLITICS,
  politics
})


// thunk for getting all politics
export const getPolitics = () => async(dispatch) => {

  const res = await fetch(`/api/politics/`)
  const politics = await res.json();
  // console.log("politics res.json()", politics)
  dispatch(loadPolitics(politics))
}


// reducer
const initialState = {};
const politicReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_POLITICS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.politics)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default politicReducer
