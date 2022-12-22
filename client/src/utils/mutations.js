import { gql } from "@apollo/client";

export const LOGIN_USER = gql `
mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBooks {
          _id
          authors
          bookId
          description
          image
          link
          title
        }
        bookCount
      }
    }
  }`;

export const ADD_USER = gql `
mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        bookCount
        email
        savedBooks {
          authors
          bookId
          description
          image
          link
          title
        }
        username
      }
    }
  }`; 

export const SAVE_BOOK=gql `
mutation Mutation($input: saveBook) {
    saveBook(input: $input) {
      _id
      bookCount
      email
      savedBooks {
        _id
        authors
        bookId
        description
        link
        image
        title
      }
      username
    }
  }`;

export const REMOVE_BOOK=gql`
mutation Mutation($bookId: ID) {
    removeBook(bookId: $bookId) {
      _id
      bookCount
      email
      username
      savedBooks {
        _id
        authors
        bookId
        description
        image
        link
        title
      }
    }
  }
`