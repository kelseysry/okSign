const LOAD_QUESTIONS = "question/LOAD_QUESTIONS";
const LOAD_QUESTION = "question/LOAD_QUESTION";
const ADD_ONE = "question/ADD_ONE"
const CLEAR = 'question/CLEAR'


// action creator load all questions to questions
const loadAllQuestions = (questions) => ({
  type: LOAD_QUESTIONS,
  questions
});

// action creator to create one question
const addOneQuestion = (newQuestion) => ({
  type: ADD_ONE,
  newQuestion
})

// action creator to load one question
const loadQuestion = (question) => ({
  type: LOAD_QUESTION,
  question
})

export const clearQuestions = () => ({
  type: CLEAR
})


// thunk for getting all questions to questions
export const getQuestions = () => async(dispatch) => {

    const res = await fetch(`/api/questions/`)
    const questions = await res.json();
    console.log("questions res.json()", questions)
    dispatch(loadAllQuestions(questions))
}


// thunk for creating a question
export const createQuestion = (formData) => async (dispatch) => {

  console.log("formdata in thunk",formData)
  console.log("conversation_id in thunk")


  const response = await fetch(`/api/questions/create`, {
    method: 'POST',
    headers : {
      'Content-Type': 'application/json',
     },
     body: JSON.stringify(
      formData
    )
  });
  try {
    // console.log("response from thunk". response)
    const newQuestion = await response.json();
    dispatch(addOneQuestion(newQuestion))
    console.log("newQuestion in thunk-------", newQuestion)
    return newQuestion
  } catch(error) {
    // console.log(error)
  }
}

// thunk for getting one question
export const getQuestion= (user_id) => async(dispatch) => {
  if (user_id) {
    const res = await fetch(`/api/questions/${user_id}`)
    const question = await res.json();
    console.log("question res.json()", question)
    dispatch(loadQuestion(question))

  }
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
    };
        case ADD_ONE : {
      // console.log("add_one case", action.newQuestion)
      if(!state[action.newQuestion.id]) {
        const newState = {
          ...state,  [action.newQuestion.question.id]: action.newQuestion.question
        }
        console.log("action.newQuestion", action.newQuestion)
        return newState
      }
      // return state
    };
    case LOAD_QUESTION: {
      const newState = {...state};
      newState[action.question?.id] = action.question
      // console.log("this is newState in Load", newState)
      return newState
    };
    case CLEAR:{
      state = {}
      return state
  }
    default:
      return state;
  }
}

export default questionReducer
