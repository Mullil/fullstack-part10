import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "../Text";
import RepositoryItem from ".";
import { useParams } from "react-router-native";
import { itemStyles } from "./ItemStyles";
import theme from "../../theme";
import { parseISO, format } from 'date-fns';

const width = 50;

export const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  itemWrapper: {
    flexDirection: 'column',
    marginHorizontal: 10,
    backgroundColor: 'white',
    flexShrink: 1,
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'column',
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: width / 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    flexShrink: 1,
    paddingHorizontal: 7,
    marginVertical: 10,
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center'
  }
});

export const ItemSeparator = () => {
    return (<View style={styles.separator} />);
};

export const ReviewItem = ({ review, userReviews }) => {
  const parsedDate = parseISO(review.createdAt);
  const formattedDate = format(parsedDate, 'MMMM dd, yyyy');
  const headerText = userReviews
    ? review.repository?.fullName || 'Repository not found'
    : review.user?.username || 'No username';

  return(
    <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text color='primary' fontWeight='bold' fontSize='rating'>{review.rating}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text fontSize='subHeading' fontWeight='bold'>{headerText}</Text>
          <Text>{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
    </View>
  );
};

const SingleRepository = () => {
  const id = useParams().id;
  const result = useQuery(GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: { id:  id },
      skip: !id
  });

  const { data, error, loading, fetchMore } = result;

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;
    if (!canFetchMore) {
      return;
    }
    fetchMore({
      variables: {
        id,
        after: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  if (loading) return (<Text>Loading...</Text>);
  if (error) {
    console.log(error.message);
    return (<Text>Error loading repository</Text>);
  }

  const repository = data?.repository;

  const reviewNodes = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    handleFetchMore();
  };


  return (
    <View style={itemStyles.container}>
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <View style={styles.itemWrapper}><ReviewItem review={item} /></View>}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryItem repository={repository} showButton={true} />}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default SingleRepository;