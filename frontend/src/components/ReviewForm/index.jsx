import Text from '../Text';
import { TextInput, View, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import Button from '../Button';
import useReview from '../../hooks/useReview';
import { useEffect } from 'react';

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
});

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  owner: yup
    .string()
    .required('Repository owner name is required'),
  name: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .min(0, 'Rating must be at least 0')
    .max(100, 'Maximum rating is 100')
    .required('Rating is required'),
  review: yup
    .string()
    .optional()
});

export const ReviewFormContainer = ({ onSubmit }) => {

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
          formik.touched.owner && formik.errors.owner && { borderColor: '#d73a4a' }
        ]}
          placeholder="Repository owner name"
          value={formik.values.owner}
          onChangeText={formik.handleChange('owner')}
        />
        {formik.touched.owner && formik.errors.owner && (
          <Text style={{ color: '#d73a4a' }}>{formik.errors.owner}</Text>
        )}
      </View>
      <View>
        <TextInput style={[
            styles.input,
            formik.touched.name && formik.errors.name && { borderColor: '#d73a4a' }
          ]}
          placeholder="Repository name"
          value={formik.values.name}
          onChangeText={formik.handleChange('name')}
        />
        {formik.touched.name && formik.errors.name && (
          <Text style={{ color: '#d73a4a' }}>{formik.errors.name}</Text>
        )}
      </View>
      <View>
        <TextInput style={[
            styles.input,
            formik.touched.rating && formik.errors.rating && { borderColor: '#d73a4a' }
          ]}
          keyboardType='numeric'
          placeholder="Rating between 0 and 100"
          value={formik.values.rating}
          onChangeText={formik.handleChange('rating')}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
        )}
      </View>
      <View>
        <TextInput style={styles.input}
          multiline
          placeholder="Review"
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
        />
        {formik.touched.review && formik.errors.review && (
          <Text style={{ color: '#d73a4a' }}>{formik.errors.review}</Text>
        )}
      </View>
      <Button backgroundColor="blue" text={"Create review"} onPress={formik.handleSubmit} />
    </View>
  );
};

const ReviewForm = ({ auth }) => {
  const navigate = useNavigate();
  const [createReview] = useReview();

  useEffect(() => {
    if (!auth) {
      navigate('/');
    }
  }, [auth]);

  const onSubmit = async (values) => {
    const { name, owner, review } = values;
    const rating = parseInt(values.rating);
    try {
      const { data } = await createReview({ name, owner, rating, review });
      navigate(`/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

  return (<ReviewFormContainer onSubmit={onSubmit} />);
};

export default ReviewForm;