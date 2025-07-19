import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from '../Item';
import useRepositories from '../../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState, useRef } from 'react';
import { Picker } from '@react-native-picker/picker';
import Text from '../Text';
import { Searchbar } from 'react-native-paper';
import React from 'react';
import { useDebounce } from 'use-debounce';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  itemWrapper: {
    marginHorizontal: 10,
    backgroundColor: 'white'
},
});

const ItemSeparator = () => (<View style={styles.separator} />);

const FilterForm = ({ searchQuery, setSearchQuery }) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
  );
};


const SelectSort = ({ sort, setSort }) => {
  const pickerRef = useRef();

  return (
    <Picker
      ref={pickerRef}
      selectedValue={sort}
      onValueChange={(itemValue)  => setSort(itemValue)}>
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

const Header = ({ sort, setSort, searchQuery, setSearchQuery }) => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <FilterForm
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <SelectSort
          sort={sort}
          setSort={setSort}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
    </View>
  );
};


export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { sort, setSort, searchQuery, setSearchQuery } = this.props;
    return (
      <Header
        sort={sort}
        setSort={setSort}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    );
  };
  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];
    return (
      <FlatList
        data={repositoryNodes}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        renderItem={({ item }) => (
          <View style={styles.itemWrapper}>
            <Pressable onPress={() => navigate(`/${item.id}`)}>
              <RepositoryItem repository={item} showButton={false} />
            </Pressable>
          </View>
        )}
      />
    );
  }
}

const RepositoryList = () => {
  const [sort, setSort] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);
  const { repositories, loading, error } = useRepositories(sort, debouncedSearchQuery);
  const navigate = useNavigate();
  if (loading) {
    return <Text>Loading repositories...</Text>;
  }
  if (error) {
    return <Text>Error loading repositories</Text>;
  }

  console.log(repositories);
  return <RepositoryListContainer
            sort={sort}
            setSort={setSort}
            repositories={repositories}
            navigate={navigate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
        />;

};

export default RepositoryList;