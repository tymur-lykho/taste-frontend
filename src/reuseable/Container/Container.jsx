import css from "./Container.module.css";

export default function Container({ children, className = "" }) {
  return <div className={`${css.container} ${className}`}>{children}</div>;
}
