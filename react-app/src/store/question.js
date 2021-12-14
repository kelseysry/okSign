const LOAD_QUESTIONS = "question/LOAD_QUESTIONS";

// action creator load all questions to questions
const loadAllQuestions = (questions) => ({
  type: LOAD_QUESTIONS,
  questions
});


// thunk for getting all questions to questions
export const getQuestions = () => async(dispatch) => {

    const res = await fetch(`/api/questions`)
    const questions = await res.json();
    // console.log("questions res.json()", questions)
    dispatch(loadAllQuestions(questions))
}


// reducer
const initialState = {};
const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_QUESTIONS: {
      const newState = {...state};
      // console.log("reducer question", action.questions)
      for (const[key,value] of Object.entries(action.questions)) {
        newState[key] = value
      }
      // console.log("newState LOAD_QUESTIONS", newState)
      return newState
    }
    default:
      return state;
  }
}

export default questionReducer
