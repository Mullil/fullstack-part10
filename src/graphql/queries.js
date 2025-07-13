import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          language
          fullName
          forksCount
          reviewCount
          stargazersCount
          ownerAvatarUrl
          ratingAverage
          description
        }
      }
      
    }
  }
`;

export const GET_USERS = gql`
    query {
        users {
            edges {
            node {
                username
            }
        }
    }
}
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
