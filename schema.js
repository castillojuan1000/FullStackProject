const { gql } = require('apollo-server-express')
const typeDefs = gql`

type User {
    id: ID!
    name: String!
    email: String!
    passwordHash: String!
    surveys: [Surveys!]
}

type Surveys {
    id: ID!
    name: String!
    answers: [Answers!]
    userId: Int!
    user: User!
    categories: [Categories!]
    createdAt: String!
}
type Answers {
    id: ID!
    question: String!
    answer: String!
    survey: Surveys!
    required: Boolean!
}

type Categories {
    id: ID!
    name: String!
    survey: Surveys!
}
type Likes{
    id: ID!
    listingId: Int!
    imgUrl: String!
    title: String!
    price: Int!
    user: User!
}

type Query{
    getUser(id: Int!): User!
    getAllUsers: [User!]!
    getSurvey(id: Int!): Surveys!
    getUserSurveys(userId: Int!): [Surveys!]!
    getSurveyAnswers(surveyId: Int!): [Answers!]!
    getSurveyCategories(surveyId: Int!): [Categories]!
    getUserLikes(id: Int!): Likes!
}
type Mutation {
    createUser(name: String! email: String! password: String!): User!
    createSurvey(name: String! user_id: Int!): Surveys!
    createAnswer(surveyId: Int! answer: String! required: Boolean! question: String!): Answers!
    createCategory(surveyId: Int! name: String!): Categories!
    removeSurvey(surveyId: Int!): String!
    removeUser(id: Int!): String!
    addUserLike(listing: Int! imgUrl: String! userId: Int! title: String! price: Int!): Likes!
}

`

module.exports = typeDefs