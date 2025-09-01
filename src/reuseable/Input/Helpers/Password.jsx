import clsx from "clsx";
import { Field } from "formik";
import { useState } from "react";

import Icon from "../../Icon/Icon";

export default function Password({
  styles,
  name,
  error,
  touched,
  placeholder,
  type,
  iconName,
}) {
  const [isShow, setIsShow] = useState(false);
  const singleIcon = typeof iconName === "string" ? iconName : null;

  const toggle = () => setIsShow((prev) => !prev);

  return (
    <>
      <div className={styles.passwordCont}>
        <Field
          id={name}
          className={clsx(styles.field, { [styles.error]: error && touched })}
          name={name}
          placeholder={placeholder}
          type={isShow ? "text" : type}
        />
        <button
          className={clsx(styles.button, {
            [styles.show]: isShow && singleIcon,
          })}
          type="button"
          onClick={toggle}
        >
          <Icon
            className={styles.passwordIcon}
            iconName={
              singleIcon ? singleIcon : isShow ? iconName.show : iconName.hide
            }
          />
        </button>
      </div>
    </>
  );
}
