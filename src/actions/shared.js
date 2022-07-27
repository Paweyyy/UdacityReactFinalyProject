import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { addAnswerToUser, addQuestionToUser, receiveUsers } from "./users";
import { addQuestion, receiveQuestions } from "./questions";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import { answerQuestion } from "./questions";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(hideLoading());
    });
  };
}

export function handleAnswerQuestion({ authedUser, qid, answer }) {
  return (dispatch) => {
    dispatch(answerQuestion({qid, authedUser, answer }));
    dispatch(addAnswerToUser({qid, authedUser, answer}));

    return saveQuestionAnswer({ qid, authedUser, answer }).catch((e) => {
      console.warn("Error in handleAnswerQuestion: ", e);
      dispatch(answerQuestion({qid, authedUser, answer }));
      dispatch(addAnswerToUser({qid, authedUser, answer}));
      alert("The was an error answering this question. Try again.");
    });
  };
}

export function handleAddQuestion({ optionOne, optionTwo, authedUser }){
  return (dispatch) => {

    dispatch(showLoading());

    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      "author": authedUser
    })
    .then(question => {
      dispatch(addQuestion(question))
      dispatch(addQuestionToUser(question))
    })
    .then(() => dispatch(hideLoading()));
  }
}
