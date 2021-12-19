const LOAD_PETS = "pets/LOAD_PETS";



// action creator to load all pets
const loadPets = (pets) => ({
  type: LOAD_PETS,
  pets
})


// thunk for getting all pets
export const getPets = () => async(dispatch) => {

  const res = await fetch(`/api/pets/`)
  const pets = await res.json();
  // console.log("pets res.json()", pets)
  dispatch(loadPets(pets))
}


// reducer
const initialState = {};
const petReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_PETS: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.pets)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default petReducer
