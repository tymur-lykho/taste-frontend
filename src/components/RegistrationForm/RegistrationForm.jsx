import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import * as Yup from "yup";
import css from "./RegistrationForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import clsx from "clsx";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Field is required"),
    email: Yup.string().email("Not valid email").required("Field is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Field is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and privacy policy"
    ),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values;
    try {
      await dispatch(register({ name, email, password })).unwrap();
      toast.success("Registration successful!");
      resetForm();
    } catch (error) {
      toast.error(error.message || "Registration failed");
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
          <h2 className={css.title}>Register</h2>
          <p className={css.subtitle}>
            Join our community of culinary enthusiasts, save your favorite
            recipes, and share your cooking creations
          </p>
          <div className={css.containerField}>
            <label className={css.label}>
              Enter your email address
              <Field name="email">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type="email"
                      placeholder="email@gmail.com"
                      aria-label="Enter email"
                      className={`${css.field} ${
                        meta.touched
                          ? meta.error
                            ? css.fieldError
                            : css.fieldValid
                          : ""
                      }`}
                      aria-invalid={
                        meta.touched && meta.error ? "true" : "false"
                      }
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </label>
            <label className={css.label}>
              Enter your name
              <Field name="name">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type="text"
                      name="name"
                      placeholder="Max"
                      aria-label="Enter your name"
                      className={`${css.field} ${
                        meta.touched
                          ? meta.error
                            ? css.fieldError
                            : css.fieldValid
                          : ""
                      }`}
                      aria-invalid={
                        meta.touched && meta.error ? "true" : "false"
                      }
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </label>
            <label className={css.label}>
              Create a strong password
              <Field name="password">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      aria-label="Create a strong password"
                      className={`${css.field} ${
                        meta.touched
                          ? meta.error
                            ? css.fieldError
                            : css.fieldValid
                          : ""
                      }`}
                      aria-invalid={
                        meta.touched && meta.error ? "true" : "false"
                      }
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </label>
            <label className={css.label}>
              Repeat your password
              <Field name="confirmPassword">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm password"
                      aria-label="Repeat your password"
                      className={`${css.field} ${
                        meta.touched
                          ? meta.error
                            ? css.fieldError
                            : css.fieldValid
                          : ""
                      }`}
                      aria-invalid={
                        meta.touched && meta.error ? "true" : "false"
                      }
                    />
                    {meta.touched && meta.error && (
                      <span className={css.error}>{meta.error}</span>
                    )}
                  </>
                )}
              </Field>
            </label>
            <label className={css.checkboxLabel}>
              <Field className={css.terms} type="checkbox" name="terms" />
              <a className={css.LinkTerms} href="/terms">
                I agree to the Terms of Service and Privacy Policy
              </a>
            </label>
            <ErrorMessage name="terms" component="div" className={css.error} />
          </div>
          <button
            type="submit"
            className={clsx("fill", css.btnReg)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <p className={css.loginText}>
            Already have an account? <a href="/login">Log in</a>
          </p>
        </Form>
      )}
    </Formik>
  );
}
