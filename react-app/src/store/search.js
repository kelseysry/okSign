const SEARCH = 'search/SEARCH'


export const searchUser = (user) => ({
  type: SEARCH,
  user
})

export const search = (input) => async(dispatch) => {
  const response = await fetch(`/api/search/${input}`)
  if (response.ok) {
      const searchResults = await response.json();
      dispatch(searchUser(searchResults))
      return searchResults
  }
}

const searchReducer = (state={}, action) => {
  switch(action.type){
      case SEARCH:{
          const newState = action.user
          return newState
      }
      default:
          return state
  }
}

export default searchReducer
