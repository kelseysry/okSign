const LOAD_GENDERS = "genders/LOAD_GENDERS";



// action creator to load all genders
const loadGenders = (genders) => ({
  type: LOAD_GENDERS,
  genders
})


// thunk for getting all genders
export const getGenders = () => async(dispatch) => {

  const res = await fetch(`/api/genders/`)
  const genders = await res.json();
  // console.log("genders res.json()", genders)
  dispatch(loadGenders(genders))
}


// reducer
const initialState = {};
const genderReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_GENDERS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.genders)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default genderReducer
