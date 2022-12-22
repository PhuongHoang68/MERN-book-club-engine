import { gql } from "@apollo/client";

export const GET_ME = gql `
query Query {
    me {
      _id
      bookCount
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
      username
    }
  }`;