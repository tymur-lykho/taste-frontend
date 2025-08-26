import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Field is required'),
    email: Yup.string().email('Not valid email').required('Field is required'),
    password: Yup.string()
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Field is required'),  
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Field is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values;
    try {
      await dispatch(register({ name, email, password })).unwrap();
      toast.success('Registration successful!');
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <label className={css.label}>
            Name
            <Field name="name">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    name="name"
                    placeholder="Enter name"
                    aria-label="Enter name"
                    className={`${css.field} ${
                      meta.touched
                        ? meta.error
                          ? css.fieldError
                          : css.fieldValid
                        : ''
                    }`}
                    aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                  />
                  {meta.touched && meta.error && (
                    <span className={css.error}>{meta.error}</span>
                  )}
                </>
              )}
            </Field>
          </label>
          <label className={css.label}>
            Email
            <Field name="email">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="email"
                    placeholder="Enter email"
                    aria-label="Enter email"
                    className={`${css.field} ${
                      meta.touched
                        ? meta.error
                          ? css.fieldError
                          : css.fieldValid
                        : ''
                    }`}
                    aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                  />
                  {meta.touched && meta.error && (
                    <span className={css.error}>{meta.error}</span>
                  )}
                </>
              )}
            </Field>
          </label>
          <label className={css.label}>
            Password
            <Field name="password">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    aria-label="Enter password"
                    className={`${css.field} ${
                      meta.touched
                        ? meta.error
                          ? css.fieldError
                          : css.fieldValid
                        : ''
                    }`}
                    aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                  />
                  {meta.touched && meta.error && (
                    <span className={css.error}>{meta.error}</span>
                  )}
                </>
              )}
            </Field>
          </label>
          <label className={css.label}>
            Confirm Password
            <Field name="confirmPassword">
              {({ field, meta }) => (
                <>
                  <input
                    {...field}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    aria-label="Confirm password"
                    className={`${css.field} ${
                      meta.touched
                        ? meta.error
                          ? css.fieldError
                          : css.fieldValid
                        : ''
                    }`}
                    aria-invalid={meta.touched && meta.error ? 'true' : 'false'}
                  />
                  {meta.touched && meta.error && (
                    <span className={css.error}>{meta.error}</span>
                  )}
                </>
              )}
            </Field>
          </label>
          <button type="submit" className={css.btnReg} disabled={isSubmitting}>
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
