import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });
    const data = response.data;
    const accessToken = response.data?.authenticate?.accessToken;
    await authStorage.setAccessToken(accessToken);
    apolloClient.resetStore();
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;