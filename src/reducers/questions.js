import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  console.log(action)
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      if(action.optionChosen === state[action.id].option_1){
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            voted_option_1: [...state[action.id].voted_option_1, action.authedUser]
          }
        }
      }else{
        return {
          ...state,
          [action.id]: {
            ...state[action.id],
            voted_option_2: [...state[action.id].voted_option_2, action.authedUser]
          }
        }
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question
      };
    default:
      return state;
  }
}
