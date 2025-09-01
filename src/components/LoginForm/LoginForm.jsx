import * as Yup from "yup";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Form, Formik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Input from "../../reuseable/Input/Input";

import { login } from "../../redux/auth/operations";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import css from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const fields = [
  {
    label: "Enter your email address",
    name: "email",
    placeholder: "email@gmail.com",
    type: "email",
  },
  {
    label: "Enter your password",
    name: "password",
    placeholder: "*********",
    type: "password",
    icon: { show: "icon-eye", hide: "pswd-icon" },
  },
];

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required().label("Email"),
  password: Yup.string().min(8).max(20).required().label("Password"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      toast.loading("Logging in...", { id: "login" });
      await dispatch(login(values)).unwrap();
      toast.success("Logged in!", { id: "login" });
      actions.resetForm();
    } catch {
      toast.error("Something went wrong", { id: "login" });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={css.form}>
      <h2 className={css.title}>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={css.formBody}>
            {fields.map((field) => (
              <Input
                key={field.name}
                label={field.label}
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
                iconName={field?.icon}
                error={errors[field.name]}
                touched={touched[field.name]}
              />
            ))}
            <button className={css.btn} type="submit" disabled={isSubmitting}>
              Login
            </button>
            <p className={css.authPrompt}>
              Don&rsquo;t have an account?{" "}
              <Link to={"/register"} className={css.authLink}>
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
