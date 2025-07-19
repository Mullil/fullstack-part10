import { useQuery, useMutation } from "@apollo/client";
import { ME } from "../graphql/queries";
import Text from "./Text";
import { ReviewItem } from "./Item/SingleRepository";
import { FlatList, View, Alert } from "react-native";
import { styles, ItemSeparator } from "./Item/SingleRepository";
import { useNavigate } from "react-router-native";
import { useEffect } from "react";
import Button from "./Button";
import { DELETE_REVIEW } from "../graphql/mutations";

const UserReviewList = () => {
  const [deleteReview] = useMutation(DELETE_REVIEW);

  const navigate = useNavigate();
  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    if (!loading && !data?.me) {
      navigate('/');
    }
  }, [loading, data, navigate]);

  if (loading) return (<Text>Loading reviews...</Text>);
  if (error) return (<Text>Error: {error.message}</Text>);

  const reviewNodes = data.me?.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : [];

  if (reviewNodes.length === 0) return (<Text>No reviews made yet</Text>);

  const handleRemove = (id) => {
    Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review",
        [
            {
                text: "Cancel"
            },
            {
                text: "Delete",
                onPress: async () => {
                    await deleteReview({ variables: { id: id } });
                    await refetch();
                }
            }
        ], { cancelable: true }
    );
  };

  return (
    <FlatList
        data={reviewNodes}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
                <ReviewItem review={item} userReviews={true} />
                <View style={{ flexDirection: 'row' }}>
                    <Button
                        backgroundColor="blue"
                        text="View repository"
                        onPress={() => navigate(`/${item.repository.id}`)}
                    />
                    <Button
                        backgroundColor="red"
                        text="Delete review"
                        onPress={() => handleRemove(item.id)}
                    />
                </View>
            </View>
        )}
    />
  );
};

export default UserReviewList;