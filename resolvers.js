
const bcrypt = require('bcrypt')

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
        },
        async getUserLikes(root, { userId }, { models }) {
            return models.likes.findAll({ where: { userId: userId } })
        }
    },
    Mutation: {
        async createUser(root, { name, email, password }, { models }) {
            var encryptedPass = await hashPass(password)
            const user = { name: name, email: email.toLowerCase(), passwordHash: encryptedPass }
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
        },
        async removeUser(root, { id }) {
            try {
                const userSurveys = await models.surveys.findOne({ where: { userId: id } })
                await models.answers.destroy({ where: { surveysId: userSurveys.id } })
                await models.categories.destroy({ where: { surveysId: userSurveys.id } })
                await models.surveys.destroy({ where: { userId: id } })
            } catch{
                console.log('No surveys for this user with id of ' + id)
            }
            await models.users.destroy({ where: { id: id } })
            return `Deleted user with id of ${id}`
        },
        async createUserLike(root, { listing, imgUrl, userId, title, price }, { models }) {
            const like = { listingId: listing, imgUrl: imgUrl, title: title, price: price, userId: userId }
            return models.likes.create(like)
        },
        async removeUserLike(root, { id }, { models }) {
            await models.likes.destroy({
                where: { id: id }
            })
            return `Removed like with id of ${id}`
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
    },
    Likes: {
        async user(user) {
            return user.getLike()
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
