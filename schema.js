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
    categories: [Categories!]
    createdAt: Int!
}
type Answers {
    id: Int!
    question: String!
    answer: String!
    surveysId: Surveys!
    required: Boolean!
}
type Categories {
    id: Int!
    name: String!
    surveysId: Surveys!
}

type Query{
    getUser(id: Int!): User!
    getAllUsers: [User!]!
    getSurveys(id: Int!): Surveys!
    getUserSurveys(userId: Int!): [Surveys!]!
    getSurveyAnswers(surveyId: Int!): [Answers!]!
    getSurveyCategories(surveyId: Int!): [Categories]!
}
type Mutation {
    createUser(name: String! email: String! password: String!): User!
    createSurvey(name: String! user_id: Int!): Surveys!
    createAnswer(surveysId: Int! answer: String! required: Boolean! question: String!): Answers!
    createCategory(surveysId: Int! name: String!): Categories!
}

`

module.exports = typeDefs