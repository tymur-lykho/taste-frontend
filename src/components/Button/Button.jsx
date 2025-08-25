import clsx from "clsx";
import css from "./Button.module.css";

export const Button = ({
  children,
  color = "white",
  size = "md40",
  ...props
}) => {
  return (
    <button className={clsx(css.button, css[color], css[size])} {...props}>
      {children}
    </button>
  );
};
