import { saveQuestion, saveQuestionResponse } from "../utils/api";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ANSWER_QUESTION = "ANSWER_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(option_1, option_2) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestion({
      option_1,
      option_2,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function answerQuestion({ id, authedUser, optionChosen }) {
  return {
    type: ANSWER_QUESTION,
    id,
    authedUser,
    optionChosen
  };
}

export function handleAnswerQuestion(info) {
  return (dispatch) => {
    dispatch(answerQuestion(info));

    return saveQuestionResponse(info).catch((e) => {
      console.warn("Error in handleAnswerQuestion: ", e);
      dispatch(answerQuestion(info));
      alert("The was an error answering this question. Try again.");
    });
  };
}
