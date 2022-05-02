// sessionModel = { sessionId: '', userId: '' }

// let table = [
//     {
//         sessionId: '',
//         userId: ''
//     },
//     {
//         sessionId: '',
//         userId: ''
//     }
// ]

const sessionTable = []

class Session {
  async createSession (token, userId) {
    sessionTable.push({
      sessionId: `${token}`,
      userId: `${userId}`
    })
  }

  async findSession (token) {
    const sessionIndex = sessionTable.findIndex(element => element.sessionId === token)
    return sessionIndex
  }

  async deleteSession (token) {
    const sessionIndex = sessionTable.findIndex(element => element.sessionId === token)
    sessionTable.pop(sessionIndex)
  }
}

const sessionControl = new Session()

module.exports = { sessionControl, sessionTable }
