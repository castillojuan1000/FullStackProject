
const bcrypt = require('bcrypt');

const resolvers = {
    Query: {
        async getUser(root, { id }, { models }) {
            return models.users.findByPk(id)
        },
        async getAllUsers(root, args, { models }) {
            return models.users.findAll()
        },
        async getSurvey(root, { id }, { models }) {
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
        },
        async getSurveyCategories(root, { surveyId }, { models }) {
            return models.categories.findAll({
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
        async createAnswer(root, { surveyId, required, question, answer }) {
            const answerObject = { require: required, surveysId: surveyId, question: question, answer: answer }
            return models.answers.create(answerObject)
        },
        async createCategory(root, { surveyId, name }) {
            return models.categories.create({ surveysId: surveyId, name: name })
        },
        async removeSurvey(root, { surveyId }) {
            await models.categories.destroy({ where: { surveysId: surveyId } })
            await models.answers.destroy({ where: { surveysId: surveyId } })
            return models.surveys.destroy({ where: { id: surveyId } })

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
        },
        async categories(surveys) {
            return surveys.getCategories()
        }
    },
    Answers: {
        async survey(answers) {
            return answers.getSurvey()
        }
    },
    Categories: {
        async survey(categories) {
            return categories.getSurvey()
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