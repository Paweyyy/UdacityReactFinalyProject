let users = {
  sarah_edo: {
    id: "sarah_edo",
    name: "Sarah Drasner",
    avatarURL: "https://tylermcginnis.com/would-you-rather/sarah.jpg",
    questions: [],
  },
  tylermcginnis: {
    id: "tylermcginnis",
    name: "Tyler McGinnis",
    avatarURL: "https://tylermcginnis.com/would-you-rather/tyler.jpg",
    questions: [],
  },
  dan_abramov: {
    id: "dan_abramov",
    name: "Dan Abramov",
    avatarURL: "https://tylermcginnis.com/would-you-rather/dan.jpg",
    questions: [],
  }
}

let questions = {
  "xi3ca2jcfvpa0i3t4m7ag": {
    id: "xi3ca2jcfvpa0i3t4m7ag",
    author: "tylermcginnis",
    option_1: "Build your new application with Javascript",
    option_2: "Build your new application with Typescript",
    voted_option_1: ["sarah_edo"],
    voted_option_2: ["tylermcginnis"],
    timestamp: 1518122597860
  },
  "5c9qojr2d1738zlx09afby": {
    id: "5c9qojr2d1738zlx09afby",
    author: "sarah_edo",
    option_1: "Get a office dog",
    option_2: "Get a office cat",
    voted_option_1: ["sarah_edo"],
    voted_option_2: [],
    timestamp: 1518043995650
  }
}

export function _getUsers () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((res, rej) => {
    setTimeout(() => res({...questions}), 1000)
  })
}

export function _saveQuestionResponse ({ id, optionChosen, authedUser }) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if(optionChosen === questions[id].option_1){
        questions = {
          ...questions,
          [id]: {
            ...questions[id],
            voted_option_1: [...questions[id].voted_option_1, authedUser]
          }
        }
      }else{
        questions = {
          ...questions,
          [id]: {
            ...questions[id],
            voted_option_2: [...questions[id].voted_option_2,authedUser]
          }
        }
      }
      console.log(questions)
      res()
    }, 500)
  })
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

function formatQuestion ({ author, question, option_1, option_2 }) {
  return {
    id: generateUID(),
    author,
    option_1,
    option_2,
    voted_option_1: [],
    voted_option_2: [],
    timestamp: Date.now(),
  }
}

export function _saveQuestion ({ option_1, option_2, author }) {
  return new Promise((res, rej) => {
    const formattedQuestion = formatQuestion({
      option_1,
      option_2,
      author
    })

    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      }

      users = {
        ...users,
        [author]: {
          ...users[author],
          questions: users[author].questions.concat([formattedQuestion.id])
        }
      }

      res(formattedQuestion)
    }, 1000)
  })
}
