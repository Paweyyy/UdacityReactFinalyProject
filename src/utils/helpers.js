export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet (tweet, author, authedUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authedUser),
    parent: !parentTweet ? null : {
      author: parentTweet.author,
      id: parentTweet.id,
    }
  }
}

export function formatLeaderboardData({ questions, users }){
    let res = [];
    Object.keys(users).map(user => {
      res = [...res, {
        "user": users[user].id,
        "name": users[user].name,
        "avatarURL": users[user].avatarURL,
        "answered": Object.keys(users[user].answers).length,
        "created": users[user].questions.length
      }]
      return null
    })
    res = res.sort((a,b) => {
      if(a.answered === b.answered){
        return a.created < b.created ? 1 : -1
      }else{
        return a.answered < b.answered ? 1 : -1
      }
    })
    return res
} 