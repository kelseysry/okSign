const LOAD_HOROSCOPE = "horoscope/LOAD_HOROSCOPE";
const LOAD_HOROSCOPES = "horoscope/LOAD_HOROSCOPES";

// action creator load one horoscope
const loadHoroscope = (horoscope) => ({
  type: LOAD_HOROSCOPE,
  horoscope
})

// action creator to load all horoscope
const loadHoroscopes = (horoscopes) => ({
  type: LOAD_HOROSCOPES,
  horoscopes
})

// thunk for getting one horoscope
export const getHoroscope = (id) => async(dispatch) => {
  if(id) {
    const res = await fetch(`/api/horoscopes/${id}`)
    const horoscope = await res.json();
    dispatch(loadHoroscope(horoscope))
  }
}

// thunk for getting all horoscopes
export const getHoroscopes = () => async(dispatch) => {

  const res = await fetch(`/api/horoscopes/`)
  const horoscopes = await res.json();
  // console.log("horoscopes res.json()", horoscopes)
  dispatch(loadHoroscopes(horoscopes))
}


// reducer
const initialState = {};
const horoscopeReducer = (state = initialState, action) => {
  switch(action.type) {
    case LOAD_HOROSCOPE: {
      const newState = {...state};
      newState[action.horoscope?.id] = action.horoscope
      return newState
    };
    case LOAD_HOROSCOPES: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.horoscopes)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default horoscopeReducer
