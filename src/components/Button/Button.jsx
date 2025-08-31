import clsx from "clsx";
import css from "./Button.module.css";
import { Link } from "react-router-dom";
// export const Button = ({
//   children,
//   color = "white",
//   size = "md40",
//   className,
//   ...props
// }) => {
//   return (
//     <button
//       className={clsx(css.button, css[color], css[size], className)}
//       {...props}
//     >
//       {children}
//     </button>
//   );
// };
export function Button({
  children,
  className,
  color = "white",
  size = "md40",
  type = "button",
  to,
  ...props
}) {
  // Якщо кнопка має бути посиланням
  if (type === "link" && to) {
    return (
      <Link to={to} className={clsx(css.btn, className)} {...props}>
        {children}
      </Link>
    );
  }

  // Звичайна кнопка
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
