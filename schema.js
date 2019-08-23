const { gql } = require('apollo-server-express')
const typeDefs = gql`

type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    surverys: [Surveys!]
}

type Surveys {
    id: Int!
    name: String!
    answers: [Answers!]
}
type Answers {
    question: String!
    answer: String!
}

type Query{
    getUser(id: Int!): User
    getAllUsers: [User!]!
    getSurveys(id: Int!): Sruveys
}
type Mutation {
    createUser(name: String!): User!
    createSurvey(name: String!): Surveys!
}

`

module.exports = typeDefs