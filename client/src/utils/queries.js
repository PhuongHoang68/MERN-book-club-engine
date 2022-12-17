import { gql } from "@apollo/client";

export const QUERY_ME = gql `
{
    me {
        _id
        username
        email
        savedBooks: [bookSchema]
    }
}`;

export const QUERY_ME_BASIC = gql `
{
    me {
        _id
        username
        email
    }
}`;