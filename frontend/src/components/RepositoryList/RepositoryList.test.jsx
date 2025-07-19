import { render, screen, within } from "@testing-library/react-native";
import { RepositoryListContainer } from "./index";

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      render(<RepositoryListContainer repositories={repositories} />);
      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      // expect something from the first and the second repository item
      const first = within(firstRepositoryItem);
      expect(first.getByTestId('name')).toHaveTextContent('jaredpalmer/formik');
      expect(first.getByTestId('language')).toHaveTextContent('TypeScript');
      expect(first.getByTestId('description')).toHaveTextContent('Build forms in React, without the tears');
      expect(first.getByTestId('forks')).toHaveTextContent('1.6k');
      expect(first.getByTestId('stars')).toHaveTextContent('21.9k');
      expect(first.getByTestId('rating')).toHaveTextContent('88');
      expect(first.getByTestId('reviews')).toHaveTextContent('3');

      const second = within(secondRepositoryItem);
      expect(second.getByTestId('name')).toHaveTextContent('async-library/react-async');
      expect(second.getByTestId('language')).toHaveTextContent('JavaScript');
      expect(second.getByTestId('description')).toHaveTextContent('Flexible promise-based React data loader');
      expect(second.getByTestId('forks')).toHaveTextContent('69');
      expect(second.getByTestId('stars')).toHaveTextContent('1.8k');
      expect(second.getByTestId('rating')).toHaveTextContent('72');
      expect(second.getByTestId('reviews')).toHaveTextContent('3');
    });
  });
});