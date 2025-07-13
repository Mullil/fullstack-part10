import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import { ScrollView } from 'react-native';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 20,
    flexDirection: 'row',
    paddingBottom: 40,
    height: 150,
    backgroundColor: theme.colors.secondary,
    alignItems: 'flex-end',
  },
  text: {
    fontSize: theme.fontSizes.heading,
    fontWeight: 'bold',
    color: 'white',
    paddingHorizontal: 6,
  }
});

const AppBar = ({ auth, refetch }) => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore();
    await refetch();
    navigate('/');
  }

  return ( <View style={styles.flexContainer}>
            <ScrollView horizontal>
                <Pressable onPress={() => navigate('/')}>
                    <Text style={styles.text}>Repositories</Text>
                </Pressable>
                {!auth &&
                <Link to="/signin">
                    <Text style={styles.text}>Sign in</Text>
                </Link>
                }
                {auth && 
                <Pressable onPress={signOut}>
                    <Text style={styles.text}>Sign out</Text>
                </Pressable>
                }
            </ScrollView>
         </View>
  )
};

export default AppBar;