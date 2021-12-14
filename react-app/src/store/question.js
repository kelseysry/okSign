const LOAD_ANSWERS = "question/LOAD_ANSWERS";

// action creator load all answers to questions
const loadAllAnswers = (answers) => ({
  type: LOAD_ANSWERS,
  answers
});


// thunk for getting all answers to questions
export const getAnswers = () => async(dispatch) => {

    const res = await fetch(`/api/questions`)
    const answers = await res.json();
    // console.log("answers res.json()", answers)
    dispatch(loadAllAnswers(answers))
}


// reducer
const initialState = {};
const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ANSWERS: {
      const newState = {...state};
      // console.log("reducer question", action.answers)
      for (const[key,value] of Object.entries(action.answers)) {
        newState[key] = value
      }
      // console.log("newState LOAD_ANSWERS", newState)
      return newState
    }
    default:
      return state;
  }
}

export default questionReducer
