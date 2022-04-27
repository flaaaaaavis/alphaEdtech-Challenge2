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

let sessionTable = [];

class session {
    async createSession(token, userId) {
        sessionTable.push({
            sessionId: `${token}`,
            userId: `${userId}`
        })
    }
    async findSession(token) {
        const sessionIndex = sessionTable.findIndex(element => element = token);
        return sessionIndex;
    }
    async deleteSession(token) {
        const sessionIndex = sessionTable.findIndex(element => element = token);
        sessionTable.pop(sessionIndex);
    }
}

module.exports = { session, sessionTable };