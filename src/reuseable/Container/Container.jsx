import css from "./Container.module.css";

export function Container({ children, className = "" }) {
  return <div className={`${css.container} ${className}`}>{children}</div>;
}
