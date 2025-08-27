import { Form, Formik } from "formik";
import Input from "../../reuseable/Input/Input";
import * as Yup from "yup";
import css from "./LoginForm.module.css";

const initialValues = {
  email: "",
  password: "",
};

const fields = [
  { label: "Email", name: "email", placeholder: "Email", type: "email" },
  {
    label: "Password",
    name: "password",
    placeholder: "Pass",
    type: "password",
    icon: "pswd-icon",
  },
];

const loginValidationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().min(7).max(20).required(),
});

export default function LoginForm() {
  return (
    <div className={css.formBody}>
      <h2 className={css.title}>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidationSchema}
      >
        {({ errors, touched }) => (
          <Form>
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
