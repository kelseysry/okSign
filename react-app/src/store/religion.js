const LOAD_RELIGIONS = "religions/LOAD_RELIGIONS";



// action creator to load all religions
const loadReligions = (religions) => ({
  type: LOAD_RELIGIONS,
  religions
})


// thunk for getting all religions
export const getReligions = () => async(dispatch) => {

  const res = await fetch(`/api/religions/`)
  const religions = await res.json();
  // console.log("religions res.json()", religions)
  dispatch(loadReligions(religions))
}


// reducer
const initialState = {};
const religionReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_RELIGIONS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.religions)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default religionReducer
