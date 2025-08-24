import css from "./Button.module.css";

export const Button = ({ children, color = "button", size, ...props }) => (
  <button className={`${css[color]} ${css[size]}`} {...props}>
    {children}
  </button>
);
