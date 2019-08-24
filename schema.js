const { gql } = require('apollo-server-express')
const typeDefs = gql`

type User {
    id: Int!
    name: String!
    email: String!
    passwordHash: String!
    surveys: [Surveys!]
}

type Surveys {
    id: Int!
    name: String!
    answers: [Answers!]
    userId: Int!
    user: User!
}
type Answers {
    id: Int!
    question: String!
    answer: String!
    surveysId: Surveys!
    required: Boolean!
}

type Query{
    getUser(id: Int!): User!
    getAllUsers: [User!]!
    getSurveys(id: Int!): Surveys!
    getUserSurveys(userId: Int!): [Surveys!]!
    getSurveyAnswers(surveyId: Int!): [Answers!]!
}
type Mutation {
    createUser(name: String! email: String! password: String!): User!
    createSurvey(name: String! user_id: Int!): Surveys!
    createAnswer(surveys_id: Int! answer: String! required: Boolean! question: String!): Answers!
}

`

module.exports = typeDefs