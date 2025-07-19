import { gql } from '@apollo/client';

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $after: String) {
    repository(id: $id) {
      id
      language
      fullName
      forksCount
      reviewCount
      stargazersCount
      ownerAvatarUrl
      ratingAverage
      description
      url
      reviews(first: 2, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

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

export const SORTED_REPOSITORIES = gql`
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
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

export const FILTERED_REPOSITORIES = gql`
  query Repositories($searchKeyword: String) {
      repositories(searchKeyword: $searchKeyword) {
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
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            repository {
              id
              fullName
            }
            createdAt
          }
        }
      }
    }
  }
`;
