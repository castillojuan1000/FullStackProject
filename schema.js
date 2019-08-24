const { gql } = require('apollo-server-express')
const typeDefs = gql`

type User {
    id: Int!
    name: String!
    email: String!
    password_hash: String!
    surveys: [Surveys!]
}

type Surveys {
    id: Int!
    name: String!
    answers: [Answers!]
    user_id: Int!
    user: User!
}
type Answers {
    id: Int!
    question: String!
    answer: String!
    surveys_Id: Surveys!
    require: Boolean!
}

type Query{
    getUser(id: Int!): User!
    getAllUsers: [User!]!
    getSurveys(id: Int!): Surveys!
}
type Mutation {
    createUser(name: String! email: String! password: String!): User!
    createSurvey(name: String! user_id: Int!): Surveys!
    createAnswer(name: String! surveys_Id: Int! answer: String! require: Boolean! question: String!): Answers!
}

`

module.exports = typeDefs