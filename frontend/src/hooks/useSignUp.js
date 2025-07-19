import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const signUp = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });
    const data = response.data;
    await signIn({ username, password });
    return { data };
  };

  return [signUp, result];
};

export default useSignUp;