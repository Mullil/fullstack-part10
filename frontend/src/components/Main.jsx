import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import Text from './Text';
import SingleRepository from './Item/SingleRepository';
import ReviewForm from './ReviewForm';
import SignUp from './SignUp';
import UserReviewList from './UserReviewList';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "#e1e4e8",

  },
});

const Main = () => {
  const { loading, error, data, refetch } = useQuery(ME);
  if (loading) return (<Text>loading...</Text>);
  if (error) return (<Text>Error: {error.message}</Text>);

  return (
    <View style={styles.container}>
      <AppBar auth={data?.me} refetch={refetch} />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/:id" element={<SingleRepository />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<ReviewForm auth={data?.me} />} />
        <Route path="/myreviews" element={<UserReviewList />} />
      </Routes>
    </View>
  );
};

export default Main;
