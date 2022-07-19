import {
  _getUsers,
  _getQuestions,
  _saveQuestionResponse,
  _saveQuestion,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, questions]) => ({
    users,
    questions,
  }))
}

export function saveQuestionResponse (info) {
  return _saveQuestionResponse(info)
}

export function saveQuestion (info) {
  return _saveQuestion(info)
}