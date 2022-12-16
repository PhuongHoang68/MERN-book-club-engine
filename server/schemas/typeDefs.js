const { gql } = require("apollo-server-express");

const typeDefs = gql `
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]
},
type Book {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
},
input saveBook {
    authors: [String]
    description: String
    title: String
    bookId: String
    image: String
    link: String
},
type Auth {
    token: ID!
    user: User
},
type Query {
    me: User
},
type Mutation {
    login(email: String!, password: String!) : Auth
    addUser(username: String!, email: String!, password: String!) : Auth
    saveBook(input: saveBook) : User
    removeBook(bookId: ID): User
}
`;

module.exports = typeDefs;
