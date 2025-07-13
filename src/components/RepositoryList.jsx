import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './Item/RepositoryItem';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  itemWrapper: {
    marginHorizontal: 10,
    backgroundColor: 'white'
},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <View style={styles.itemWrapper}>
          <RepositoryItem item={item}/>
        </View>
      )}
    />
  );
};

export default RepositoryList;