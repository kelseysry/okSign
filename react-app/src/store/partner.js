const LOAD_PARTNERS = "partners/LOAD_PARTNERS";



// action creator to load all partners
const loadPartners = (partners) => ({
  type: LOAD_PARTNERS,
  partners
})


// thunk for getting all partners
export const getPartners = () => async(dispatch) => {

  const res = await fetch(`/api/partners/`)
  const partners = await res.json();
  // console.log("partners res.json()", partners)
  dispatch(loadPartners(partners))
}


// reducer
const initialState = {};
const partnerReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_PARTNERS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.partners)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default partnerReducer
