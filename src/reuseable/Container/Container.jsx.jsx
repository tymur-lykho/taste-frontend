import css from "./Container.module.css";

export function Container({ children }) {
  return <div className={css.container}>{children}</div>;
}
