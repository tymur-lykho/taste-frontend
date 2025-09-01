import clsx from "clsx";
import css from "./Button.module.css";
import { Link } from "react-router-dom";

export function Button({
  children,
  className,
  color = "white",
  size = "md40",
  type = "button",
  to,
  ...props
}) {
  if (type === "link" && to) {
    return (
      <Link to={to} className={clsx(css.btn, className)} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={clsx(css.btn, css[color], css[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
