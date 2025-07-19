import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

import useAuthStorage from '../hooks/useAuthStorage';

const useReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ owner, name, rating, review }) => {
    const response = await mutate({
    variables: {
        ownerName: owner,
        repositoryName: name,
        rating: rating,
        text: review,
    },
    });
    const data = response.data;
    await apolloClient.resetStore();
    return { data };
  };

  return [createReview, result];
};

export default useReview;