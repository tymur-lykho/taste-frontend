import { Field } from "formik";
import Icon from "../Icon/Icon";
import css from "./Input.module.css";
import { useState } from "react";
import clsx from "clsx";

export default function Input({
  label,
  name,
  placeholder,
  type,
  iconName,
  error,
  touched,
}) {
  console.log(error, touched);

  const [isShow, setIsShow] = useState(false);
  return (
    <div className={css.body}>
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
      {type === "password" && iconName ? (
        <div className={css.passwordCont}>
          <Field
            id={name}
            className={clsx(css.field, { [css.error]: error && touched })}
            name={name}
            placeholder={placeholder}
            type={isShow ? "text" : type}
          />
          <button
            className={clsx(css.button, { [css.show]: isShow })}
            type="button"
            onClick={() => setIsShow((prev) => !prev)}
          >
            <Icon className={css.passwordIcon} iconName={iconName} />
          </button>
        </div>
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
