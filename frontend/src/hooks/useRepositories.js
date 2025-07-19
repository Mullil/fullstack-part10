import { useQuery } from '@apollo/client';
import { SORTED_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sort, searchQuery) => {
  let orderBy;
  if (!sort) orderBy = 'CREATED_AT';
  else orderBy = sort === 'latest' ? 'CREATED_AT' : 'RATING_AVERAGE';
  const orderDirection = sort === 'lowest' ? 'ASC' : 'DESC';
  const { data, error, loading } = useQuery(SORTED_REPOSITORIES, {
    variables: { orderBy, orderDirection, searchKeyword: searchQuery },
    fetchPolicy: 'cache-and-network'
  });

  return {
    repositories: data?.repositories,
    loading,
    error
  };
};

export default useRepositories;