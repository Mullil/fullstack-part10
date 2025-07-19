import Text from '../Text';
import { TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import theme from '../../theme';
import * as yup from 'yup';
import useSignIn from '../../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import Button from '../Button';

const styles = StyleSheet.create({
  container: {
      flexDirection: 'column',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e1e4e8',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 4,
    marginVertical: 10,
    width: 250
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 100,
    borderRadius: 4,
    marginVertical: 10,
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <View style={styles.container}>
      <View>
        <TextInput style={[
          styles.input,
          formik.touched.username && formik.errors.username && { borderColor: '#d73a4a' }
        ]}
          placeholder="username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
        />
        {formik.touched.username && formik.errors.username && (
          <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
        )}
      </View>
      <View>
        <TextInput style={[
            styles.input,
            formik.touched.password && formik.errors.password && { borderColor: '#d73a4a' }
          ]}
          secureTextEntry
          placeholder="password"
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
        />
        {formik.touched.password && formik.errors.password && (
          <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
        )}
      </View>
      <Button backgroundColor="blue" text={"Sign in"} onPress={formik.handleSubmit} />
    </View>
  );
};

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (<SignInContainer onSubmit={onSubmit} />);
};

export default SignIn;