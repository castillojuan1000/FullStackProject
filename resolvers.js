
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        async getUser(root, { id }, { models }) {
            return models.users.findByPk(id)
        },
        async getAllUsers(root, args, { models }) {
            return models.users.findAll()
        },
        async getSurveys(root, { id }, { models }) {
            return models.surveys.findByPk(id)
        }
    },
    Mutation: {
        async createUser(root, { name, email, password }, { models }) {
            var encryptedPass = await hashPass(password)
            console.log(encryptedPass)
            const user = { name: name, email: email, password_hash: encryptedPass }
            return models.users.create(user)
        },
        async createSurvey(root, { user_id, name }) {
            const survey = { user_id: user_id, name: name }
            return models.surveys.create(survey)
        },
        async createAnswer(root, { survey_id, name, question, answer }) {
            const answerObject = { name: name, survey_id: survey_id, question: question, answer: answer }
            return models.answers.create(answerObject)
        }
    },
    User: {
        async surveys(surveys) {
            return surveys.getSurveys()
        }
    },
    Surveys: {
        async user(user) {
            return user.getUsers()
        }
    }
}

hashPass = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                return reject(err)
            } else {
                return resolve(hash)
            }
        })
    })
}

module.exports = resolvers