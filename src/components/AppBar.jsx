import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link, useNavigate } from 'react-router-native';
import { ScrollView } from 'react-native';

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

const AppBar = () => {
  const navigate = useNavigate();

  return ( <View style={styles.flexContainer}>
            <ScrollView horizontal>
                <Pressable onPress={() => navigate('/')}>
                    <Text style={styles.text}>Repositories</Text>
                </Pressable>
                <Link to="/signin">
                    <Text style={styles.text}>Sign in</Text>
                </Link>
            </ScrollView>
         </View>
  )
};

export default AppBar;