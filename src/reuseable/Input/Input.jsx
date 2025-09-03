import clsx from "clsx";
import { Field } from "formik";

import Password from "./Helpers/Password";

import css from "./Input.module.css";

export default function Input({
  label,
  name,
  placeholder,
  type,
  iconName,
  error,
  touched,
}) {
  return (
    <div className={css.body}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      {type === "password" && iconName ? (
        <Password
          styles={css}
          name={name}
          error={error}
          touched={touched}
          placeholder={placeholder}
          type={type}
          iconName={iconName}
        />
      ) : (
        <Field
          className={clsx(css.field, { [css.error]: error && touched })}
          name={name}
          placeholder={placeholder}
          type={type}
        />
      )}
      {error && touched && (
        <p className={clsx(css.helperText, { [css.error]: error && touched })}>
          {error}
        </p>
      )}
    </div>
  );
}
