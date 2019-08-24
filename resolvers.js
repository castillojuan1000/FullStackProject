
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
        },
        async getUserSurveys(root, { userId }, { models }) {
            return models.surveys.findAll({
                where: {
                    userId: userId
                }
            })
        },
        async getSurveyAnswers(root, { surveyId }, { models }) {
            return models.answers.findAll({
                where: {
                    surveysId: surveyId
                }
            })
        }
    },
    Mutation: {
        async createUser(root, { name, email, password }, { models }) {
            var encryptedPass = await hashPass(password)
            const user = { name: name, email: email, passwordHash: encryptedPass }
            return models.users.create(user)
        },
        async createSurvey(root, { user_id, name }) {
            const survey = { userId: user_id, name: name }
            return models.surveys.create(survey)
        },
        async createAnswer(root, { surveys_id, required, question, answer }) {
            const answerObject = { require: required, surveysId: surveys_id, question: question, answer: answer }
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
            return user.getUser()
        },
        async answers(surveys) {
            return surveys.getAnswers()
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