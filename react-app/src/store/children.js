const LOAD_CHILDREN = "children/LOAD_CHILDREN";



// action creator to load all children
const loadChildren = (children) => ({
  type: LOAD_CHILDREN,
  children
})


// thunk for getting all children
export const getChildren = () => async(dispatch) => {

  const res = await fetch(`/api/children/`)
  const children = await res.json();
  console.log("children res.json()", children)
  dispatch(loadChildren(children))
}


// reducer
const initialState = {};
const childrenReducer = (state = initialState, action) => {
  switch(action.type) {

    case LOAD_CHILDREN: {
      const newState = {...state};
      for (const[key,value] of Object.entries(action.children)) {
        newState[key] = value
      }
      return newState
    };
    default:
      return state;
  }
}

export default childrenReducer
