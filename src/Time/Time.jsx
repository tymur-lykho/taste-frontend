import css from "./Time.module.css";

export default function Time({ time }) {
  return <span className={css["card-time"]}>icon{time}</span>;
}
