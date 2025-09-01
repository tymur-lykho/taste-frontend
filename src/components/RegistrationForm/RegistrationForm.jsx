import clsx from "clsx";
import * as Yup from "yup";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";

import EyeButton from "../EyeButton/EyeButton";

import { register } from "../../redux/auth/operations";

import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(16, "Too Long! Max 16 character")
      .required("Field is required"),
    email: Yup.string()
      .email("Not valid email")
      .max(128, "Too Long!Max-128 character")
      .required("Field is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
        "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .max(128, "Too Long!Max-128 character")
      .required("Field is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Field is required"),
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

  const messagePass =
    "Must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";

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
            <Field name="password">
              {({ field, meta }) => (
                <label
                  className={clsx(
                    css.label,
                    meta.touched && meta.error === messagePass
                      ? css.labelLarge
                      : css.label
                  )}
                >
                  Create a strong password
                  <input
                    {...field}
                    type={showPass ? "text" : "password"}
                    placeholder="Enter password"
                    aria-label="Create a strong password"
                    className={clsx(
                      css.field,
                      css.pass,
                      meta.touched &&
                        (meta.error ? css.fieldError : css.fieldValid)
                    )}
                    aria-invalid={meta.touched && meta.error ? "true" : "false"}
                  />
                  <span
                    className={clsx(css.error, css.noError, {
                      [css.errorLarge]:
                        meta.touched && meta.error === messagePass,
                    })}
                  >
                    {meta.touched && meta.error ? meta.error : "\u00A0"}
                  </span>
                  <EyeButton show={showPass} setShow={setShowPass} />
                </label>
              )}
            </Field>

            <label className={css.label}>
              Repeat your password
              <Field name="confirmPassword">
                {({ field, meta }) => (
                  <>
                    <input
                      {...field}
                      type={showConfirmPass ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm password"
                      aria-label="Repeat your password"
                      className={clsx(
                        css.field,
                        css.pass,
                        meta.touched &&
                          (meta.error ? css.fieldError : css.fieldValid)
                      )}
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
              <EyeButton show={showConfirmPass} setShow={setShowConfirmPass} />
            </label>
          </div>
          <button
            type="submit"
            className={clsx("fill", css.btnReg)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
          <p className={css.loginText}>
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </Form>
      )}
    </Formik>
  );
}
